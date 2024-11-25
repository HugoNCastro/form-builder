import { CreateFormButton } from "@/components/Buttons/CreateFormButton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { FormCards } from "@/components/Cards/FormCards";
import { FormCardSkeleton } from "@/components/Cards/FormCardSkeleton";
import { CardStatsWrapper } from "@/components/Cards/CardStatsWrapper";
import { StatsCards } from "@/components/Cards/StatsCards";

export default function DashboardPage() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Formulários cadastrados</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((element) => {
            return <FormCardSkeleton key={element} />;
          })}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}







