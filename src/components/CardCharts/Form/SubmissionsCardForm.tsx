"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StatsFormProps } from "@/types";

export function SubmissionsCardForm({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: StatsFormProps | undefined;
  icon: ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
}) {
  const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const chartData = value
    ? [
        {
          id: value.id,
          name: value.name,
          visitors: value.visits,
          submissions: value.submissions,
          submissionRate: value.submissionRate,
          bounceRate: value.bounceRate,
          fill: colorPalette[0], //TODO: trocar cor de acordo dinamicamente
        },
      ]
    : [];

  const chartConfig = {
    visitors: {
      label: "Respostas",
    },
  } satisfies ChartConfig;

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
          {!loading &&
            chartData.length > 0 &&
            value !== undefined &&
            value.submissions > 0 && (
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="submissions"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {value.submissions}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Respostas
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          {!loading && (!value || value.submissions === 0) && (
            <div className="text-center text-muted-foreground">
              <p>Nenhum dado disponível para exibição.</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 font-medium leading-none">
          {helperText}
        </div>
      </CardFooter>
    </Card>
  );
}
