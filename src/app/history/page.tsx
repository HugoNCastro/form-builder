import { FormCardSkeleton } from "@/components/Cards/FormCardSkeleton";
import { History } from "@/components/History";
import { Suspense } from "react";

export default function HistoryPage({
  searchParams,
}: {
  searchParams: {
    agent: string;
  };
}) {

  //TODO: criar skeleton para página de histórico

  return (
    <Suspense
      fallback={[1, 2, 3, 4].map((element) => {
        return <FormCardSkeleton key={element} />;
      })} 
    >
      <History agent={searchParams.agent} />
    </Suspense>
  );
}
