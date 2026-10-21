import React, { useState } from 'react';
import { ViewType } from '../types';
import { Menu, Bell, Search, Check, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onOpenMobileMenu: () => void;
  onToggleNotifs: () => void;
  unreadCount?: number;
  onSearchSelect?: (type: 'module' | 'task' | 'forum' | 'view', id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenMobileMenu,
  onToggleNotifs,
  unreadCount = 2,
  onSearchSelect,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getSectionTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard de Operaciones';
      case 'plan':
        return 'Plan de Estudios';
      case 'evaluaciones':
        return 'Evaluaciones & Exámenes';
      case 'foro':
        return 'Foro Técnico';
      case 'novedades':
        return 'Avisos & Talleres';
      case 'calendario':
        return 'Calendario Operativo';
      case 'recursos':
        return 'Recursos & Pañol';
      case 'mentoria':
        return 'Mentoría 1 a 1';
      default:
        return 'Campus Virtual';
    }
  };

  const quickSearchItems = [
    { type: 'view' as const, id: 'plan', label: 'Plan de Estudios (6 Módulos)', category: 'Vistas' },
    { type: 'view' as const, id: 'evaluaciones', label: 'Exámenes y Régimen de Aprobación', category: 'Vistas' },
    { type: 'view' as const, id: 'foro', label: 'Foro Técnico de Cátedra', category: 'Vistas' },
    { type: 'view' as const, id: 'calendario', label: 'Calendario de Turnos y Talleres', category: 'Vistas' },
    { type: 'view' as const, id: 'recursos', label: 'Pañol de Herramientas y EPP', category: 'Vistas' },
    { type: 'module' as const, id: '0003', label: 'Módulo 3: Mantenimiento y Electricidad', category: 'Módulos' },
    { type: 'module' as const, id: '0006', label: 'Módulo 6: Proyecto Integrador Final', category: 'Módulos' },
    { type: 'task' as const, id: 'pdi-taos', label: 'Protocolo PDI Taos 0km', category: 'Tareas' },
    { type: 'task' as const, id: 'safety-quiz', label: 'Autoevaluación de Seguridad e Higiene', category: 'Tareas' },
  ];

  const filteredSearchResults = searchQuery.trim()
    ? quickSearchItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickSearchItems.slice(0, 5);

  const handleSearchResultClick = (item: typeof quickSearchItems[0]) => {
    if (item.type === 'view') {
      onSelectView(item.id as ViewType);
    } else if (onSearchSelect) {
      onSearchSelect(item.type, item.id);
    } else if (item.type === 'module') {
      onSelectView('plan');
    } else if (item.type === 'task') {
      onSelectView('dashboard');
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle (Sidebar) */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb / Title */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="font-bold text-blue-700 tracking-tight">LNG OLIVIERI</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 font-semibold">{getSectionTitle()}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Turno Mañana • Ramos Mejía
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 text-slate-600 rounded-xl text-xs font-medium transition border border-slate-200/60"
            title="Buscar en el campus"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline text-slate-500">Buscar contenido...</span>
            <kbd className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Quick View Switches for desktop */}
          <div className="hidden lg:flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <button
              onClick={() => onSelectView('dashboard')}
              className={`px-3 py-1 rounded-lg transition ${
                currentView === 'dashboard'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onSelectView('plan')}
              className={`px-3 py-1 rounded-lg transition ${
                currentView === 'plan'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Plan
            </button>
            <button
              onClick={() => onSelectView('evaluaciones')}
              className={`px-3 py-1 rounded-lg transition ${
                currentView === 'evaluaciones'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Exámenes
            </button>
            <button
              onClick={() => onSelectView('foro')}
              className={`px-3 py-1 rounded-lg transition ${
                currentView === 'foro'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Foro
            </button>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onToggleNotifs}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition border border-transparent hover:border-slate-200"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            )}
          </button>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
              onClick={() => setSearchOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-3.5 border-b border-slate-100 flex items-center gap-3">
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar módulo, tema, examen, tarea o sección..."
                  className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 max-h-72 overflow-y-auto divide-y divide-slate-50">
                {filteredSearchResults.length > 0 ? (
                  filteredSearchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchResultClick(item)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-blue-600">Ir →</span>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No se encontraron resultados para &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between px-4">
                <span>Tip: Toca cualquier opción para navegar directamente</span>
                <span>ESC para cerrar</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
