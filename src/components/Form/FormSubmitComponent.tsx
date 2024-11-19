"use client";

import { CircleCheckIcon, Loader } from "lucide-react";
import { FormElementInstance, FormElements } from "../Form/FormElements";
import { Button } from "../ui/button";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { SubmitForm } from "@/actions/form";
import { AttemptData } from "@/types";
import { useAgent } from "../providers/AgentProvider";
import { getAgentPermissions } from "@/actions/agent";

export function FormSubmitComponent({
  formUrl,
  content,
  attemptData,
  agentID
}: {
  content: FormElementInstance[];
  formUrl: string;
  attemptData: AttemptData;
  agentID: string
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime()); // Generate random value

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const { agent, setAgent } = useAgent();

  useEffect(() => {
    if(agentID){
      getAgentPermissions(agentID).then((agentData) => {
        setAgent(agentData)
      })

      window.localStorage.setItem("@surveys/agent", agentID);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentID]);

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Por favor, verifique os erros do formulário e tente novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      const agentId =
        agent.length > 0 ? String(agent[0].cd_agente) : "";

      if (agentId === "") {
        toast({
          title: "Erro",
          description: "Algo deu errado, tente novamente.",
          variant: "destructive",
        });
      }

      await SubmitForm(formUrl, jsonContent, agentId);
      setSubmitted(true);

      toast({
        title: "Success",
        description: "Enquete enviada com sucesso !",
      });
    } catch {
      toast({
        title: "Erro",
        description: "Algo deu errado, tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div
          key={renderKey}
          className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
        >
          <h1 className="text-2xl font-bold">Enquete enviada com sucesso !</h1>
          <p className="text-muted-foreground">
            Você pode fechar essa página agora.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full items-center h-full p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
              attemptData={attemptData}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              Enviar
              <CircleCheckIcon className="mr-2" />
            </>
          )}
          {pending && (
            <>
              <Loader className="animate-spin" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
