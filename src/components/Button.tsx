import { Button as NativeBaseButton, IButtonProps, Heading } from "native-base";

interface IProps extends IButtonProps {
  title: string;
}

export const Button = ({ title, ...rest }: IProps) => {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
};
