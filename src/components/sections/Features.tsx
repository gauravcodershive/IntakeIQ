"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Building2,
  FileCheck2,
  UserCheck,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  GitBranch,
} from "lucide-react";

import ClientPortalMockup from "../mockups/ClientPortalMockup";
import FormBuilderMockup from "../mockups/FormBuilderMockup";
import DocumentChecklistMockup from "../mockups/DocumentChecklistMockup";
import ApprovalWorkflowMockup from "../mockups/ApprovalWorkflowMockup";
import AdminDashboardMockup from "../mockups/AdminDashboardMockup";
import Reveal from "../shared/Reveal";
import AnimatedCounter from "../shared/AnimatedCounter";

interface FeatureBullet {
  label: string;
  text: string;
}

interface FeatureDef {
  id: string;
  anchorId: string;
  icon: typeof Building2;
  label: string;
  badge: string;
  title: string;
  description: string;
  bullets: FeatureBullet[];
  stat: { value: string; label: string; detail: string };
  ctaText: string;
  Mockup: React.ComponentType;
}

const FEATURES: FeatureDef[] = [
  {
    id: "portal",
    anchorId: "feature-portal",
    icon: Building2,
    label: "Client Portal",
    badge: "Multi-Tenant Architecture",
    title: "Branded, Multi-Tenant Client Portal",
    description:
      "Provide your clients with a modern, high-trust onboarding experience that reflects your firm's brand. Each firm operates in an isolated environment with custom domain and color branding.",
    bullets: [
      { label: "Custom Branding & Subdomains", text: "Showcase your firm logo, colors, and dedicated subdomain (e.g. portal.yourfirm.com)." },
      { label: "Strict Isolated Data Per Firm", text: "Multi-tenant data partitioning guarantees complete data boundaries and privacy." },
      { label: "Role-Based Access Control", text: "Pre-built permission tiers for Admins, Case Managers, Review Staff, and Client Participants." },
    ],
    stat: { value: "100%", label: "One portal, unlimited firms", detail: "Seamlessly scale across practice areas and subsidiary firms with complete separation." },
    ctaText: "Explore the Client Portal experience",
    Mockup: ClientPortalMockup,
  },
  {
    id: "forms",
    anchorId: "feature-forms",
    icon: GitBranch,
    label: "Form Builder",
    badge: "Conditional Questionnaire Engine",
    title: "Dynamic Form Builder",
    description:
      "Replace generic PDF questionnaires with intelligent, interactive intake forms. Collect exact structured information from clients without overwhelming them with irrelevant questions.",
    bullets: [
      { label: "Drag-and-Drop Form Builder", text: "Construct polished forms with text, date, currency, entity selectors, and file attachment fields." },
      { label: "Conditional Logic Branching", text: "Dynamically reveal follow-up fields based on client selections (e.g., entity type or jurisdiction)." },
      { label: "Reusable Form Templates", text: "Save standardized intake master templates and deploy them across new engagements in seconds." },
    ],
    stat: { value: "0", label: "Irrelevant questions asked", detail: "Conditional branching ensures clients only see fields directly relevant to their entity type." },
    ctaText: "See Form Builder templates",
    Mockup: FormBuilderMockup,
  },
  {
    id: "documents",
    anchorId: "feature-documents",
    icon: FileCheck2,
    label: "Documents",
    badge: "Structured Document Requests",
    title: "Document Upload & Checklist Tracking",
    description:
      "Never lose a critical PBC or KYC document in an email inbox again. Clients receive a clear, unambiguous checklist with clear requirements and instant versioning.",
    bullets: [
      { label: "Required vs. Optional Labeling", text: "Eliminate ambiguity by clearly categorizing mandatory regulatory items from optional disclosures." },
      { label: "Version History Per Document", text: "Maintain complete version lineage (v1.0, v2.0) with original timestamp and submitter details." },
      { label: "Secure Direct Uploads", text: "Encrypted file transport supporting PDFs, spreadsheets, corporate scans, and contracts up to 50MB." },
    ],
    stat: { value: "0", label: "Lost email attachments", detail: "Every file uploaded is permanently anchored to its corresponding requirement and version timeline." },
    ctaText: "See document checklist features",
    Mockup: DocumentChecklistMockup,
  },
  {
    id: "workflow",
    anchorId: "feature-workflow",
    icon: UserCheck,
    label: "Approvals",
    badge: "Verification & Governance",
    title: "Approval Workflow & Activity Audit Trail",
    description:
      "Establish rigorous review discipline across your firm. Review staff can approve valid documents or reject incomplete ones with feedback notes — with every single event captured in an immutable activity log.",
    bullets: [
      { label: "Manual Approve / Reject Workflow", text: "Give review staff instant controls to accept submissions or request amendments with clear guidance." },
      { label: "Full Audit Trail of Every Action", text: "Every upload, review, status change, and comment is permanently recorded with user timestamp." },
      { label: "Role-Enforced Permissions", text: "Strict authorization guards ensure only authorized managers can grant final client onboarding approval." },
    ],
    stat: { value: "100%", label: "Action accountability", detail: "Every single document approval or rejection is permanently logged for rigorous operational review." },
    ctaText: "Learn about reviewer permissions",
    Mockup: ApprovalWorkflowMockup,
  },
  {
    id: "admin",
    anchorId: "feature-admin",
    icon: LayoutDashboard,
    label: "Admin Dashboard",
    badge: "Centralized Oversight",
    title: "Admin Dashboard & Case Tracking",
    description:
      "Gain real-time visibility across every client case in your firm. Monitor completion percentages, spot stalled submissions before deadlines, and keep team members aligned.",
    bullets: [
      { label: "Real-Time Onboarding Stages", text: "Track cases seamlessly across Drafting, Awaiting Client, Under Review, and Approved." },
      { label: "Cross-Firm Filter & Search", text: "Instantly filter by firm entity, template, assignee, or status to pinpoint active cases." },
      { label: "Basic Email Status Alerts", text: "Automated email alerts notify staff when a client submits files or completes their onboarding packet." },
    ],
    stat: { value: "24/7", label: "Real-time pipeline visibility", detail: "Know the exact status of every onboarding case across your firm at a single glance." },
    ctaText: "Request an admin console demo",
    Mockup: AdminDashboardMockup,
  },
];

