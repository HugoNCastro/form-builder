import { GetForms, GetFormStats } from "@/actions/form";
import { CreateFormButton } from "@/components/CreateFormButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { ArrowRightIcon, Edit, LucideView, View, ViewIcon } from "lucide-react";
import { ReactNode, Suspense } from "react";
import { formatDistance } from "date-fns"
import { Button } from "@/components/ui/button";
import { ptBR } from 'date-fns/locale'
import Link from "next/link";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Enquetes cadastradas</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gao-6">
        <CreateFormButton />
        <Suspense fallback={[1, 2, 3, 4].map((element) => {
          return <FormCardSkeleton key={element} />
        })}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total de visitas"
        icon={<LucideView className="text-blue-600" />}
        helperText="Total de visitas das enquetes cadastradas"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total de respostas"
        icon={<LucideView className="text-yellow-600" />}
        helperText="Total de respostas das enquetes cadastradas"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Envio de formulário"
        icon={<LucideView className="text-green-600" />}
        helperText="Visitas que resultaram em envio de respostas"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Taxa de rejeição"
        icon={<LucideView className="text-red-600" />}
        helperText="Taxa de visitas que nào interagiram com formulário"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

export function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />
}

async function FormCards() {
  const forms = await GetForms()

  return <>{
    forms.map((form) => {
      return <FormCard key={form.id} form={form} />
    })
  }</>
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="gap-2 justify-between flex items-center">
          <span className="truncate font-bold">
            {form.name}
          </span>
          {form.published && <Badge>Publicada</Badge>}
          {!form.published && <Badge variant={"destructive"}>Não publicada</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createAt, new Date(), {
            addSuffix: true,
            locale: ptBR
          })}
          {form.published && <span className="flex items-center gap-2">
            <View className="text-muted-foreground" />
            <span>{form.visits.toLocaleString()}</span>
            <ViewIcon className="text-muted-foreground" />
            <span>{form.submissions.toLocaleString()}</span>
          </span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "Sem descrição cadastrada"}
      </CardContent>
      <CardFooter>
        {form.published && (
            <Button asChild className="w-full mt-2 text-md gap-4">
              <Link href={`/forms/${form.id}`}>
                Visulizar interações
                <ArrowRightIcon />
              </Link>
            </Button>
          )}
        {!form.published && (
            <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
              <Link href={`/builder/${form.id}`}>
                Editar enquete
                <Edit />
              </Link>
            </Button>
          )}
      </CardFooter>
    </Card>
  )
}
