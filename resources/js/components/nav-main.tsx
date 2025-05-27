// resources/js/Components/nav-main.tsx

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils'; // Asumsi Anda memiliki utility 'cn' untuk menggabungkan class Tailwind
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';

interface NavMainItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    // isActive?: boolean; // Hapus dari interface juga jika sudah dihapus dari data
    items?: {
        title: string;
        url: string;
    }[];
}

export function NavMain({ items }: { items: NavMainItem[] }) {
    const { url: currentUrl } = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasSubItems = item.items && item.items.length > 0;

                    // Logika untuk item utama (non-dropdown)
                    // Gunakan === untuk kecocokan URL yang eksak
                    const isParentActive = item.url !== '#' && currentUrl === item.url;

                    // Logika untuk dropdown: apakah ada sub-item yang aktif?
                    // Gunakan startsWith untuk sub-item karena URL sub-item mungkin lebih panjang
                    const isAnySubItemActive = hasSubItems && item.items?.some((subItem) => currentUrl.startsWith(subItem.url));

                    // Dropdown harus terbuka jika salah satu sub-itemnya aktif
                    const shouldBeOpen = isAnySubItemActive; // <--- PERUBAHAN UTAMA DI SINI

                    return (
                        <Collapsible key={item.title} asChild defaultOpen={shouldBeOpen} className="group/collapsible">
                            <SidebarMenuItem>
                                {hasSubItems ? (
                                    // Jika ada sub-menu, ini adalah trigger dropdown
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            // Parent dropdown akan aktif jika ada sub-item yang aktif
                                            className={cn(isAnySubItemActive && 'bg-gray-100 dark:bg-gray-800')}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                ) : (
                                    // Jika tidak ada sub-menu, ini adalah link langsung
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link
                                            href={item.url}
                                            // Link langsung akan aktif jika URL-nya cocok persis
                                            className={cn(isParentActive && 'bg-gray-100 dark:bg-gray-800')}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}

                                {hasSubItems && (
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => {
                                                // Sub-item aktif jika URL-nya cocok atau dimulai dengan URL sub-item
                                                const isSubCurrentActive = currentUrl.startsWith(subItem.url);
                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link
                                                                href={subItem.url}
                                                                className={cn(isSubCurrentActive && 'bg-gray-100 dark:bg-gray-800')}
                                                            >
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                )}
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
