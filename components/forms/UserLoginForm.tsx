import { useClearCurrentUser, useSetCurrentUser } from "@/hooks/useCurrentUser";
import { axios } from "@/lib/axios";
import { LoggedInResponseData } from "@/pages/api/auth/sign-in";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../Button";

const initialValues = {
  email: "",
  password: "",
};

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  password: (value: string) =>
    value.length >= 6 ? null : "Password should be at least 6 characters long",
};

const UserLoginForm = () => {
  const form = useForm({
    initialValues,
    validate,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCurrentUser = useSetCurrentUser();
  const clearCurrentUser = useClearCurrentUser();
  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);

    try {
      var response = await axios.post("/auth/sign-in", values);
      const data: Required<LoggedInResponseData> = response.data;
      const user = data.user;
      setCurrentUser(user);
      toast.success(data.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message ?? "Something went wrong");
      clearCurrentUser();
    }
    setLoading(false);
  };
  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <TextInput
          type="email"
          name="email"
          id="email"
          className="rounded-md text-sm"
          placeholder="Email"
          required
          {...form.getInputProps("email")}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <TextInput
          type="password"
          name="password"
          id="password"
          className="rounded-md text-sm"
          placeholder="Password"
          required
          {...form.getInputProps("password")}
        />
      </div>
      <Button type="submit" loading={loading}>
        Sign in
      </Button>
    </form>
  );
};

export default UserLoginForm;
