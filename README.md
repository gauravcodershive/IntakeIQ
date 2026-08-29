# IntakeIQ — Multi-Tenant Client Onboarding & Document Management (Milestone 1)

**IntakeIQ** is a modern multi-tenant SaaS application tailored for professional service firms (accounting & CA firms, law firms, wealth managers, and agencies) to streamline client intake, dynamic questionnaires, and document verification.

---

## 🚀 Key Features (Milestone 1)

1. **Multi-Tenant Architecture & Branding**
   - Data isolated per firm (`firms/{firmId}/...`).
   - Custom display name, logo URL, primary brand color, and subdomain-style slug (e.g. `/portal/{firmSlug}/{caseId}`).
   - Dynamic CSS variable theme generation based on the active firm's palette.

2. **Four User Roles & Access Control**
   - **Admin (Firm Partner/Owner)**: Full access to firm branding, team members, form templates, cases, and audit logs.
   - **Case Manager / Reviewer**: Create & manage cases, review form submissions, approve/reject documents with comments.
   - **Staff**: View-only access to cases, documents, and client status.
   - **Client**: Access isolated to their branded onboarding portal (`/portal/[firmSlug]/[caseId]`).
   - **1-Click Demo Switcher**: Instant switching between Admin, Case Manager, Staff, and Client perspectives.

3. **Dynamic Form Builder & Conditional Logic**
   - Reusable template library with multiple field types: single-line text, textarea, number, date picker, dropdowns, checkboxes, yes/no radios.
   - Drag-and-drop / ordering controls, required/optional flags, help text.
   - **Conditional Logic Engine**: Rule evaluations (e.g. "If Entity Formation Type equals 'Corporation' → Show EIN field").
   - **Live Sandbox Preview**: Test conditional branching and field validations in real-time.

4. **Document Upload & Version History**
   - Document checklist definitions per case with required and optional flags.
   - File upload up to 25MB supporting PDF, JPG, PNG, DOCX.
   - **Version History**: Subsequent re-uploads preserve all prior versions with timestamps and file sizes.

5. **Approval / Rejection Workflow & Immutable Audit Trail**
   - Reviewers can mark documents as **Approved** or **Rejected** with structured feedback reasons.
   - Every action (case creation, form submission, upload, review decision, status update, team invite) writes an immutable event to `firms/{firmId}/auditLog`.

6. **Transactional Notifications & Outbox Simulator**
   - Automatic notification dispatch for client invites, document rejections, form submissions, and status updates.
   - Interactive **Email Outbox** in the dashboard to review all simulated transactional emails in real time.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS with dynamic custom properties
- **Backend / Storage**: Firebase (Firestore, Firebase Auth, Firebase Storage) + Fallback persistent seed store for zero-config offline demonstration
- **Icons & Effects**: Lucide React + Canvas Confetti

---

## 📦 Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration (Optional)
Copy `.env.example` to `.env.local` if connecting to a live Firebase project:
```bash
cp .env.example .env.local
```

> **Note**: If Firebase environment variables are not supplied, IntakeIQ automatically boots into **Demo/Seed Store Mode**, preloaded with multiple firms (*Apex Advisory & Legal LLP* and *Vanguard CPA Partners*), realistic cases, form questionnaires, document versions, and audit logs.

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Internal Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Branded Client Portal**: [http://localhost:3000/portal/apex-advisory/case-101](http://localhost:3000/portal/apex-advisory/case-101)
- **Form Builder**: [http://localhost:3000/dashboard/forms/builder](http://localhost:3000/dashboard/forms/builder)
- **Email Outbox**: [http://localhost:3000/dashboard/outbox](http://localhost:3000/dashboard/outbox)
- **Audit Trail**: [http://localhost:3000/dashboard/audit](http://localhost:3000/dashboard/audit)

---

## 🔒 Security Rules

- `firestore.rules`: Multi-tenant isolation ensuring requests can only read/write data belonging to their verified `firmId`, with role checks for Admin, CaseManager, Staff, and Client.
- `storage.rules`: Scoped to `firms/{firmId}/clients/{clientId}/documents/` enforcing 25MB max size and MIME type restrictions (PDF, PNG, JPG, DOCX).

---

## 🗺️ Roadmap (Milestone 2)
- AI document extraction (OCR & metadata parsing)
- Automated reminder engine (scheduled client follow-ups)
- In-app notification center
- Advanced analytics dashboard
- Compliance & audit bundle export
