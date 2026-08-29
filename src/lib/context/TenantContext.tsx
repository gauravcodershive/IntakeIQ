"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Firm } from "../types";
import { DataStore } from "../store/dataStore";

interface TenantContextType {
  currentFirm: Firm | null;
  allFirms: Firm[];
  switchFirm: (firmId: string) => void;
  updateCurrentFirm: (updates: Partial<Firm>) => void;
  refreshFirms: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [allFirms, setAllFirms] = useState<Firm[]>([]);
  const [currentFirmId, setCurrentFirmId] = useState<string>("firm-apex");

  const refreshFirms = () => {
    DataStore.initSeedData();
    const firms = DataStore.getFirms();
    setAllFirms(firms);
    if (firms.length > 0 && !firms.some(f => f.id === currentFirmId)) {
      setCurrentFirmId(firms[0].id);
    }
  };

  useEffect(() => {
    refreshFirms();
    const savedFirmId = sessionStorage.getItem("intakeiq_current_firm_id");
    if (savedFirmId) {
      setCurrentFirmId(savedFirmId);
    }
  }, []);

  const currentFirm = useMemo(() => {
    return allFirms.find(f => f.id === currentFirmId) || allFirms[0] || null;
  }, [allFirms, currentFirmId]);

  const switchFirm = (firmId: string) => {
    setCurrentFirmId(firmId);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intakeiq_current_firm_id", firmId);
    }
  };

  const updateCurrentFirm = (updates: Partial<Firm>) => {
    if (!currentFirm) return;
    const updated = DataStore.updateFirm(currentFirm.id, updates);
    setAllFirms(prev => prev.map(f => (f.id === updated.id ? updated : f)));
  };

  // Dynamically update CSS custom properties for firm branding
  useEffect(() => {
    if (currentFirm && typeof window !== "undefined") {
      document.documentElement.style.setProperty("--firm-primary", currentFirm.primaryColor);
      document.documentElement.style.setProperty(
        "--firm-secondary",
        currentFirm.secondaryColor || "#0A1C30"
      );
    }
  }, [currentFirm]);

  return (
    <TenantContext.Provider
      value={{
        currentFirm,
        allFirms,
        switchFirm,
        updateCurrentFirm,
        refreshFirms,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
