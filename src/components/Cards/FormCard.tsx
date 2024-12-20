import { Form } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { formatDistance } from "date-fns";
import { ArrowRightIcon, Edit, Eye,ListCheck } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { UnpublishFormButton } from "../Buttons/UnpublishFormButton";
import { DeleteFormButton } from "../Buttons/DeleteFormButton";

export function FormCard({
  form,
  onUnpublish,
  onDelete
}: {
  form: Form;
  onUnpublish: (updatedForm: Form) => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="gap-2 justify-between flex items-center">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Publicada</Badge>}
          {!form.published && (
            <Badge variant={"destructive"}>Não publicada</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm h-6">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
            locale: ptBR,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <Eye className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <ListCheck className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "Sem descrição cadastrada"}
      </CardContent>
      <CardFooter className="flex flex-col">
        {form.published && (
          <Button asChild className="text-black dark:text-white w-full mt-2 text-md gap-4">
            <Link href={`/dashboard/forms/${form.id}`}>
              Visualizar interações
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
        {form.published && (
          <UnpublishFormButton id={form.id} onUnpublish={onUnpublish} />
        )}
        {!form.published && (
          <div className="w-full text-md">
            <Button asChild variant={"secondary"} className="text-black dark:text-white w-full mt-2 text-md gap-4">
              <Link href={`/dashboard/builder/${form.id}`}>
                Editar formulário
                <Edit />
              </Link>
            </Button>
            <DeleteFormButton id={form.id} onDelete={onDelete}/>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
