import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isParentActive = page.url.startsWith(item.href || '');
          const isOpen = openMenus[item.title] || false;

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <>
                  <SidebarMenuButton
                    asChild
                    isActive={isParentActive}
                    tooltip={{ children: item.title }}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between"
                      onClick={() => toggleSubMenu(item.title)}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-4" />}
                        {item.title}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </SidebarMenuButton>

                  {/* Submenu Items */}
                  {isOpen && (
                    <SidebarMenu className="ml-4 mt-1">
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(child.href)}
                            tooltip={{ children: child.title }}
                          >
                            <Link href={child.href!}>
                              {child.icon && <child.icon className="size-4" />}
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  )}
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={isParentActive}
                  tooltip={{ children: item.title }}
                >
                  <Link href={item.href!} prefetch>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
