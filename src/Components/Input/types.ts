export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  type?: string;
};
