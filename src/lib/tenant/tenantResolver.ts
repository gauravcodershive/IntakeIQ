import { Firm } from "../types";

export interface TenantContextResolution {
  firmSlug: string | null;
  subdomain: string | null;
  customDomain: string | null;
  isPortal: boolean;
}

/**
 * Resolves tenant parameters from host headers or pathname
 */
export function resolveTenantFromHost(hostname: string, pathname: string = ""): TenantContextResolution {
  const host = hostname.toLowerCase().split(":")[0]; // strip port
  
  // Check for portal URL pattern: /portal/:firmSlug/:caseId
  const portalMatch = pathname.match(/^\/portal\/([^\/]+)/);
  if (portalMatch) {
    return {
      firmSlug: portalMatch[1],
      subdomain: null,
      customDomain: null,
      isPortal: true,
    };
  }

  // Handle subdomain-based multi-tenancy (e.g. acme.intakeiq.app)
  const parts = host.split(".");
  if (parts.length > 2 && parts[0] !== "www" && parts[0] !== "localhost") {
    return {
      firmSlug: parts[0],
      subdomain: parts[0],
      customDomain: null,
      isPortal: false,
    };
  }

  return {
    firmSlug: null,
    subdomain: null,
    customDomain: null,
    isPortal: false,
  };
}

/**
 * Ensures data isolation across tenant firms
 */
export function filterByTenant<T extends { firmId: string }>(items: T[], activeFirmId: string | undefined): T[] {
  if (!activeFirmId) return [];
  return items.filter((item) => item.firmId === activeFirmId);
}

/**
 * Validates cross-tenant data access attempts
 */
export function assertTenantBoundary(resourceFirmId: string, activeFirmId: string): boolean {
  if (!resourceFirmId || !activeFirmId) return false;
  return resourceFirmId === activeFirmId;
}

/**
 * Computes tenant-specific CSS custom variables for dynamic white-label branding
 */
export function generateTenantTheme(firm?: Firm | null): Record<string, string> {
  if (!firm) {
    return {
      "--tenant-primary": "#0066FF",
      "--tenant-primary-rgb": "0, 102, 255",
      "--tenant-ring": "rgba(0, 102, 255, 0.2)",
    };
  }

  const primary = firm.primaryColor || "#0066FF";
  return {
    "--tenant-primary": primary,
    "--tenant-name": `"${firm.name}"`,
    "--tenant-slug": `"${firm.slug}"`,
  };
}
