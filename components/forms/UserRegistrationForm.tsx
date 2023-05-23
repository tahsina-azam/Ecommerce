import { useClearCurrentUser } from "@/hooks/useCurrentUser";
import { axios } from "@/lib/axios";
import { RegistrationResponseData } from "@/pages/api/auth/register";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import InputWrapper from "../InputWrapper";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  accountId: "",
  accountSecret: "",
  address: "",
  name: "",
};

export type UserRegistrationFormValues = typeof initialValues;

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  password: (value: string) =>
    value.length >= 6 ? null : "Password should be at least 6 characters long",
  confirmPassword: (value: string, values: typeof initialValues) =>
    value === values.password ? null : "Passwords do not match",
  accountId: (value: string) =>
    value.length == 24
      ? null
      : "Account ID should be at least 24 characters long",
  accountSecret: (value: string) =>
    value.length > 4
      ? null
      : "Account Secret should be at least 4 characters long",
  address: (value: string) =>
    value.length >= 3 ? null : "Address should be at least 3 characters long",
  name: (value: string) =>
    value.length >= 1 ? null : "Name should be at least 1 characters long",
};

const UserRegistrationForm = () => {
  const form = useForm({
    initialValues,
    validate,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const clearCurrentUser = useClearCurrentUser();
  const handleSubmit = async (values: UserRegistrationFormValues) => {
    setLoading(true);

    try {
      var response = await axios.post("/auth/register", values);
      const data: RegistrationResponseData = response.data;
      toast.success(data.message);
      //   router.push("/sign-in");
    } catch (error: any) {
      if (error.response.status == 500) {
        setLoading(false);
        toast.error("Internal Server Error");
        return;
      }
      toast.error(error.response.data.message);
      console.log(error);
      clearCurrentUser();
    }
    setLoading(false);
  };
  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <InputWrapper
        label="Name"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        {...form.getInputProps("name")}
      />

      <InputWrapper
        label="Email"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        {...form.getInputProps("email")}
      />

      <InputWrapper
        label="Address"
        type="text"
        name="address"
        id="address"
        placeholder="Address"
        required
        {...form.getInputProps("address")}
      />

      <InputWrapper
        label="Account ID"
        type="text"
        name="accountId"
        id="accountId"
        placeholder="Account ID"
        required
        {...form.getInputProps("accountId")}
      />

      <InputWrapper
        label="Account Secret"
        type="password"
        name="accountSecret"
        id="accountSecret"
        placeholder="Account Secret"
        required
        {...form.getInputProps("accountSecret")}
      />

      <InputWrapper
        label="Password"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
        {...form.getInputProps("password")}
      />

      <InputWrapper
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        required
        {...form.getInputProps("confirmPassword")}
      />

      <Button type="submit" loading={loading}>
        Sign Up
      </Button>
    </form>
  );
};

export default UserRegistrationForm;
