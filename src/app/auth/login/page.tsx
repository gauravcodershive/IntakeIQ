"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useTenant } from "@/lib/context/TenantContext";
import { useToast } from "@/components/shared/ToastProvider";
import { DataStore } from "@/lib/store/dataStore";
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Eye,
  EyeOff,
  User,
  Sparkles,
  Key,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Shield
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const { currentFirm, allFirms, switchFirm } = useTenant();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<"firm" | "client">("firm");
  const [email, setEmail] = useState("admin@apexadvisory.com");
  const [password, setPassword] = useState("••••••••");
  const [tenantSlug, setTenantSlug] = useState("apex-advisory");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [clientToken, setClientToken] = useState("case-101");
  const [clientEmail, setClientEmail] = useState("david@luminahealth.io");
  const [error, setError] = useState("");
  const [clientError, setClientError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuickLoggingIn, setIsQuickLoggingIn] = useState(false);

  const handleFirmLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(email);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("User account not recognized. You can use any of the 1-Click Demo Profiles below!");
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const slug = tenantSlug.trim() || "apex-advisory";
      const token = clientToken.trim() || "case-101";
      const firm = DataStore.getFirmBySlug(slug);
      const matchedCase = DataStore.getCaseById(token);
      const emailMatches =
        !!matchedCase &&
        !!clientEmail.trim() &&
        matchedCase.clientEmail.toLowerCase() === clientEmail.trim().toLowerCase();

      if (firm && matchedCase && matchedCase.firmId === firm.id && emailMatches) {
        router.push(`/portal/${slug}/${token}`);
      } else {
        setClientError("We couldn't match that case reference and email. Check the token and email from your firm advisor's invitation.");
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleQuickLogin = (role: any, quickEmail: string, firmId?: string) => {
    if (isQuickLoggingIn) return;
    setIsQuickLoggingIn(true);
    if (firmId) {
      switchFirm(firmId);
    }
    login(quickEmail);
    router.push("/dashboard");
  };

  const handleClientQuickLogin = () => {
    if (isQuickLoggingIn) return;
    setIsQuickLoggingIn(true);
    const demoCase = DataStore.getCaseById("case-101");
    const demoFirm = demoCase ? DataStore.getFirmById(demoCase.firmId) : undefined;
    router.push(`/portal/${demoFirm?.slug || "apex-advisory"}/${demoCase?.id || "case-101"}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Top Bar */}
      <header className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Don't have a firm tenant yet?</span>
          <Link
            href="/auth/signup"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-cyan-400 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Create New Firm Tenant →
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-800 text-center space-y-2 bg-slate-900/50">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold text-xl shadow-lg shadow-brand-600/30">
              IQ
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Sign In to IntakeIQ
            </h1>
            <p className="text-xs text-slate-400">
              Secure, multi-tenant onboarding gateway for professional firms & clients
            </p>
          </div>

          {/* Role / Audience Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/70 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("firm")}
              className={`py-3.5 px-4 text-center transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 ${
                activeTab === "firm"
                  ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Firm Staff & Admins</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("client")}
              className={`py-3.5 px-4 text-center transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 ${
                activeTab === "client"
                  ? "bg-slate-900 text-amber-400 border-b-2 border-amber-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Client Portal User</span>
            </button>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6 text-xs">
            {activeTab === "firm" && error && (
              <div role="alert" className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}
            {activeTab === "client" && clientError && (
              <div role="alert" className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <span>{clientError}</span>
              </div>
            )}

            {activeTab === "firm" ? (
              /* Firm Member Login Form */
              <form onSubmit={handleFirmLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Firm Workspace Subdomain
                  </label>
                  <div className="flex rounded-xl border border-slate-700 bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500">
                    <input
                      type="text"
                      required
                      value={tenantSlug}
                      onChange={(e) => setTenantSlug(e.target.value)}
                      placeholder="apex-advisory"
                      className="flex-1 px-3.5 py-2.5 bg-transparent text-white text-xs font-mono outline-none"
                    />
                    <span className="bg-slate-800 text-slate-400 px-3 py-2.5 text-xs font-mono border-l border-slate-700">
                      .intakeiq.app
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@apexadvisory.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Password <span className="text-cyan-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        toast.info(
                          email.trim()
                            ? `If ${email.trim()} matches an authorized admin, a password reset link has been sent.`
                            : "Enter your work email above first, then request a reset link."
                        )
                      }
                      className="text-[11px] text-cyan-400 hover:underline py-1 px-1 -m-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      title={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-200 transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4 bg-slate-950 border-slate-700 cursor-pointer"
                    />
                    <span className="text-slate-300 text-xs font-medium">Remember this browser</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  title={isSubmitting ? "Signing you in…" : undefined}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 transition-all duration-150 ease-out flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <span>{isSubmitting ? "Authenticating..." : "Sign In to Firm Workspace"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Client Portal Access Form */
              <form onSubmit={handleClientLogin} className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clients access their customized onboarding portal using the secure link or case reference code emailed by their firm advisor.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Case Reference ID or Secure Token <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={clientToken}
                      onChange={(e) => setClientToken(e.target.value)}
                      placeholder="e.g. case-101"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Authorized Client Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="david@luminahealth.io"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  title={isSubmitting ? "Verifying your case access…" : undefined}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 transition-all duration-150 ease-out flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <span>{isSubmitting ? "Verifying Access..." : "Enter Secure Client Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* 1-Click Instant Demo Profiles */}
            <div className="pt-5 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Instant 1-Click Demo Profiles</span>
                </div>
                <span className="text-[10px] text-slate-500">Zero Password Required</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Admin Profile */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("Admin", "admin@apexadvisory.com", "firm-apex")}
                  disabled={isQuickLoggingIn}
                  title={isQuickLoggingIn ? "Signing you in…" : undefined}
                  className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-purple-500/50 text-left transition-all duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs group-hover:text-purple-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Eleanor Vance</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Admin (Apex Advisory)</div>
                </button>

                {/* Case Manager Profile */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("CaseManager", "casemanager@apexadvisory.com", "firm-apex")}
                  disabled={isQuickLoggingIn}
                  title={isQuickLoggingIn ? "Signing you in…" : undefined}
                  className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-blue-500/50 text-left transition-all duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs group-hover:text-blue-300">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Marcus Sterling</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Case Manager (Reviewer)</div>
                </button>

                {/* Staff Profile */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("Staff", "staff@apexadvisory.com", "firm-apex")}
                  disabled={isQuickLoggingIn}
                  title={isQuickLoggingIn ? "Signing you in…" : undefined}
                  className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-emerald-500/50 text-left transition-all duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs group-hover:text-emerald-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Chloe Zhao</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Staff (View-Only)</div>
                </button>

                {/* Client Portal Profile */}
                <button
                  type="button"
                  onClick={handleClientQuickLogin}
                  disabled={isQuickLoggingIn}
                  title={isQuickLoggingIn ? "Opening portal…" : undefined}
                  className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-amber-500/50 text-left transition-all duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs group-hover:text-amber-300">
                    <User className="w-3.5 h-3.5" />
                    <span>David Chen</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Client Portal (Lumina Health)</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance Footer */}
      <footer className="p-4 sm:p-6 text-center text-xs text-slate-500 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Multi-Tenant Partitioned Isolation • Bank-Grade 256-bit TLS Encryption</span>
        </div>
        <div>
          © {new Date().getFullYear()} IntakeIQ. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
