"use client";

import React from "react";
import { UserRole } from "@/lib/types";
import { useAuth } from "@/lib/context/AuthContext";
import { PermissionAction, hasPermission, hasAllPermissions, hasAnyPermission } from "@/lib/auth/permissions";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermission?: PermissionAction;
  requiredPermissions?: PermissionAction[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

/**
 * RoleGuard Component: Conditionally renders UI elements based on user role or permission matrix
 */
export function RoleGuard({
  children,
  allowedRoles,
  requiredPermission,
  requiredPermissions,
  requireAll = false,
  fallback = null,
}: RoleGuardProps) {
  const { role } = useAuth();

  // Role whitelist check
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      return <>{fallback}</>;
    }
  }

  // Single permission check
  if (requiredPermission) {
    if (!hasPermission(role, requiredPermission)) {
      return <>{fallback}</>;
    }
  }

  // Multiple permissions check
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAccess = requireAll
      ? hasAllPermissions(role, requiredPermissions)
      : hasAnyPermission(role, requiredPermissions);
    
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

/**
 * Hook to quickly check a specific permission within components
 */
export function usePermission(permission: PermissionAction): boolean {
  const { role } = useAuth();
  return hasPermission(role, permission);
}
