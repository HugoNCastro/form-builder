"use client"

import { PencilOff } from "lucide-react"
import { Button } from "../ui/button"
import { UnpublishForm } from "@/actions/form"
import { Form } from "@prisma/client"

interface UnpublishFormButton {
    id: number
    onUnpublish: (updatedForm: Form) => void
}

export function UnpublishFormButton({ id, onUnpublish }: UnpublishFormButton){
    const handleUnpublish = async () => {
        const updateForm = await UnpublishForm(id)
        onUnpublish(updateForm)
    }

    return (
        <Button className="w-full mt-2 text-md gap-4 bg-purple-500 hover:bg-purple-600" onClick={handleUnpublish}>
        Retirar publicação <PencilOff />
      </Button>
    )
}