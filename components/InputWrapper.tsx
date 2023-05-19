import { TextInput, TextInputProps } from "@mantine/core";

type InputWrapperProps = {
  label: string;
} & TextInputProps;

const InputWrapper = ({
  label,
  type,
  name,
  placeholder,
  ...props
}: InputWrapperProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <TextInput
        type={type}
        name={name}
        id={name}
        className="rounded-md text-sm"
        placeholder={placeholder ?? label}
        required
        {...props}
      />
    </div>
  );
};

export default InputWrapper;
