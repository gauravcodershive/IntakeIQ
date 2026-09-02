"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DemoSwitcher from "@/components/shared/DemoSwitcher";
import { useAuth } from "@/lib/context/AuthContext";
import { useTenant } from "@/lib/context/TenantContext";
import { DataStore } from "@/lib/store/dataStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isInitialized } = useAuth();
  const { currentFirm } = useTenant();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication Guard: Redirect unauthenticated users to /auth/login
  useEffect(() => {
    if (isInitialized && !currentUser) {
      router.replace("/auth/login");
    }
  }, [isInitialized, currentUser, router]);

  // Client accounts are only ever meant to use the branded portal — a Client
  // role has no dashboard permissions in the matrix at all (see
  // src/lib/auth/permissions.ts), so it must never be able to browse
  // /dashboard/* and see other clients' cases or the internal staff roster.
  useEffect(() => {
    if (!isInitialized || !currentUser || currentUser.role !== "Client") return;

    const ownCase = currentFirm
      ? DataStore.getCases(currentFirm.id).find(
          (c) => c.clientEmail.toLowerCase() === currentUser.email.toLowerCase()
        )
      : undefined;

    if (ownCase && currentFirm) {
      router.replace(`/portal/${currentFirm.slug}/${ownCase.id}`);
    } else {
      router.replace("/auth/login");
    }
  }, [isInitialized, currentUser, currentFirm, router]);

  // Close the mobile nav drawer whenever the route changes.
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Escape closes the drawer; lock body scroll while it's open.
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [sidebarOpen]);

  if (!isInitialized || !currentUser || currentUser.role === "Client") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white gap-3 p-4">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-300 tracking-wide">
          {currentUser?.role === "Client" ? "Redirecting to your client portal..." : "Verifying session authentication..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Sticky Demo Switcher Bar */}
      <DemoSwitcher />

      {/* Mobile Nav Bar - only shown below lg:, where the sidebar becomes off-canvas */}
      <div className="lg:hidden sticky top-[41px] z-30 bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          className="p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-slate-800">Menu</span>
      </div>

      <div className="flex-1 flex min-h-[calc(100vh-41px)] relative">
        {/* Mobile Scrim - closes the drawer on outside click/tap */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Fixed/Sticky Internal Sidebar (off-canvas below lg:, static at lg:+) */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Dashboard Main Scrollable Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
