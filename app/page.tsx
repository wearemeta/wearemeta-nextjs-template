'use client';

import { AppLayout } from '@wearemeta/design-system';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@wearemeta/design-system';
import { Avatar, AvatarFallback, AvatarImage } from '@wearemeta/design-system';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@wearemeta/design-system';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, useSidebarDropdown } from '@wearemeta/design-system';
import { Home, Settings, FileText, Pin, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

// Component that uses the dropdown context and auth
function UserDropdown() {
  const { setIsDropdownOpen } = useSidebarDropdown();
  const { user, logout } = useAuth();

  // User data with fallbacks
  const userData = {
    name: user?.name || user?.display_name || 'User',
    email: user?.email || 'user@example.com',
    avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=b6e3f4,c0aede,d1d4f9',
    initials: (user?.name || user?.display_name || 'U')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
  };

  return (
    <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
      <DropdownMenu onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="
              flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
              hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
              data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground
              group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center
              w-full
            "
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">{userData.name}</span>
              <span className="truncate text-xs text-muted-foreground">{userData.email}</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
          side="top"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuItem>
            <Pin className="mr-2 h-4 w-4" />
            Pin Sidebar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function HomePage() {
  const handleReportIssue = async (data: { description: string; screenshot: File | null }) => {
    // TODO: Implement your issue reporting API call here
    console.log('Reporting issue:', data);
    // Example:
    // const formData = new FormData();
    // formData.append('description', data.description);
    // if (data.screenshot) {
    //   formData.append('screenshot', data.screenshot);
    // }
    // await fetch('/api/report-issue', { method: 'POST', body: formData });
  };

  return (
    <AppLayout
      sidebarContent={
        <>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:items-center">
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-body hover:bg-subtle hover:text-sidebar-accent-foreground">
                    <Home className="size-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-body hover:bg-subtle hover:text-sidebar-accent-foreground">
                    <FileText className="size-4" />
                    <span>Page 1</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-body hover:bg-subtle hover:text-sidebar-accent-foreground">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </>
      }
      sidebarFooter={<UserDropdown />}
      showReportIssueButton={true}
      onReportIssue={handleReportIssue}
      headerContent={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome to Your App</h1>
          <p className="text-muted-foreground">
            This is a starter template with the WeAreMeta Design System.
            <br />
            Start building your application here!
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
