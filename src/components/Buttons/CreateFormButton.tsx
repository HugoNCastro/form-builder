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

import { LucidePenTool, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { formSchema, formSchemaType } from "../../../schemas/form";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import {
  listCampaignsAction,
  listMailingsAssociateToCampaign,
} from "@/actions/dialer";
import { CampaignProps, MailingProps } from "@/types";

export function CreateFormButton() {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [campaigns, setCampaings] = useState<CampaignProps[]>([]);
  const [mailing, setMailing] = useState<MailingProps[]>([]);

  const selectedCampaign = form.watch('campaign') || undefined

  async function onSubmit(values: formSchemaType) {
    const filteredCampaign = campaigns.find(campaign => campaign.ds_campanha === values.campaign)
    const extractMailingId= values.mailing?.split('**')[0]
    const filteredMailing = mailing.find(mailing => mailing.cd_campanha_arquivo === Number(extractMailingId))

    if (filteredCampaign && filteredMailing) {
      try {
        const formId = await CreateForm({
          name: values.name,
          description: values.description,
          campaign: values.campaign,
          mailing: values.mailing,
          campaignId: String(filteredCampaign.cd_campanha),
          mailingId: String(filteredMailing.cd_campanha_arquivo),
          author: 'Teste', // TODO: Obter dado do contexto de user
          authorAccount: '500500' // TODO: Obter dado do contexto de user
        });

        toast({
          type: "background",
          title: "Enquete criada com sucesso",
          description: "Você será direcionado para parte de ediçào",
          variant: "default",
        });

        router.push(`/builder/${formId}`);
      } catch {

        toast({
          type: "background",
          title: "Não foi possível criar a enquete.",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });

      }
    } else {

      toast({
        type: "background",
        title: "Erro interno",
        description: "Por favor, retorne a página principal e tente novamente.",
        variant: "destructive",
      });

    }
  }


  async function listMailing(campaignId: string) {
    listMailingsAssociateToCampaign(campaignId).then((result) => {
      setMailing(result);
    });
  }

  useEffect(() => {
    listCampaignsAction().then((e) => {
      const result = e["webservice-discador-lista-campanha"];
      if (result) {
        setCampaings(result);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCampaign !== undefined) {
      const campaign = campaigns.find((campaign) => campaign.ds_campanha === selectedCampaign)
      if(campaign){
        listMailing(String(campaign.cd_campanha));
      }
    }
  }, [campaigns, selectedCampaign]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="p-8 group border border-primary/20 h-full items-center justify-center flex flex-col 
          hover:border-primary hover:cursor-pointer border-dashed gap-4"
          size={'lg'}
        >
          <PlusCircle className="h-12 w-12 text-muted-foreground group-hover:text-primary"/>
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary ">
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            {selectedCampaign && (
              <FormField
                control={form.control}
                name="mailing"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o mailing" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          {mailing.map((mailing, index) => (
                            <SelectItem
                              key={index}
                              value={`${mailing.cd_campanha_arquivo + '**' + mailing.ds_campanha_arquivo}`}
                            >
                              {mailing.cd_campanha_arquivo} | {' '}
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
