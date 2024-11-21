import { GetFormSubmissionsByAgent } from "@/actions/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ElementsType, FormElementInstance } from "../Form/FormElements";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RowCell } from "../RowCell";

interface HistoryProps {
  agent: string;
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

export async function History({ agent }: HistoryProps) {
  const submissions = await GetFormSubmissionsByAgent(agent);

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  const rows: Row[] = [];

  submissions.map((submission) => {
    const formElements = JSON.parse(
      submission.form.content
    ) as FormElementInstance[];
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

    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createAt,
    });
  });

  return (
    <>
      <div className="container pt-10 space-y-6 border-b border-muted">
        <h1 className="text-2xl font-bold my-4">Histórico | {agent}</h1>
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
                    <TableCell className="text-right text-muted-foreground">
                      {formatDistance(row.submittedAt, new Date(), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
