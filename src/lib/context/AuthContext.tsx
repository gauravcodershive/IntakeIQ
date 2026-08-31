"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "../types";
import { DataStore } from "../store/dataStore";
import { useTenant } from "./TenantContext";

interface AuthContextType {
  currentUser: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string) => boolean;
  signupAdmin: (data: {
    firmName: string;
    slug: string;
    adminName: string;
    email: string;
    primaryColor: string;
    industry: any;
  }) => void;
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  logout: () => void;
  firmUsers: UserProfile[];
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { currentFirm, refreshFirms, switchFirm } = useTenant();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [firmUsers, setFirmUsers] = useState<UserProfile[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshUsers = () => {
    DataStore.initSeedData();
    const users = DataStore.getUsers(currentFirm?.id);
    setFirmUsers(users);

    const savedUserId = typeof window !== "undefined" 
      ? (sessionStorage.getItem("intakeiq_current_user_id") || localStorage.getItem("intakeiq_current_user_id"))
      : null;

    if (savedUserId) {
      const allUsers = DataStore.getUsers();
      const found = allUsers.find(u => u.id === savedUserId);
      if (found) {
        setCurrentUser(found);
        setIsInitialized(true);
        return;
      }
    }

    setCurrentUser(null);
    setIsInitialized(true);
  };

  useEffect(() => {
    refreshUsers();
  }, [currentFirm?.id]);

  const login = (email: string): boolean => {
    DataStore.initSeedData();
    const allUsers = DataStore.getUsers();
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      switchFirm(user.firmId);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("intakeiq_current_user_id", user.id);
        localStorage.setItem("intakeiq_current_user_id", user.id);
      }
      return true;
    }
    return false;
  };

  const signupAdmin = (data: {
    firmName: string;
    slug: string;
    adminName: string;
    email: string;
    primaryColor: string;
    industry: any;
  }) => {
    // 1. Create Firm
    const newFirm = DataStore.createFirm({
      name: data.firmName,
      slug: data.slug,
      primaryColor: data.primaryColor || "#0066FF",
      contactEmail: data.email,
      industry: data.industry || "Accounting & CA",
    });

    // 2. Create Admin User
    const newAdmin = DataStore.createUser({
      email: data.email,
      name: data.adminName,
      role: "Admin",
      firmId: newFirm.id,
      title: "Firm Principal / Managing Partner",
    });

    // 3. Create Sample Starter Template
    DataStore.saveFormTemplate({
      firmId: newFirm.id,
      title: "General Client Intake & Verification Form",
      description: "Default questionnaire for new client onboarding.",
      category: "Onboarding",
      fields: [
        {
          id: "f_client_name",
          label: "Full Legal Name / Entity Name",
          type: "text",
          placeholder: "e.g. Acme Holdings LLC",
          required: true,
        },
        {
          id: "f_contact_email",
          label: "Primary Contact Email",
          type: "text",
          placeholder: "e.g. contact@acme.com",
          required: true,
        },
        {
          id: "f_service_type",
          label: "Requested Service Area",
          type: "dropdown",
          required: true,
          options: ["Corporate & Compliance", "Tax Filing & Advisory", "Audit & Attestation", "Strategic Consulting"],
        }
      ]
    });

    // Audit log
    DataStore.addAuditLog({
      firmId: newFirm.id,
      actorId: newAdmin.id,
      actorName: newAdmin.name,
      actorRole: "Admin",
      action: "Firm Registered",
      targetEntity: newFirm.name,
      details: `New firm created with slug ${newFirm.slug}.`
    });

    refreshFirms();
    switchFirm(newFirm.id);
    setCurrentUser(newAdmin);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intakeiq_current_user_id", newAdmin.id);
      localStorage.setItem("intakeiq_current_user_id", newAdmin.id);
    }
  };

  const switchRole = (role: UserRole) => {
    if (!currentFirm) return;
    const users = DataStore.getUsers(currentFirm.id);
    const matchedUser = users.find(u => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("intakeiq_current_user_id", matchedUser.id);
        localStorage.setItem("intakeiq_current_user_id", matchedUser.id);
      }
    } else {
      // Create a temporary user with that role
      const tempUser = DataStore.createUser({
        email: `${role.toLowerCase()}@${currentFirm.slug}.com`,
        name: `${role} (${currentFirm.name})`,
        role,
        firmId: currentFirm.id,
        title: `${role} Role User`,
      });
      setCurrentUser(tempUser);
      refreshUsers();
      if (typeof window !== "undefined") {
        sessionStorage.setItem("intakeiq_current_user_id", tempUser.id);
        localStorage.setItem("intakeiq_current_user_id", tempUser.id);
      }
    }
  };

  const switchUser = (userId: string) => {
    const user = DataStore.getUserById(userId);
    if (user) {
      setCurrentUser(user);
      switchFirm(user.firmId);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("intakeiq_current_user_id", user.id);
        localStorage.setItem("intakeiq_current_user_id", user.id);
      }
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("intakeiq_current_user_id");
      localStorage.removeItem("intakeiq_current_user_id");
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || "Admin",
        isAuthenticated: Boolean(currentUser),
        isInitialized,
        login,
        signupAdmin,
        switchRole,
        switchUser,
        logout,
        firmUsers,
        refreshUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
