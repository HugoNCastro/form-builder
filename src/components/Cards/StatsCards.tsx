import { GetFormStats } from "@/actions/form";
import { Eye, ListCheck, Percent, TriangleAlert } from "lucide-react";
import { VisitsCardDashboard } from "../CardCharts/Dashboard/VisitsCardDashboard";
import { SubmissionsCardDashboard } from "../CardCharts/Dashboard/SubmissionsCardDashboard";
import { RejectCardDashboard } from "../CardCharts/Dashboard/RejectCardDashboard";
import { SubmissionRateCardDashboard } from "../CardCharts/Dashboard/SubmissionRateCardDashboard";

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

export function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <VisitsCardDashboard
        title="Total de visitas"
        icon={<Eye className="text-blue-600" />}
        helperText="Total de visitas dos formulários cadastrados"
        value={data}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <SubmissionsCardDashboard
        title="Total de respostas"
        icon={<ListCheck className="text-yellow-600" />}
        helperText="Total de respostas dos formulários cadastrados"
        value={data}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <SubmissionRateCardDashboard
        title="Envio de formulário"
        icon={<Percent className="text-green-600" />}
        helperText="Visitas que resultaram em envio de respostas"
        value={data}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <RejectCardDashboard
        title="Taxa de rejeição"
        icon={<TriangleAlert className="text-red-600" />}
        helperText="Taxa de visitas que não interagiram com formulário"
        value={data}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}
