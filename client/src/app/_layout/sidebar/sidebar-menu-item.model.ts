export interface SidebarMenuItem {
  label: string;
  icon?: string;
  command?: (event?: any) => void;
  items?: SidebarMenuItem[];
}
