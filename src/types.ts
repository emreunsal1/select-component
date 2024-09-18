export type SelectInputOnChaneData =
  | SelectInputOption
  | Array<SelectInputOption>;

export type SelectInputOption = {
  label: string;
  value: string | number;
  image?: string;
  "data-label"?: string;
  "data-value"?: string | number;
  "data-image"?: string;
};

export type SelectRenderOption = HTMLElement;

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
  optionRender?: () => React.ReactElement[];
};

export type APIResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ExampleData = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};
