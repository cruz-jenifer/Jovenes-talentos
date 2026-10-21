import React from 'react';
import { ViewType } from '../types';
import { LayoutDashboard, BookOpen, Bell, Calendar, Wrench, Users, X, FileCheck, MessageSquare } from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  mobileOpen,
  onCloseMobile,
  onOpenProfile,
  unreadCount = 3
}) => {
  const navItems = [
    {
      id: 'dashboard' as ViewType,
      label: 'Dashboard / Mi Progreso',
      icon: LayoutDashboard,
    },
    {
      id: 'plan' as ViewType,
      label: 'Plan de Estudios (Teoría)',
      icon: BookOpen,
    },
    {
      id: 'evaluaciones' as ViewType,
      label: 'Evaluaciones & Exámenes',
      icon: FileCheck,
    },
    {
      id: 'foro' as ViewType,
      label: 'Foro Técnico de Cátedra',
      icon: MessageSquare,
    },
    {
      id: 'novedades' as ViewType,
      label: 'Avisos y Novedades',
      icon: Bell,
      badge: unreadCount > 0 ? `${unreadCount} Nuevas` : undefined,
    },
    {
      id: 'calendario' as ViewType,
      label: 'Calendario',
      icon: Calendar,
    },
    {
      id: 'recursos' as ViewType,
      label: 'Recursos y Logística',
      icon: Wrench,
    },
    {
      id: 'mentoria' as ViewType,
      label: 'Mentoría',
      icon: Users,
    },
  ];

  const handleNavClick = (view: ViewType) => {
    onSelectView(view);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#09152b] text-white flex flex-col justify-between shrink-0 select-none z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full border-2 border-white/90 flex items-center justify-center p-1.5 shrink-0 bg-slate-900/60 shadow-inner">
                {/* Official VW inspired circular crest */}
                <svg className="w-full h-full fill-white" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeWidth="4.5" />
                  <circle cx="50" cy="50" fill="none" r="41" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 12 L33 55 L41 55 L50 32 L59 55 L67 55 Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.2" />
                  <path d="M50 44 L38 82 L46 82 L50 67 L54 82 L62 82 Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.2" />
                  <path d="M26 32 L40 68 M74 32 L60 68" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block font-black tracking-wider text-lg text-white uppercase font-sans">LNG OLIVIERI</span>
                <span className="block text-[11px] font-medium tracking-widest text-blue-300 uppercase mt-0.5">Jóvenes Talentos</span>
              </div>
            </div>

            <button
              className="md:hidden text-slate-400 hover:text-white p-1"
              onClick={onCloseMobile}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-sm font-medium text-left ${
                    isActive
                      ? 'bg-slate-800/90 text-white font-semibold border-l-4 border-[#0066cc] shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? 'text-[#0080ff]' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-[#0066cc] text-white rounded-full shrink-0 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 m-3 bg-[#0c1b38]/90 rounded-2xl border border-slate-700/60 shadow-inner">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={onOpenProfile}
            title="Ver perfil de aprendiz"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center ring-2 ring-blue-400/80 shrink-0 group-hover:scale-105 transition-transform">
              FG
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                Facundo Gómez
              </h4>
              <p className="text-xs text-slate-400 truncate">Joven Talento - Ramos Mejía</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
