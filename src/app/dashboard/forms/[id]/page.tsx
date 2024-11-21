import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import { FormLinkShare } from "@/components/Form/FormLinkShare";
import { VisitButton } from "@/components/Buttons/VisitButton";

import { LucideView } from "lucide-react";
import { ElementsType, FormElementInstance } from "@/components/Form/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { StatsCard } from "@/components/Cards/StatsCard";
import { ptBR } from "date-fns/locale";
import { RowCell } from "@/components/RowCell";

export default async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareURL={form.sharedURL} />
        </div>
      </div>
      {/* Trocar nome no banco para shareUrl */}
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareURL={form.sharedURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="Total de visitas"
          icon={<LucideView className="text-blue-600" />}
          helperText="Total de visitas dessa formulário"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />

        <StatsCard
          title="Total de respostas"
          icon={<LucideView className="text-yellow-600" />}
          helperText="Total de respostas cadastradas dessa formulário."
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />

        <StatsCard
          title="Envio de formulário"
          icon={<LucideView className="text-green-600" />}
          helperText="Visitas que resultaram em envio de respostas desse formulário"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />

        <StatsCard
          title="Taxa de rejeição"
          icon={<LucideView className="text-red-600" />}
          helperText="Taxa de visitas que nào interagiram com formulário"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("Formuário não encontrado");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "CheckboxField":
      case "DateField":
      case "ParagraphField": 
      case "SelectField":
      case "SubTitleField":
      case "TitleField":
      
      columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Respostas</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableHead className="uppercase" key={column.id}>
                    {column.label}
                  </TableHead>
                );
              })}
              <TableHead className="text-muted-foreground text-right uppercase">
                Enviado em
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  {columns.map((column) => {
                    return (
                      <RowCell
                        key={column.id}
                        type={column.type}
                        value={row[column.id]}
                      />
                    );
                  })}
                  <TableCell className="text-muted-foreground text-right">
                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}


