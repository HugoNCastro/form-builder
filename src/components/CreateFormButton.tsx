"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { File, LucidePenTool } from "lucide-react";
import { Button } from "./ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { formSchema, formSchemaType } from "../../schemas/form";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "./ui/select";
import { useEffect, useState } from "react";
import {
  listCampaignsAction,
  listMailingsAssociateToCampaign,
} from "@/actions/dialer";
import { CampaignProps, MailingProps } from "@/types";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export function CreateFormButton() {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [campaigns, setCampaings] = useState<CampaignProps[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState({} as CampaignProps);
  const [mailing, setMailing] = useState<MailingProps[]>([]);

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);

      toast({
        type: "background",
        value: "Enquete criada com sucesso",
        variant: "default",
      });

      router.push(`/builder/${formId}`);
    } catch {
      toast({
        type: "background",
        value: "Não foi possível criar a enquete. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }

  async function listMailing(campaignId: string) {
    listMailingsAssociateToCampaign(campaignId).then((result) => {
      setMailing(result);
    });
  }

  const onChangeCampaign = (value: string) => {
    const findCampaign = campaigns.find(
      (campaing) => campaing.ds_campanha === value
    );

    if (!findCampaign) {
      throw new Error("Campanha não encontrada");
    }

    setSelectedCampaign(findCampaign);
  };

  useEffect(() => {
    listCampaignsAction().then((e) => {
      const result = e["webservice-discador-lista-campanha"];
      if (result) {
        setCampaings(result);
      }
    });
  }, []);

  console.log(form, "form");

  useEffect(() => {
    if (selectedCampaign.cd_campanha) {
      listMailing(String(selectedCampaign.cd_campanha));
    }
  }, [selectedCampaign]);

  console.log(selectedCampaign, 'selectedCampaign')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <File className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Criar nova enquete
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar enquete</DialogTitle>
          <DialogDescription>Crie uma nova enquete</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      className="min-h-40 max-h-60"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="campaign"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field} onValueChange={onChangeCampaign}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a campanha" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {campaigns.map((campaign) => (
                          <SelectItem
                            key={campaign.cd_campanha}
                            value={campaign.ds_campanha}
                          >
                            {campaign.ds_campanha}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {selectedCampaign.cd_campanha && (
              <FormField
                control={form.control}
                name="mailing"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select { ...field }>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o mailing" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          {mailing.map((mailing) => (
                            <SelectItem
                              key={mailing.cd_campanha_arquivo}
                              value={String(mailing.cd_campanha_arquivo)}
                            >
                              {mailing.cd_campanha_arquivo} |{" "}
                              {mailing.ds_campanha_arquivo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
        <DialogFooter>
          <Button
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {!form.formState.isSubmitting && <span>Salvar</span>}
            {form.formState.isSubmitting && (
              <LucidePenTool className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
