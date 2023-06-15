import AggregationCards from "@/components/AggregationCards";
import { Overview } from "@/components/BarChart";
import AdminLayout from "@/components/Layout/admin";
import { RecentSales } from "@/components/RecentSales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="container font-sans mt-16">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Tabs defaultValue="overview" className="space-y-4 pt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <AggregationCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-6">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="container text-4xl font-bold tracking-tight mx-auto">
              Analytics
            </h2>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
