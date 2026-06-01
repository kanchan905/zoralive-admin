export interface TableRowActionEvent<T = Record<string, unknown>> {
  action: 'edit' | 'delete';
  row: T;
}

export interface TableRowLinkEvent<T = Record<string, unknown>> {
  columnKey: string;
  row: T;
}

export interface TableRowToggleEvent<T = Record<string, unknown>> {
  columnKey: string;
  row: T;
  value: boolean;
}
