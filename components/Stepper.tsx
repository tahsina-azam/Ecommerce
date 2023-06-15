import { Divider, Stepper } from "@mantine/core";
const statusMap = {
  pending: 1,
  confirmed: 2,
  shipping: 3,
  delivered: 4,
};

type Props = {
  status: string;
  orderDate: Date;
  orderId: string;
};
export default function OrderStepper({ status, orderDate, orderId }: Props) {
  const active = statusMap[status as keyof typeof statusMap];
  return (
    <div className="py-8 overflow-auto">
      <div className="flex justify-between items-center pb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-500">
          Order {orderId}
        </h2>
        <p className="text-slate-500">
          {new Date(orderDate).toLocaleDateString()}
        </p>
      </div>
      <Stepper active={active} color="dark">
        <Stepper.Step label="Pending" description="Waiting for approval" />
        <Stepper.Step
          label="Confirmed"
          description="Order confirmed by the authority"
        />
        <Stepper.Step label="Shipping" description="Products are shipping" />
        <Stepper.Step
          label="Delivered"
          description="Products delivered to you"
        />
      </Stepper>
      <Divider mt="xl" />
    </div>
  );
}
