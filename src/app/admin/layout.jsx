"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Film,
    Smartphone,
    FileText,
    Building2,
    CalendarDays,
    Ticket,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Plus,
    List,
    ChevronDown,
} from "lucide-react";
import { getAdminToken, clearAdminToken } from "./utils/adminAuth";

const SECTIONS = [
    {
        title: "Content",
        items: [
            { key: "videos", href: "/admin/videos", label: "Videos", icon: Film, addHref: "/admin/videos/new", addLabel: "Add Video" },
            { key: "shorts", href: "/admin/shorts", label: "Shorts", icon: Smartphone, addHref: "/admin/shorts/new", addLabel: "Add Short" },
            { key: "blogs", href: "/admin/blogs", label: "Blogs", icon: FileText, addHref: "/admin/blogs/new", addLabel: "Add Blog" },
            { key: "projects", href: "/admin/projects", label: "Projects", icon: Building2, addHref: "/admin/projects/new", addLabel: "Add Project" },
        ],
    },
    {
        title: "Events",
        items: [
            { key: "webinars", href: "/admin/webinars", label: "Webinars", icon: CalendarDays, addHref: "/admin/webinars/new", addLabel: "Add Webinar", exclude: ["/admin/webinars/bookings"] },
            { key: "bookings", href: "/admin/webinars/bookings", label: "Bookings", icon: Ticket },
        ],
    },
];

const inGroup = (pathname, item) => {
    if (item.exclude?.some((e) => pathname.startsWith(e))) return false;
    return pathname === item.href || pathname.startsWith(item.href + "/");
};

function NavGroup({ item, pathname, open, onToggle, onNavigate }) {
    const Icon = item.icon;
    const groupActive = inGroup(pathname, item);
    const onAdd = item.addHref && pathname === item.addHref;
    const onList = groupActive && !onAdd;
    const hasSub = !!item.addHref;

    return (
        <div>
            <div
                className={`group relative flex items-center rounded-xl transition-all ${groupActive ? "bg-white/[0.07]" : "hover:bg-white/[0.05]"
                    }`}
            >
                {groupActive && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-emerald-400" />}
                <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="flex flex-1 items-center gap-3 px-3 py-2.5 text-sm font-medium"
                >
                    <span
                        className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${groupActive ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40" : "bg-white/[0.06] text-white/60 group-hover:text-white"
                            }`}
                    >
                        <Icon size={16} />
                    </span>
                    <span className={groupActive ? "text-white" : "text-white/70 group-hover:text-white"}>{item.label}</span>
                </Link>
                {hasSub && (
                    <button
                        onClick={onToggle}
                        aria-label={open ? "Collapse" : "Expand"}
                        className="mr-2 grid h-7 w-7 place-items-center rounded-md text-white/40 hover:bg-white/10 hover:text-white"
                    >
                        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    </button>
                )}
            </div>

            {hasSub && (
                <div className={`grid transition-all duration-200 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className="ml-[22px] mt-1 mb-1 space-y-0.5 border-l border-white/10 pl-3">
                            <Link
                                href={item.href}
                                onClick={onNavigate}
                                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${onList ? "bg-white/10 font-semibold text-white" : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                            >
                                <List size={13} />
                                All {item.label}
                            </Link>
                            <Link
                                href={item.addHref}
                                onClick={onNavigate}
                                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${onAdd ? "bg-emerald-500 font-semibold text-white" : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                            >
                                <Plus size={13} />
                                {item.addLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SidebarContent({ pathname, onNavigate, onLogout }) {
    const [manual, setManual] = useState({});
    const isOpen = (item) => (item.key in manual ? manual[item.key] : inGroup(pathname, item));

    return (
        <div className="flex h-full flex-col bg-gradient-to-b from-[#16291f] to-[#0c1613] text-white">
            {/* Brand */}
            <div className="flex items-center gap-3 px-5 py-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-[#0e6b55] text-sm font-extrabold shadow-lg shadow-emerald-900/50">
                    KEC
                </div>
                <div>
                    <p className="text-[15px] font-bold leading-tight">KEC Biofuel</p>
                    <p className="text-[11px] uppercase tracking-wider text-emerald-300/70 leading-tight">Admin Panel</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 pb-4 [scrollbar-width:thin] [scrollbar-color:#32493f_transparent]">
                {SECTIONS.map((sec) => (
                    <div key={sec.title} className="mt-3">
                        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">{sec.title}</p>
                        <div className="space-y-1">
                            {sec.items.map((item) => (
                                <NavGroup
                                    key={item.key}
                                    item={item}
                                    pathname={pathname}
                                    open={isOpen(item)}
                                    onToggle={() => setManual((m) => ({ ...m, [item.key]: !isOpen(item) }))}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="m-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500/90 text-sm font-bold">A</div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold leading-tight">Admin</p>
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-300/80 hover:text-emerald-200"
                        >
                            View site <ExternalLink size={10} />
                        </a>
                    </div>
                    <button
                        onClick={onLogout}
                        title="Logout"
                        aria-label="Logout"
                        className="grid h-9 w-9 place-items-center rounded-lg text-red-300/80 hover:bg-red-500/15 hover:text-red-200 transition-colors"
                    >
                        <LogOut size={17} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const isLogin = pathname === "/admin/login";

    // Client-side guard; API still enforces auth.
    useEffect(() => {
        if (!isLogin && !getAdminToken()) router.replace("/admin/login");
    }, [isLogin, pathname, router]);

    useEffect(() => setOpen(false), [pathname]);

    const logout = () => {
        clearAdminToken();
        router.replace("/admin/login");
    };

    if (isLogin) return <>{children}</>;

    return (
        <div className="min-h-screen bg-gray-50">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 shadow-xl shadow-black/10 lg:block">
                <SidebarContent pathname={pathname} onLogout={logout} />
            </aside>

            <header className="sticky top-0 z-30 flex items-center justify-between bg-[#12201c] px-4 py-3 text-white lg:hidden">
                <span className="text-sm font-bold">KEC Admin</span>
                <button onClick={() => setOpen(true)} aria-label="Open menu">
                    <Menu size={22} />
                </button>
            </header>

            {open && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <div className="absolute inset-y-0 left-0 w-64">
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                            className="absolute right-3 top-5 z-10 text-white/70 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} onLogout={logout} />
                    </div>
                </div>
            )}

            <main className="lg:pl-64">
                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}