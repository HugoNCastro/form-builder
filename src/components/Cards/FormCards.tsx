"use client";

import { GetForms } from "@/actions/form";
import { FormCard } from "./FormCard";
import { useEffect, useState } from "react";
import { Form } from "@prisma/client";

export function FormCards() {
  const [forms, setForms] = useState<Form[]>([]);

  async function FetchForms() {
    const fetchedForms = await GetForms();
    setForms(fetchedForms);
  }

  useEffect(() => {
    FetchForms();
  }, []);

  const handleUnpublish = (updatedForm: Form) => {
    setForms((prevForms) =>
      prevForms.map((form) => (form.id === updatedForm.id ? updatedForm : form))
    );
  };

  const handleDelete = (deletedFormId: number) => {
    setForms((prevForms) => prevForms.filter((form) => form.id !== deletedFormId));
  };

  return (
    <>
      {forms.map((form) => {
        return (
          <FormCard
            key={form.id}
            form={form}
            onUnpublish={handleUnpublish}
            onDelete={() => handleDelete(form.id)}
          />
        );
      })}
    </>
  );
}
