import {
  Firm,
  UserProfile,
  FormTemplate,
  ClientCase,
  AuditLogEntry,
  EmailNotification,
  UserRole,
  DocStatus,
  DocVersion,
  ChecklistItem,
  CaseStatus
} from "../types";
import {
  INITIAL_FIRMS,
  INITIAL_USERS,
  INITIAL_FORM_TEMPLATES,
  INITIAL_CASES,
  INITIAL_AUDIT_LOGS,
  INITIAL_EMAILS
} from "../seed/demoData";

const STORAGE_KEYS = {
  FIRMS: "intakeiq_firms_v1",
  USERS: "intakeiq_users_v1",
  TEMPLATES: "intakeiq_templates_v1",
  CASES: "intakeiq_cases_v1",
  AUDIT_LOGS: "intakeiq_audit_v1",
  EMAILS: "intakeiq_emails_v1",
  CURRENT_FIRM_ID: "intakeiq_current_firm_id",
  CURRENT_USER_ID: "intakeiq_current_user_id"
};

// Helper to safely get local storage items
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

export class DataStore {
  // Ensure store is seeded
  public static initSeedData(): void {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEYS.FIRMS)) {
      setLocalItem(STORAGE_KEYS.FIRMS, INITIAL_FIRMS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      setLocalItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TEMPLATES)) {
      setLocalItem(STORAGE_KEYS.TEMPLATES, INITIAL_FORM_TEMPLATES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CASES)) {
      setLocalItem(STORAGE_KEYS.CASES, INITIAL_CASES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      setLocalItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EMAILS)) {
      setLocalItem(STORAGE_KEYS.EMAILS, INITIAL_EMAILS);
    }
  }

  // Reset demo store
  public static resetDemoData(): void {
    if (typeof window === "undefined") return;
    setLocalItem(STORAGE_KEYS.FIRMS, INITIAL_FIRMS);
    setLocalItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    setLocalItem(STORAGE_KEYS.TEMPLATES, INITIAL_FORM_TEMPLATES);
    setLocalItem(STORAGE_KEYS.CASES, INITIAL_CASES);
    setLocalItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    setLocalItem(STORAGE_KEYS.EMAILS, INITIAL_EMAILS);
    window.location.reload();
  }

  // ================= FIRM METHODS =================
  public static getFirms(): Firm[] {
    return getLocalItem<Firm[]>(STORAGE_KEYS.FIRMS, INITIAL_FIRMS);
  }

  public static getFirmById(firmId: string): Firm | undefined {
    const firms = this.getFirms();
    return firms.find(f => f.id === firmId);
  }

  public static getFirmBySlug(slug: string): Firm | undefined {
    const firms = this.getFirms();
    return firms.find(f => f.slug.toLowerCase() === slug.toLowerCase());
  }

  public static createFirm(firmData: Omit<Firm, "id" | "createdAt">): Firm {
    const firms = this.getFirms();
    const newFirm: Firm = {
      ...firmData,
      id: `firm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    firms.push(newFirm);
    setLocalItem(STORAGE_KEYS.FIRMS, firms);
    return newFirm;
  }

  public static updateFirm(firmId: string, updates: Partial<Firm>): Firm {
    const firms = this.getFirms();
    const index = firms.findIndex(f => f.id === firmId);
    if (index === -1) throw new Error("Firm not found");
    
    firms[index] = {
      ...firms[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setLocalItem(STORAGE_KEYS.FIRMS, firms);
    return firms[index];
  }

  // ================= USERS METHODS =================
  public static getUsers(firmId?: string): UserProfile[] {
    const users = getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    if (firmId) {
      return users.filter(u => u.firmId === firmId);
    }
    return users;
  }

  public static getUserById(userId: string): UserProfile | undefined {
    const users = this.getUsers();
    return users.find(u => u.id === userId);
  }

  public static createUser(userData: Omit<UserProfile, "id" | "createdAt">): UserProfile {
    const users = this.getUsers();
    const newUser: UserProfile = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    setLocalItem(STORAGE_KEYS.USERS, users);
    return newUser;
  }

  // ================= FORM TEMPLATES =================
  public static getFormTemplates(firmId: string): FormTemplate[] {
    const templates = getLocalItem<FormTemplate[]>(STORAGE_KEYS.TEMPLATES, INITIAL_FORM_TEMPLATES);
    return templates.filter(t => t.firmId === firmId);
  }

  public static getFormTemplateById(templateId: string): FormTemplate | undefined {
    const templates = getLocalItem<FormTemplate[]>(STORAGE_KEYS.TEMPLATES, INITIAL_FORM_TEMPLATES);
    return templates.find(t => t.id === templateId);
  }

  public static saveFormTemplate(template: Omit<FormTemplate, "id" | "createdAt" | "updatedAt"> & { id?: string }): FormTemplate {
    const templates = getLocalItem<FormTemplate[]>(STORAGE_KEYS.TEMPLATES, INITIAL_FORM_TEMPLATES);
    const now = new Date().toISOString();
    
    if (template.id) {
      const idx = templates.findIndex(t => t.id === template.id);
      if (idx !== -1) {
        templates[idx] = {
          ...templates[idx],
          ...template,
          updatedAt: now,
        };
        setLocalItem(STORAGE_KEYS.TEMPLATES, templates);
        return templates[idx];
      }
    }

    const newTemplate: FormTemplate = {
      ...template,
      id: `tmpl-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    templates.push(newTemplate);
    setLocalItem(STORAGE_KEYS.TEMPLATES, templates);
    return newTemplate;
  }

  public static deleteFormTemplate(templateId: string): void {
    const templates = getLocalItem<FormTemplate[]>(STORAGE_KEYS.TEMPLATES, INITIAL_FORM_TEMPLATES);
    const filtered = templates.filter(t => t.id !== templateId);
    setLocalItem(STORAGE_KEYS.TEMPLATES, filtered);
  }

  // ================= CASES =================
  public static getCases(firmId: string): ClientCase[] {
    const cases = getLocalItem<ClientCase[]>(STORAGE_KEYS.CASES, INITIAL_CASES);
    return cases.filter(c => c.firmId === firmId);
  }

  public static getCaseById(caseId: string): ClientCase | undefined {
    const cases = getLocalItem<ClientCase[]>(STORAGE_KEYS.CASES, INITIAL_CASES);
    return cases.find(c => c.id === caseId);
  }

  public static getCaseByToken(token: string): ClientCase | undefined {
    const cases = getLocalItem<ClientCase[]>(STORAGE_KEYS.CASES, INITIAL_CASES);
    return cases.find(c => c.portalToken === token || c.id === token);
  }

  public static createCase(
    caseData: Omit<ClientCase, "id" | "createdAt" | "updatedAt" | "portalToken">,
    actorUser: UserProfile
  ): ClientCase {
    const cases = getLocalItem<ClientCase[]>(STORAGE_KEYS.CASES, INITIAL_CASES);
    const now = new Date().toISOString();
    const caseId = `case-${Date.now().toString().slice(-4)}`;
    const portalToken = `pt-${Math.random().toString(36).substring(2, 10)}`;

    const newCase: ClientCase = {
      ...caseData,
      id: caseId,
      portalToken,
      createdAt: now,
      updatedAt: now,
    };

    cases.unshift(newCase);
    setLocalItem(STORAGE_KEYS.CASES, cases);

    // Audit Log
    this.addAuditLog({
      firmId: newCase.firmId,
      caseId: newCase.id,
      caseTitle: newCase.title,
      actorId: actorUser.id,
      actorName: actorUser.name,
      actorRole: actorUser.role,
      action: "Case Created & Invited",
      targetEntity: `${newCase.clientName} (${newCase.clientCompany || "Individual"})`,
      details: `Created onboarding case with ${newCase.checklist.length} document requirements.`
    });

    // Transactional Email to Client
    const firm = this.getFirmById(newCase.firmId);
    const portalUrl = `/portal/${firm?.slug || "apex-advisory"}/${newCase.id}`;
    this.sendEmail({
      firmId: newCase.firmId,
      to: newCase.clientEmail,
      recipientName: newCase.clientName,
      subject: `Action Required: Complete your onboarding with ${firm?.name || "IntakeIQ"}`,
      bodyText: `Hello ${newCase.clientName}, you have been invited to complete your intake for "${newCase.title}". Access your secure portal at: ${portalUrl}`,
      type: "invitation",
      metadata: { caseId: newCase.id, portalUrl }
    });

    return newCase;
  }

  public static updateCase(caseId: string, updates: Partial<ClientCase>, actorUser?: UserProfile): ClientCase {
    const cases = getLocalItem<ClientCase[]>(STORAGE_KEYS.CASES, INITIAL_CASES);
    const idx = cases.findIndex(c => c.id === caseId);
    if (idx === -1) throw new Error("Case not found");

    const previousStatus = cases[idx].status;
    cases[idx] = {
      ...cases[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setLocalItem(STORAGE_KEYS.CASES, cases);

    // Status change audit log & email
    if (updates.status && updates.status !== previousStatus && actorUser) {
      this.addAuditLog({
        firmId: cases[idx].firmId,
        caseId: cases[idx].id,
        caseTitle: cases[idx].title,
        actorId: actorUser.id,
        actorName: actorUser.name,
        actorRole: actorUser.role,
        action: "Case Status Changed",
        targetEntity: `Status: ${previousStatus} → ${updates.status}`,
        details: `Updated case status to ${updates.status}.`
      });

      this.sendEmail({
        firmId: cases[idx].firmId,
        to: cases[idx].clientEmail,
        recipientName: cases[idx].clientName,
        subject: `Your onboarding status has been updated: ${updates.status}`,
        bodyText: `Hello ${cases[idx].clientName}, the status of your case "${cases[idx].title}" is now ${updates.status}.`,
        type: "status_change",
        metadata: { caseId: cases[idx].id, status: updates.status }
      });
    }

    return cases[idx];
  }

  public static submitFormAnswers(
    caseId: string,
    responses: Record<string, any>,
    actorName: string,
    actorId: string
  ): ClientCase {
    const c = this.getCaseById(caseId);
    if (!c) throw new Error("Case not found");

    const isAllDocsUploaded = c.checklist.every(item => !item.required || item.status === "Approved" || item.status === "Uploaded");
    const nextStatus: CaseStatus = isAllDocsUploaded ? "Under Review" : "Documents Pending";

    const updated = this.updateCase(caseId, {
      formResponses: responses,
      formSubmittedAt: new Date().toISOString(),
      status: nextStatus
    });

    this.addAuditLog({
      firmId: c.firmId,
      caseId: c.id,
      caseTitle: c.title,
      actorId,
      actorName,
      actorRole: "Client",
      action: "Form Submitted",
      targetEntity: "Client Intake Form",
      details: `Completed and submitted form responses.`
    });

    // Notify assigned staff
    const firm = this.getFirmById(c.firmId);
    this.sendEmail({
      firmId: c.firmId,
      to: firm?.contactEmail || "staff@firm.com",
      recipientName: c.assignedToName || "Case Manager",
      subject: `Form Submitted: ${c.clientName} completed intake form`,
      bodyText: `${c.clientName} has submitted form responses for case "${c.title}". Review in dashboard.`,
      type: "form_submitted",
      metadata: { caseId: c.id }
    });

    return updated;
  }

  public static uploadDocument(
    caseId: string,
    checklistItemId: string,
    fileInfo: { fileName: string; fileUrl: string; fileSize: number; fileType: string; uploadedBy: string; actorId: string }
  ): ClientCase {
    const c = this.getCaseById(caseId);
    if (!c) throw new Error("Case not found");

    const checklist = [...c.checklist];
    const itemIndex = checklist.findIndex(item => item.id === checklistItemId);
    if (itemIndex === -1) throw new Error("Checklist item not found");

    const item = checklist[itemIndex];
    const newVersionNumber = (item.versions?.length || 0) + 1;
    const newVersion: DocVersion = {
      version: newVersionNumber,
      fileName: fileInfo.fileName,
      fileUrl: fileInfo.fileUrl,
      fileSize: fileInfo.fileSize,
      fileType: fileInfo.fileType,
      uploadedAt: new Date().toISOString(),
      uploadedBy: fileInfo.uploadedBy,
    };

    const updatedItem: ChecklistItem = {
      ...item,
      status: "Uploaded",
      rejectionReason: undefined,
      versions: [...(item.versions || []), newVersion],
    };

    checklist[itemIndex] = updatedItem;

    const updated = this.updateCase(caseId, {
      checklist,
      status: c.formSubmittedAt ? "Under Review" : c.status
    });

    this.addAuditLog({
      firmId: c.firmId,
      caseId: c.id,
      caseTitle: c.title,
      actorId: fileInfo.actorId,
      actorName: fileInfo.uploadedBy,
      actorRole: "Client",
      action: "Document Uploaded",
      targetEntity: `${item.name} (v${newVersionNumber}: ${fileInfo.fileName})`,
      details: `File size: ${(fileInfo.fileSize / (1024 * 1024)).toFixed(2)} MB.`
    });

    // Notify staff
    const firm = this.getFirmById(c.firmId);
    this.sendEmail({
      firmId: c.firmId,
      to: firm?.contactEmail || "staff@firm.com",
      recipientName: c.assignedToName || "Case Manager",
      subject: `Document Uploaded: ${fileInfo.fileName} by ${fileInfo.uploadedBy}`,
      bodyText: `${fileInfo.uploadedBy} uploaded ${item.name} (v${newVersionNumber}) for case "${c.title}".`,
      type: "doc_uploaded",
      metadata: { caseId: c.id, checklistItemId }
    });

    return updated;
  }

  public static reviewDocument(
    caseId: string,
    checklistItemId: string,
    status: "Approved" | "Rejected",
    rejectionReason: string | undefined,
    reviewer: UserProfile
  ): ClientCase {
    const c = this.getCaseById(caseId);
    if (!c) throw new Error("Case not found");

    const checklist = [...c.checklist];
    const itemIndex = checklist.findIndex(item => item.id === checklistItemId);
    if (itemIndex === -1) throw new Error("Checklist item not found");

    const item = checklist[itemIndex];
    checklist[itemIndex] = {
      ...item,
      status,
      rejectionReason: status === "Rejected" ? rejectionReason : undefined,
      approvedAt: status === "Approved" ? new Date().toISOString() : undefined,
      approvedBy: status === "Approved" ? reviewer.name : undefined,
    };

    // Evaluate overall case status
    const allApproved = checklist.every(i => !i.required || i.status === "Approved");
    const anyRejected = checklist.some(i => i.status === "Rejected");
    
    let newCaseStatus: CaseStatus = c.status;
    if (allApproved && c.formSubmittedAt) {
      newCaseStatus = "Approved";
    } else if (anyRejected) {
      newCaseStatus = "Under Review";
    }

    const updated = this.updateCase(caseId, {
      checklist,
      status: newCaseStatus
    });

    this.addAuditLog({
      firmId: c.firmId,
      caseId: c.id,
      caseTitle: c.title,
      actorId: reviewer.id,
      actorName: reviewer.name,
      actorRole: reviewer.role,
      action: status === "Approved" ? "Document Approved" : "Document Rejected",
      targetEntity: item.name,
      details: status === "Approved" 
        ? `Approved by ${reviewer.name}.` 
        : `Rejection Feedback: "${rejectionReason || "Please re-upload according to specifications."}"`
    });

    if (status === "Rejected") {
      this.sendEmail({
        firmId: c.firmId,
        to: c.clientEmail,
        recipientName: c.clientName,
        subject: `Action Required: Document "${item.name}" needs correction`,
        bodyText: `Hello ${c.clientName}, your document "${item.name}" requires attention. Reviewer comment: "${rejectionReason || "Please re-upload clean copy."}". Please visit your portal to re-upload.`,
        type: "doc_rejected",
        metadata: { caseId: c.id, checklistItemId }
      });
    }

    return updated;
  }

  // ================= AUDIT LOGS =================
  public static getAuditLogs(firmId: string, caseId?: string): AuditLogEntry[] {
    const logs = getLocalItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    return logs
      .filter(l => l.firmId === firmId && (!caseId || l.caseId === caseId))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public static addAuditLog(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
    const logs = getLocalItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const newLog: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    setLocalItem(STORAGE_KEYS.AUDIT_LOGS, logs);
    return newLog;
  }

  // ================= EMAIL NOTIFICATIONS =================
  public static getEmails(firmId: string): EmailNotification[] {
    const emails = getLocalItem<EmailNotification[]>(STORAGE_KEYS.EMAILS, INITIAL_EMAILS);
    return emails
      .filter(e => e.firmId === firmId)
      .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  }

  public static sendEmail(emailData: Omit<EmailNotification, "id" | "sentAt" | "status">): EmailNotification {
    const emails = getLocalItem<EmailNotification[]>(STORAGE_KEYS.EMAILS, INITIAL_EMAILS);
    const newEmail: EmailNotification = {
      ...emailData,
      id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sentAt: new Date().toISOString(),
      status: "delivered",
    };
    emails.unshift(newEmail);
    setLocalItem(STORAGE_KEYS.EMAILS, emails);
    return newEmail;
  }
}
