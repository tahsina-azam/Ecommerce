import { OrderData, ProductType } from "@/global";
import { axios } from "@/lib/axios";
import { Badge, Group, Select, Table, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Button } from "../Button";
import { TAKA } from "../products/product-item";
import { Skeleton } from "../skeleton";
import ProductModal from "./ProductModal";

interface OrderTableProps {
  data: OrderData[];
  isLoading?: boolean;
}

const statusData = [
  "pending",
  "confirmed",
  "declined",
  "shipping",
  "delivered",
] as const;

export type OrderStatus = (typeof statusData)[number];

export default function OrderTable({
  data,
  isLoading: ordersLoading,
}: OrderTableProps) {
  const [selected, setSelected] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isOnRetail = router.pathname.includes("/retail");

  const close = () => {
    setSelected(null);
  };

  console.log({ selected });

  const handleOrderStatusChange = async (
    status: OrderStatus,
    transactionId: string,
    currentStatus: OrderStatus
  ) => {
    if (status === "pending") return;
    if (status === currentStatus) return;

    setIsLoading(true);

    try {
      const response = await axios.patch(`/order/change-status`, {
        status,
        transactionId,
      });

      console.log({ response });
    } catch (error) {}
    setIsLoading(false);
  };

  const rows = useMemo(
    () =>
      (data ?? [])
        .filter((item) => !["shipping", "delivered"].includes(item.status))
        .map((item) => (
          <tr key={item.orderId} className="text-sm">
            <td className="text-black/70">{item.orderId}</td>
            <td>
              <Select
                size="xs"
                data={
                  !isOnRetail ? statusData.slice(0, 3) : statusData.slice(1)
                }
                defaultValue={item.status}
                variant="unstyled"
                disabled={isLoading}
                style={{ minWidth: '100px' }}
                onChange={(status) =>
                  handleOrderStatusChange(
                    status as OrderStatus,
                    item.transactionId,
                    item.status as OrderStatus
                  )
                }
              />
            </td>
            <td>
              <Group spacing="sm">
                <div>
                  <Text fz="sm" fw={500}>
                    {item.user.name}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {item.user.email}
                  </Text>
                </div>
              </Group>
            </td>
            <td>{item.address}</td>
            <td>
              <Badge fullWidth>{`${TAKA} ${item.amount}`}</Badge>
            </td>
            <td onClick={() => setSelected(item)}>
              <Button size="sm" compact>
                Show products
              </Button>
            </td>
          </tr>
        )),
    [data]
  );

  if (ordersLoading)
    return (
      <div style={{ overflowX: "auto" }}>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }).map((_, i) => (
            <tr key={i} className="text-sm">
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    );

  return (
    <div style={{ overflowX: "auto" }}>
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Status</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Amount</th>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      {selected && (
        <ProductModal
          products={selected.products as ProductType[]}
          opened={selected != null}
          close={close}
        />
      )}
    </Table>
    </div>
  );
}
