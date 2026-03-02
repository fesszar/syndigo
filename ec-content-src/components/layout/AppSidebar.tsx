import { 
  Gauge, 
  ListTree, 
  TrendingUp, 
  FileText, 
  Link2, 
  Image, 
  ArrowLeftRight, 
  Radio,
  Settings,
  Wrench,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: Gauge, label: 'Dashboards', href: '#' },
  { icon: ListTree, label: 'Products', href: '#' },
  { icon: TrendingUp, label: 'Report Center', href: '#' },
  { icon: FileText, label: 'Enhanced Content', href: '#', active: true },
  { icon: Link2, label: 'URLs', href: '#' },
  { icon: Image, label: 'Assets', href: '#' },
  { icon: ArrowLeftRight, label: 'Connections', href: '#' },
  { icon: Radio, label: 'Requests', href: '#' },
];

const bottomItems = [
  { icon: Settings, label: 'Account Setup', href: '#' },
  { icon: Wrench, label: 'Admin Tooling', href: '#' },
  { icon: AlertCircle, label: 'Report Problem', href: '#' },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="border-r border-border bg-sidebar w-24">
      <SidebarContent className="flex flex-col h-full">
        {/* Main Navigation */}
        <SidebarGroup className="flex-1 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.active}
                    className="flex flex-col items-center justify-center h-auto py-3 px-2 gap-1.5"
                  >
                    <a href={item.href} className="flex flex-col items-center text-center">
                      <item.icon className="w-5 h-5" />
                      <span className="text-[10px] leading-tight">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Ellipsis/More */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col items-center justify-center h-auto py-3 px-2 gap-1.5">
                  <MoreHorizontal className="w-5 h-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="flex flex-col items-center justify-center h-auto py-3 px-2 gap-1.5"
                  >
                    <a href={item.href} className="flex flex-col items-center text-center">
                      <item.icon className="w-5 h-5" />
                      <span className="text-[10px] leading-tight">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <p className="text-[9px] text-muted-foreground text-center">© Syndigo LLC</p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
