"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useTenant } from "@/lib/context/TenantContext";
import { DataStore } from "@/lib/store/dataStore";
import { FormTemplate, FormField } from "@/lib/types";
import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { useToast } from "@/components/shared/ToastProvider";

function FormBuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get("id");

  const { currentUser, role } = useAuth();
  const { currentFirm } = useTenant();
  const toast = useToast();

  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    DataStore.initSeedData();
    if (templateId) {
      const found = DataStore.getFormTemplateById(templateId);
      if (found) {
        setTemplate(found);
      }
    }
    setLoaded(true);
  }, [templateId]);

  if (!loaded) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading Form Builder...</div>;
  }

  const handleSave = (data: {
    title: string;
    description: string;
    category: string;
    fields: FormField[];
  }) => {
    if (!currentFirm) {
      toast.error("No active firm selected. Please refresh and try again.");
      return;
    }

    try {
      const saved = DataStore.saveFormTemplate({
        id: template?.id,
        firmId: currentFirm.id,
        title: data.title,
        description: data.description,
        category: data.category,
        fields: data.fields,
      });

      if (currentUser) {
        DataStore.addAuditLog({
          firmId: currentFirm.id,
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          action: template ? "Form Template Updated" : "Form Template Created",
          targetEntity: saved.title,
          details: `Saved with ${saved.fields.length} dynamic fields and conditional rules.`
        });
      }

      toast.success(template ? "Form template updated." : "Form template created.");
      router.push("/dashboard/forms");
    } catch (err) {
      toast.error("Something went wrong saving this template. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <DynamicFormBuilder
        initialTemplate={template}
        onSave={handleSave}
        onCancel={() => router.push("/dashboard/forms")}
      />
    </div>
  );
}

export default function FormBuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Form Builder...</div>}>
      <FormBuilderContent />
    </Suspense>
  );
}
