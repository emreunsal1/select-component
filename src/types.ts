export type SelectInputOnChaneData =
  | SelectInputOption
  | Array<SelectInputOption>;

export type SelectInputOption = {
  label: string;
  value: string | number;
};

export type SelectInputProps = {
  title: string;
  description: string;
  placeholder: string;
  options: Array<SelectInputOption>;
  mode: "single" | "multiple";
  onChange: (data: SelectInputOnChaneData) => void;
  value: SelectInputOption | Array<SelectInputOption>;
  icon: string;
  style?: React.CSSProperties;
  optionRender?: (option: SelectInputOption) => React.ReactElement;
};

export type APIResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