export default function Features({ onRequestDemo }: { onRequestDemo: () => void }) {
  const [activeId, setActiveId] = useState<string>(FEATURES[0].id);

  const selectByHash = useCallback((hash: string) => {
    const match = FEATURES.find((f) => `#${f.anchorId}` === hash);
    if (match) setActiveId(match.id);
  }, []);

  useEffect(() => {
    if (window.location.hash) selectByHash(window.location.hash);
    const onHashChange = () => selectByHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [selectByHash]);

  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];
  const Mockup = active.Mockup;
  const ActiveIcon = active.icon;
  const statMatch = active.stat.value.match(/^(\d+)(%?)$/);

  return (
    <section id="features" className="py-20 sm:py-24 scroll-mt-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Invisible per-feature anchors so navbar deep-links land in the right place */}
        {FEATURES.map((f) => (
          <span key={f.anchorId} id={f.anchorId} className="block scroll-mt-28" aria-hidden="true" />
        ))}

        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold">
            <span>Everything in One Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 tracking-tight">
            One Workspace, From Intake to Approval
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Five core building blocks, one connected system. Select a tab to see it in action.
          </p>
        </Reveal>

        {/* Tab Bar */}
        <Reveal
          delay={100}
          role="tablist"
          aria-label="IntakeIQ features"
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(f.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-brand-500 border-brand-500 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-brand-500"}`} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Active Feature Panel */}
        <div key={active.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in">
          {/* Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-2 bg-brand-500/5 rounded-2xl filter blur-xl -z-10" />
              <Mockup />
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold">
              <ActiveIcon className="w-3.5 h-3.5 text-brand-600" />
              <span>{active.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight leading-tight">
              {active.title}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed">
              {active.description}
            </p>

            <div className="space-y-3 pt-1">
              {active.bullets.map((bullet) => (
                <div key={bullet.label} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-slate-900">{bullet.label}: </strong>
                    <span className="text-sm text-slate-600">{bullet.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat Callout */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-4">
              <div className="text-3xl font-extrabold text-brand-500 font-mono">
                {statMatch ? (
                  <AnimatedCounter
                    key={active.id}
                    value={parseInt(statMatch[1], 10)}
                    suffix={statMatch[2]}
                    duration={800}
                  />
                ) : (
                  active.stat.value
                )}
              </div>
              <div className="text-xs text-slate-600">
                <strong className="block text-slate-900 font-bold">{active.stat.label}</strong>
                {active.stat.detail}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onRequestDemo()}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors duration-150 py-2 -my-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 group"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
