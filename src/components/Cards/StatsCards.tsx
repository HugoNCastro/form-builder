import { GetFormStats } from "@/actions/form";
import { LucideView } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface StatsCardProps {
    data?: Awaited<ReturnType<typeof GetFormStats>>;
    loading: boolean;
  }
  
  export function StatsCards(props: StatsCardProps) {
    const { data, loading } = props;
  
    return (
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de visitas"
          icon={<LucideView className="text-blue-600" />}
          helperText="Total de visitas dos formulários cadastrados"
          value={data?.visits.toLocaleString() || ""}
          loading={loading}
          className="shadow-md shadow-blue-600"
        />
  
        <StatsCard
          title="Total de respostas"
          icon={<LucideView className="text-yellow-600" />}
          helperText="Total de respostas dos formulários cadastrados"
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