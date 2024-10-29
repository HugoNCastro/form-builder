import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
    campaign: z.string().optional(),
    mailing: z.string().optional()
});

export type formSchemaType = z.infer<typeof formSchema>