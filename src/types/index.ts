import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface FormData {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  grade?: number;
  address?: string;
  title: string;
  body: string;
}
