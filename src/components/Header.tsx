import React from 'react';
import { ViewType } from '../types';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onOpenMobileMenu: () => void;
  onToggleNotifs: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenMobileMenu,
  onToggleNotifs,
  unreadCount = 2,
}) => {
  const getSectionTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'DASHBOARD DE OPERACIONES DIARIAS';
      case 'plan':
        return 'PLAN DE ESTUDIOS 2024';
      case 'novedades':
        return 'AVISOS, TALLERES Y EVENTOS';
      case 'calendario':
        return 'CALENDARIO Y CRONOGRAMA OPERATIVO';
      case 'recursos':
        return 'RECURSOS, PAÑOL Y LOGÍSTICA';
      case 'mentoria':
        return 'MENTORÍA TÉCNICA 1 A 1';
      case 'foro':
        return 'FORO TÉCNICO Y COMUNIDAD DE CÁTEDRA';
      case 'evaluaciones':
        return 'CENTRO DE EVALUACIONES Y EXÁMENES';
      default:
        return 'CAMPUS VIRTUAL';
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
          <div className="flex items-center space-x-2 font-semibold uppercase tracking-wider text-slate-500">
            <span className="text-[#0066cc] font-bold">CAMPUS VIRTUAL LNG OLIVIERI</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-extrabold truncate max-w-[200px] sm:max-w-none">
              {getSectionTitle()}
            </span>
          </div>

          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Martes 19 de Noviembre • Turno Mañana (08:00 - 14:00)
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick Tab Switcher */}
        <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
          <button
            onClick={() => onSelectView('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentView === 'dashboard'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Hoy / Inicio</span>
            {currentView === 'dashboard' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
          </button>

          <button
            onClick={() => onSelectView('plan')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentView === 'plan'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Plan de Estudios
          </button>

          <button
            onClick={() => onSelectView('novedades')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentView === 'novedades'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Avisos & Talleres</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </button>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onToggleNotifs}
          className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
          title="Notificaciones"
        >
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </button>
      </div>
    </header>
  );
};
