import { FC } from "react";
import { Calculator, CreditCard, DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getOrdersCount } from "@/actions/get-orders-count";
import Overview from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const ordersCount = await getOrdersCount(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Resumo geral da sua farmácia" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
              <CardTitle className="text-sm font-medium">
                Receita total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendas / Pedidos
              </CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {ordersCount ? (
                <div className="text-2xl font-bold">
                  {((salesCount / ordersCount) * 100).toFixed()} %
                </div>
              ) : (
                <div className="text-2xl font-bold">Sem dados</div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Resumo geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
