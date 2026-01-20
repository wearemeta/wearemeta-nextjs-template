'use client';

import * as React from 'react';
import Link from 'next/link';
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
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator, 
  useSidebarDropdown, 
  useSidebarPin 
} from '@wearemeta/design-system';
import { Home, Settings, FileText, Pin, PinOff, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

function UserDropdown() {
  const { setIsDropdownOpen, isDropdownOpen } = useSidebarDropdown();
  const { isPinned, togglePin } = useSidebarPin();
  const { user, logout } = useAuth();

  const userData = {
    name: user?.name || user?.display_name || 'User',
    email: user?.email || 'user@example.com',
    avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=b6e3f4,c0aede,d1d4f9',
    initials: (user?.name || user?.display_name || 'U')
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
  };

  return (
    <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
      <DropdownMenu onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            aria-label={`User menu for ${userData.name}`}
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            className="
              flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
              hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-sidebar
              data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground
              group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center
              w-full
            "
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={userData.avatar} alt={`${userData.name}'s avatar`} />
              <AvatarFallback aria-label={`${userData.name} initials`}>{userData.initials}</AvatarFallback>
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
          role="menu"
          aria-label="User menu"
        >
          <DropdownMenuItem 
            onClick={togglePin}
            role="menuitem"
            aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {isPinned ? (
              <>
                <PinOff className="mr-2 h-4 w-4" aria-hidden="true" />
                Unpin Sidebar
              </>
            ) : (
              <>
                <Pin className="mr-2 h-4 w-4" aria-hidden="true" />
                Pin Sidebar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={logout}
            role="menuitem"
            aria-label="Log out"
          >
            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <nav aria-label="Main navigation">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:items-center" role="menubar" aria-label="Main navigation menu">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className="text-body hover:bg-subtle hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <Link href="/" aria-label="Navigate to home page">
                      <Home className="size-4" aria-hidden="true" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="text-body hover:bg-subtle hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Navigate to page 1"
                  >
                    <FileText className="size-4" aria-hidden="true" />
                    <span>Page 1</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className="text-body hover:bg-subtle hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <Link href="/settings" aria-label="Navigate to settings page">
                      <Settings className="size-4" aria-hidden="true" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
      }
      sidebarFooter={<UserDropdown />}
      showReportIssueButton={true}
      onReportIssue={handleReportIssue}
      headerContent={
        <nav aria-label="Breadcrumb navigation">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator aria-hidden="true" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      }
    >
      <main id="main-content" role="main" aria-label="Main content" tabIndex={-1}>
        {children}
      </main>
    </AppLayout>
  );
}
