import { ProductType } from "@/global";
import { Badge, Table } from "@mantine/core";
import { Order } from "@prisma/client";
import { useMemo, useState } from "react";
import { Button } from "../Button";
import ProductModal from "../orders/ProductModal";
import { TAKA } from "../products/product-item";

interface OrderTableProps {
  data: Order[];
}

const statusData = [
  "pending",
  "confirmed",
  "declined",
  "shipping",
  "delivered",
] as const;

export type OrderStatus = (typeof statusData)[number];

export default function UserOrderTable({ data }: OrderTableProps) {
  const [selected, setSelected] = useState<Order | null>(null);

  const close = () => {
    setSelected(null);
  };

  const rows = useMemo(
    () =>
      data.map((item) => (
        <tr key={item.orderId} className="text-sm">
          <td className="text-black/70">{item.orderId}</td>
          <td className="text-black/70 text-left">
            <Badge variant="light">{item.status}</Badge>
          </td>
          {/* <td className="text-black/70">{item.transactionId}</td> */}
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

  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Status</th>
          {/* <th>Transaction Id</th> */}
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
  );
}
