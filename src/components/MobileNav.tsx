import React, { useState } from 'react';
import { ViewType } from '../types';
import { LayoutDashboard, BookOpen, FileCheck, MessageSquare, MoreHorizontal, Bell, Calendar, Wrench, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileNavProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  unreadNotifsCount?: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onSelectView,
  unreadNotifsCount = 2
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainItems = [
    { id: 'dashboard' as ViewType, label: 'Inicio', icon: LayoutDashboard },
    { id: 'plan' as ViewType, label: 'Plan', icon: BookOpen },
    { id: 'evaluaciones' as ViewType, label: 'Exámenes', icon: FileCheck },
    { id: 'foro' as ViewType, label: 'Foro', icon: MessageSquare },
  ];

  const secondaryItems = [
    { id: 'novedades' as ViewType, label: 'Avisos & Talleres', icon: Bell, badge: unreadNotifsCount },
    { id: 'calendario' as ViewType, label: 'Calendario', icon: Calendar },
    { id: 'recursos' as ViewType, label: 'Pañol & Recursos', icon: Wrench },
    { id: 'mentoria' as ViewType, label: 'Mentoría 1 a 1', icon: Users },
  ];

  const isSecondaryActive = secondaryItems.some(item => item.id === currentView);

  const handleSelect = (view: ViewType) => {
    onSelectView(view);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* "More" Sheet Modal */}
      <AnimatePresence>
        {showMoreMenu && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setShowMoreMenu(false)}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative z-10 bg-white rounded-t-3xl p-6 shadow-2xl border-t border-slate-200 pb-28"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Más Secciones del Campus</h3>
                </div>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {secondaryItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition text-left ${
                        isActive
                          ? 'bg-blue-50/80 border-blue-200 text-blue-700 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 shadow-2xs'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{item.label}</p>
                        {item.badge ? (
                          <span className="text-[10px] text-amber-600 font-semibold">{item.badge} nuevas</span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Ver sección</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 md:hidden shadow-lg safe-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition min-w-[56px] ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`relative p-1 rounded-xl transition ${isActive ? 'bg-blue-50' : ''}`}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="bottom-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600"
                    />
                  )}
                </div>
                <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMoreMenu(prev => !prev)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition min-w-[56px] ${
              isSecondaryActive || showMoreMenu ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`relative p-1 rounded-xl transition ${isSecondaryActive || showMoreMenu ? 'bg-blue-50' : ''}`}>
              <MoreHorizontal className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">Más</span>
          </button>
        </div>
      </nav>
    </>
  );
};
