import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { navLinks } from '@/constants';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import Image from 'next/image';

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarHeader className="px-5 py-2">
                <Image
                    src="/logos/logo_althera_blanc.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    priority
                />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navLinks.map((link) => (
                                <SidebarMenuItem key={link.label}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={link.href}
                                        >
                                            <span className="font-semibold">{link.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button className="cursor-pointer">
                                <CiLogout className="h-5 w-5" />
                                <span className="font-semibold">Déconnexion</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}