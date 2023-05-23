import { useClearCart } from "@/hooks/useCartStore";
import { axios } from "@/lib/axios";
import { RegistrationResponseData } from "@/pages/api/auth/register";
import { useForm } from "@mantine/form";
import { CartItem, User } from "global";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import { TAKA } from "../products/product-item";

export type OrderData = {
  email: string;
  address: string;
  accountId: string;
  accountSecret: string;
};

const PaymentDetails = ({
  totalPrice,
  user,
  cartItems,
}: {
  totalPrice: number;
  user: User;
  cartItems: CartItem[];
}) => {
  const form = useForm<OrderData>({
    initialValues: {
      email: user.email,
      address: user.address,
      accountId: "",
      accountSecret: "",
    },
    validate: {
      address: (value: string) =>
        value.length >= 3
          ? null
          : "Address should be at least 3 characters long",
      accountId: (value: string) =>
        value.length == 24 ? null : "Account Id should be 24 characters long",
      accountSecret: (value: string) =>
        value.length >= 4
          ? null
          : "Account Secret should be at least 24 characters long",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const clearCart = useClearCart();

  const handleSubmit = async (values: OrderData) => {
    setLoading(true);

    try {
      var response = await axios.post("/order", {
        ...values,
        cartItems,
        totalPrice,
      });
      const data: RegistrationResponseData = response.data;
      toast.success(data.message);
      clearCart();
      router.push(`/user/${user.userId}`);
    } catch (error: any) {
      if (error.response.status == 500) {
        setLoading(false);
        toast.error("Internal Server Error");
        return;
      }
      toast.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <form
      className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <div className="">
        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
            value={user.email}
            readOnly
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>
        <label
          htmlFor="card-holder"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Account number
        </label>
        <div className="relative">
          <input
            type="text"
            id="card-holder"
            name="card-holder"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your account number here"
            {...form.getInputProps("accountId")}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
          </div>
        </div>
        <label
          htmlFor="card-no"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Account Secret
        </label>
        <div className="flex">
          <div className="relative w-full flex-shrink-0">
            <input
              id="card-no"
              name="card-no"
              type="password"
              className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              {...form.getInputProps("accountSecret")}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
            </div>
          </div>
        </div>
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Billing Address
        </label>
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 w-full">
            <input
              type="text"
              id="billing-address"
              name="billing-address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Address"
              {...form.getInputProps("address")}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://www.pngitem.com/pimgs/m/144-1449707_bangladesh-flag-png-bangladesh-national-flag-transparent-png.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">
              {TAKA}
              {totalPrice}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">
              {TAKA}
              {150}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            {TAKA}
            {totalPrice + 150}
          </p>
        </div>
      </div>
      <Button
        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-800"
        type="submit"
        loading={loading}
      >
        Place Order
      </Button>
    </form>
  );
};

export default PaymentDetails;
