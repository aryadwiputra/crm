// resources/js/Components/AppSidebar.tsx

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, SettingsIcon, type LucideIcon } from 'lucide-react'; // Import LucideIcon

import AppLogo from './app-logo';

interface MainNavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    // isActive?: boolean; // Hapus properti ini jika tidak digunakan untuk default open state yang tidak terkait URL
    items?: {
        title: string;
        url: string;
    }[];
}

const mainNavItems: MainNavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        // isActive: false, // Hapus atau biarkan false
    },
    {
        title: 'Settings',
        url: '#', // URL untuk item parent yang hanya berfungsi sebagai trigger dropdown
        icon: SettingsIcon,
        // isActive: true, // <--- HAPUS ATAU UBAH MENJADI FALSE INI
        items: [
            {
                title: 'Modules',
                url: '/settings/modules',
            },
            {
                title: 'Archived',
                url: '/projects/archived',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
