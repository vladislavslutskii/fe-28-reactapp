import { ReactNode } from "react";

export enum ButtonType {
  Primary = `primary`,
  Secondary = `secondary`,
  Error = `error`,
  ButtonWIcon = `ButtonWIcon`,
  ButtonIcon = `ButtonIcon`,
}
export type ButtonClassnamesType = {
  [k in ButtonType]: string;
};
export type ButtonPropsType = {
  title: string | null;
  onClick?: () => void;
  className?: string;
  type: ButtonType;
  disabled?: boolean | undefined;
  iconBefore?: ReactNode | null;
  iconAfter?: ReactNode | null;
};
