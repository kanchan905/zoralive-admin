export type StatCardTheme =
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'teal'
  | 'orange'
  | 'amber';

export interface StatCard {
  label: string;
  icon: string;
  theme: StatCardTheme;
  /** Na ho to sirf label dikhega (Online Host, Live Host, Net Worth) */
  value?: number | null;
}
