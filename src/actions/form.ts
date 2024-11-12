"use server"

import { prisma } from "@/lib/prisma"
import { formSchema, formSchemaType } from "../../schemas/form"

export async function GetFormStats() {
    const stats = prisma.form.aggregate({
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = (await stats)._sum.visits || 0
    const submissions = (await stats)._sum.submissions || 0

    let submissionRate = 0

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate,
    }
}

type CreateFormProps = formSchemaType & {
    mailingId: string,
    campaignId: string,
    author: string,
    authorAccount: string
}

export async function CreateForm(data: CreateFormProps) {
    const validation = formSchema.safeParse(data);

    if (!validation.success) {
        throw new Error("Invalid form data")
    }

    const { name,
        description,
        author,
        authorAccount,
        campaignId,
        mailingId,
        campaign,
        mailing } = data

    const form = await prisma.form.create({
        data: {
            name,
            description,
            author,
            authorAccount,
            campaignDesc: campaign || '',
            mailingDesc: mailing || '',
            campaignId,
            mailingId,
            updatedBy: author,
            updatedByAccount: authorAccount
        }
    })

    if (!form) {
        throw new Error("Something went wrong")
    }

    return form.id
}

export async function GetForms() {
    return await prisma.form.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function GetFormById(id: number) {
    return prisma.form.findUnique({
        where: {
            id: id
        }
    })

}

export async function UpdateFormContent(id: number, jsonContent: string) {
    return await prisma.form.update({
        where: {
            id,
        },
        data: {
            content: jsonContent,
        },
    })

}

export async function PublishForm(id: number) {
    return await prisma.form.update({
        where: {
            id,
        },
        data: {
            published: true,
        },
    })
}

export async function GetFormContentByUrl(formUrl: string) {
    return await prisma.form.update({
        select: {
            content: true
        },
        data: {
            visits: {
                increment: 1
            }
        },
        where: {
            sharedURL: formUrl
        }
    })
}

export async function SubmitForm(formUrl: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: {
                increment: 1
            },
            FormSubmissions: {
                create: {
                    content
                }
            }
        },
        where: {
            sharedURL: formUrl,
            published: true
        }
    })
}

export async function GetFormWithSubmissions(id: number) {
    return await prisma.form.findUnique({
        where: {
            id: id
        },
        include: {
            FormSubmissions: true,
        },
    })
}

export async function UnpublishForm(id: number){
    const updatedForm = await prisma.form.update({
        where: {
            id,
        },
        data: {
            published: false,
        },
    })

    return updatedForm
}

export async function DeleteForm(id: number){
    const updatedForm = await prisma.form.delete({
        where: {
            id,
        },
    })

    return updatedForm
}
