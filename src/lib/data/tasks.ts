export interface SelectItems {
  id: string | number;
}

export interface RowData {
  id: number;
  label: string;
  type: string;
  endpoint: string;
  category: string;
  categories: { label: string, tag: string }[];
  description: string;
  tag: string;
  active: false;
  vendor: string;
  metadata: {icon: string};
  created_at: string;
  updated_at: string;
  [key: string]: string | number | boolean | { label: string }[] | string[] | object;
}

export type ModalDataType = {
  label: string;
  type: string;
  endpoint: string;
  category: string;
  tag: string;
  active: false;
  vendor: string;
  description: string;
};