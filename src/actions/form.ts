"use server";

import { prisma } from "@/lib/prisma";
import { formSchema, formSchemaType } from "../../schemas/form";
import { AgentItem } from "@/types";

export async function GetFormStats() {
  const totalStats = prisma.form.aggregate({
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const totalVisits = (await totalStats)._sum.visits || 0;
  const totalSubmissions = (await totalStats)._sum.submissions || 0;

  let totalSubmissionRate = 0;

  if (totalVisits > 0) {
    totalSubmissionRate = (totalSubmissions / totalVisits) * 100;
  }

  const totalBounceRate = 100 - totalSubmissionRate;

  const formStats = await prisma.form.groupBy({
    by: ["id", "name"],
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const detailedStats = formStats.map((form) => {
    const visits = form._sum.visits || 0;
    const submissions = form._sum.submissions || 0;
    const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
    const bounceRate = 100 - submissionRate;

    return {
      id: form.id,
      name: form.name,
      visits,
      submissions,
      submissionRate,
      bounceRate,
    };
  });

  return {
    totalStats: {
      totalVisits,
      totalSubmissions,
      totalSubmissionRate,
      totalBounceRate,
    },
    detailedStats,
  };
}

type CreateFormProps = formSchemaType & {
  mailingId: string;
  campaignId: string;
  author: string;
  authorAccount: string;
};

export async function CreateForm(data: CreateFormProps) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid form data");
  }

  const {
    name,
    description,
    author,
    authorAccount,
    campaignId,
    mailingId,
    campaign,
    mailing,
  } = data;

  const form = await prisma.form.create({
    data: {
      name,
      description,
      author,
      authorAccount,
      campaignDesc: campaign || "",
      mailingDesc: mailing || "",
      campaignId,
      mailingId,
      updatedBy: author,
      updatedByAccount: authorAccount,
    },
  });

  if (!form) {
    throw new Error("Something went wrong");
  }

  return form.id;
}

export async function GetForms() {
  return await prisma.form.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  return prisma.form.findUnique({
    where: {
      id: id,
    },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string, userData: AgentItem) {
  return await prisma.form.update({
    where: {
      id,
    },
    data: {
      content: jsonContent,
      updatedAt: new Date(),
      updatedBy: userData.nm_agente,
      updatedByAccount: userData.cd_matricula
    },
  });
}

export async function PublishForm(id: number) {
  return await prisma.form.update({
    where: {
      id,
    },
    data: {
      published: true,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      sharedURL: formUrl,
    },
  });
}

export async function SubmitForm(
  formUrl: string,
  content: string,
  agent: string
) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
          agent,
        },
      },
    },
    where: {
      sharedURL: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: number) {
  return await prisma.form.findUnique({
    where: {
      id: id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}

export async function UnpublishForm(id: number) {
  const updatedForm = await prisma.form.update({
    where: {
      id,
    },
    data: {
      published: false,
    },
  });

  return updatedForm;
}

export async function DeleteForm(id: number) {
  const updatedForm = await prisma.form.delete({
    where: {
      id,
    },
  });

  return updatedForm;
}

export async function GetFormSubmissionsByAgent(agentID: string) {
  return prisma.formSubmissions.findMany({
    where: {
      agent: agentID,
    },
    include: {
      form: true,
    },
  });
}
