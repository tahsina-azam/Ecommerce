import { ProductType } from "@/global";
import { Badge, Table } from "@mantine/core";
import { Order } from "@prisma/client";
import { useMemo, useState } from "react";
import { Button } from "../Button";
import ProductModal from "../orders/ProductModal";
import { TAKA } from "../products/product-item";
import { Skeleton } from "../skeleton";

interface OrderTableProps {
  data: Order[];
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

export default function UserOrderTable({ data, isLoading }: OrderTableProps) {
  const [selected, setSelected] = useState<Order | null>(null);

  const close = () => {
    setSelected(null);
  };

  const rows = useMemo(
    () =>
      (data ?? []).map((item) => (
        <tr key={item.orderId} className="text-sm">
          <td className="text-black/70">{item.orderId}</td>
          <td className="text-black/70 text-left">
            <Badge variant="light">{item.status}</Badge>
          </td>
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

  if (isLoading)
    return (
      <div style={{ overflowX: "auto" }}> {/* Added container with overflow handling */}
        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );

  return (
    <div style={{ overflowX: "auto" }}> {/* Added container with overflow handling */}
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
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
