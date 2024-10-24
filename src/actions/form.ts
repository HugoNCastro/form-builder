"use server"

import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { formSchema, formSchemaType } from "../../schemas/form"

class UserNotFoundError extends Error {
} 

export async function GetFormStats(){
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundError()
    }

    const stats = prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits  = (await stats)._sum.visits || 0
    const submissions  = (await stats)._sum.submissions || 0

    let submissionRate = 0
    
    if(visits > 0){
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

export async function CreateForm(data: formSchemaType){
    const validation = formSchema.safeParse(data);

    if(!validation.success){
        throw new Error("Invalid form data")
    }

    const user = await currentUser()
    if(!user){
        throw new UserNotFoundError()
    }

    const {name, description} = data

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name, 
            description
        }
    })

    if(!form){
        throw new Error("Something went wrong")
    }

    return form.id
}