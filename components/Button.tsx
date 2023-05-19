import { Button, ButtonProps } from "@mantine/core";

const CustomButton = (props: ButtonProps) => {
  return <Button className="bg-black hover:bg-black rounded-md" {...props} />;
};

export { CustomButton as Button };
