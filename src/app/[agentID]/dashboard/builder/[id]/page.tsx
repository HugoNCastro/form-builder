
import { GetFormById } from "@/actions/form"
import FormBuilder from "@/components/Form/FormBuilder"

export default async function BuilderPage(props: {
  params: {
    id: string
  }
}) {
  const { id } = await props.params
  const form = await GetFormById(Number(id))

  if(!form){
    throw new Error('Form not found')
  }

  return (
    <FormBuilder form={form} />
  )
}




