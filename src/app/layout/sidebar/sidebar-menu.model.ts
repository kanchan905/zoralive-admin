export interface SidebarChildItem {
  label: string;
  route: string;
}

export interface SidebarMenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarChildItem[];
}