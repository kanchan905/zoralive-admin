export type TableColumnType =
  | 'checkbox'
  | 'image'
  | 'text'
  | 'date'
  | 'actions'
  | 'toggle'
  | 'link'
  | 'badge';

export interface TableColumn {
  key: string;
  label: string;
  type?: TableColumnType;
  width?: string;
  linkLabel?: string;
}

export interface TablePaginationState {
  page: number;
  pageSize: number;
  total: number;
}
