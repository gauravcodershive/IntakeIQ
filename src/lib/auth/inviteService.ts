import { UserRole } from "../types";

export interface TenantInvitation {
  id: string;
  firmId: string;
  firmName: string;
  email: string;
  role: UserRole;
  token: string;
  invitedByUserId: string;
  invitedByName: string;
  createdAt: string;
  expiresAt: string; // ISO date string (e.g. +7 days)
  status: "pending" | "accepted" | "revoked" | "expired";
}

/**
 * Service to generate and validate secure multi-tenant invitation tokens
 */
export class TenantInviteService {
  private static STORAGE_KEY = "intakeiq_pending_invitations";

  private static getAllInvitations(): TenantInvitation[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private static saveInvitations(invites: TenantInvitation[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(invites));
    } catch {
      // Ignore quota error in fallback
    }
  }

  /**
   * Create a new invitation token for a team member
   */
  static createInvitation(params: {
    firmId: string;
    firmName: string;
    email: string;
    role: UserRole;
    invitedByUserId: string;
    invitedByName: string;
    expirationDays?: number;
  }): TenantInvitation {
    const expirationDays = params.expirationDays || 7;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expirationDays * 24 * 60 * 60 * 1000).toISOString();

    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const token = `inv_${params.firmId.slice(0, 4)}_${randomSuffix}`;

    const invitation: TenantInvitation = {
      id: `inv-${Date.now()}`,
      firmId: params.firmId,
      firmName: params.firmName,
      email: params.email.toLowerCase().trim(),
      role: params.role,
      token,
      invitedByUserId: params.invitedByUserId,
      invitedByName: params.invitedByName,
      createdAt: now.toISOString(),
      expiresAt,
      status: "pending",
    };

    const all = this.getAllInvitations();
    all.push(invitation);
    this.saveInvitations(all);

    return invitation;
  }

  /**
   * Validate an invitation token and check expiration
   */
  static validateToken(token: string): {
    valid: boolean;
    invitation?: TenantInvitation;
    error?: string;
  } {
    const all = this.getAllInvitations();
    const found = all.find((inv) => inv.token === token);

    if (!found) {
      return { valid: false, error: "Invitation token not found or invalid." };
    }

    if (found.status === "accepted") {
      return { valid: false, error: "This invitation has already been accepted." };
    }

    if (found.status === "revoked") {
      return { valid: false, error: "This invitation has been revoked by a firm administrator." };
    }

    const isExpired = new Date(found.expiresAt).getTime() < Date.now();
    if (isExpired) {
      found.status = "expired";
      this.saveInvitations(all);
      return { valid: false, error: "This invitation link has expired." };
    }

    return { valid: true, invitation: found };
  }

  /**
   * Accept an invitation and mark status
   */
  static acceptInvitation(token: string): boolean {
    const all = this.getAllInvitations();
    const index = all.findIndex((inv) => inv.token === token);
    if (index === -1) return false;

    all[index].status = "accepted";
    this.saveInvitations(all);
    return true;
  }

  /**
   * Get all pending invitations for a specific firm
   */
  static getFirmInvitations(firmId: string): TenantInvitation[] {
    return this.getAllInvitations().filter((inv) => inv.firmId === firmId);
  }
}
