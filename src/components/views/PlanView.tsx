import React, { useState } from 'react';
import { ModuleItem } from '../../types';
import { BookOpen, CheckCircle2, Lock, MessageSquare, FileText, ArrowRight, Sparkles, MessageCircle, Search, LayoutGrid, List, ChevronDown, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlanViewProps {
  modules: ModuleItem[];
  onOpenModuleDrawer: (module: ModuleItem) => void;
  onOpenPortfolio: (moduleTitle: string, currentFile?: string, grade?: string) => void;
  onOpenChat: (moduleTitle: string) => void;
  onOpenModal: (title: string, body: string) => void;
  onGoToNovedades: () => void;
  onGoToForo?: (moduleCode?: string) => void;
  onGoToEvaluaciones?: () => void;
}

export const PlanView: React.FC<PlanViewProps> = ({
  modules,
  onOpenModuleDrawer,
  onOpenPortfolio,
  onOpenChat,
  onOpenModal,
  onGoToNovedades,
  onGoToForo,
  onGoToEvaluaciones,
}) => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'finalized' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(3); // Default to current module 3

  const filteredModules = modules.filter((m) => {
    if (filter !== 'all' && m.statusType !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchCode = m.code.toLowerCase().includes(q);
      const matchTopics = m.topics?.some(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
      return matchTitle || matchCode || matchTopics;
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header Bar - Clean & Informative */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 flex-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Programa Jóvenes Talentos 2024
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">6 Módulos Teórico-Prácticos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Plan de Estudios & Trayectoria Académica
            </h1>
            <p className="text-sm text-slate-500">
              Régimen: Módulos 1 al 5 se aprueban con <b>Examen Parcial + TP Opcional</b>. El Módulo 6 se aprueba con <b>Proyecto Integrador Final + Examen</b>.
            </p>
          </div>

          {/* Progress Overview Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 shrink-0 sm:w-64 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Progreso General</span>
              <span className="text-blue-700 font-bold">38%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-700" style={{ width: '38%' }} />
            </div>
            <p className="text-[11px] text-slate-400">
              2 Módulos Aprobados • 1 En Curso • 3 Pendientes
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Todos (6)
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === 'in-progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              En Curso (1)
            </button>
            <button
              onClick={() => setFilter('finalized')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === 'finalized'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Aprobados (2)
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === 'locked'
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Próximos (3)
            </button>
          </div>

          {/* Search + View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por tema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Vista Cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Vista Lista Resumida"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIEW MODE: LIST / TABLE SUMMARY */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Módulo</th>
                  <th className="py-3 px-4">Mes / Duración</th>
                  <th className="py-3 px-4">Régimen de Aprobación</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Progreso</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredModules.map((module) => (
                  <tr key={module.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                          {module.code}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{module.title}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{module.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                      {module.month}
                    </td>
                    <td className="py-3.5 px-4">
                      {module.id === 6 ? (
                        <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          Proyecto Integrador + Examen Final
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Examen Parcial + TP Opcional
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          module.statusType === 'finalized'
                            ? 'bg-emerald-100/70 text-emerald-800'
                            : module.statusType === 'in-progress'
                            ? 'bg-blue-100/70 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {module.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              module.statusType === 'finalized' ? 'bg-emerald-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 text-[11px]">{module.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenModuleDrawer(module)}
                          className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                        >
                          Temario
                        </button>
                        {module.statusType !== 'locked' && (
                          <button
                            onClick={() =>
                              onOpenPortfolio(
                                module.title,
                                module.portfolioFile,
                                module.grade
                              )
                            }
                            className="px-2.5 py-1 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
                          >
                            Entregas
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW MODE: CLEAN GRID CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map((module) => {
            const isExpanded = expandedModuleId === module.id;
            return (
              <div
                key={module.id}
                className={`bg-white rounded-2xl border transition flex flex-col justify-between overflow-hidden ${
                  module.statusType === 'in-progress'
                    ? 'border-blue-300 shadow-sm ring-1 ring-blue-100'
                    : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="p-5 space-y-3">
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {module.code}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{module.month}</span>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        module.statusType === 'finalized'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : module.statusType === 'in-progress'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-50 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Approval Scheme Badge */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Requisitos de Aprobación:
                    </p>
                    <p className="font-semibold text-slate-700 mt-0.5">
                      {module.id === 6
                        ? '★ Proyecto Integrador Final + Examen Oficial'
                        : '✓ Examen Parcial + TP Opcional (+1 pt)'}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Avance</span>
                      <span className="font-bold text-slate-700">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          module.statusType === 'finalized' ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Collapsible Topics Preview */}
                  {module.topics && module.topics.length > 0 && (
                    <div className="pt-1">
                      <button
                        onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                        className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
                      >
                        <span>{module.topics.length} Ejes Temáticos</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-1.5 pt-2"
                          >
                            {module.topics.map((t, idx) => (
                              <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                                <p className="font-semibold text-slate-800">{t.title}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{t.desc}</p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenModuleDrawer(module)}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition text-center shadow-2xs"
                  >
                    Ver Temario
                  </button>

                  {module.statusType !== 'locked' ? (
                    <button
                      onClick={() =>
                        onOpenPortfolio(
                          module.title,
                          module.portfolioFile,
                          module.grade
                        )
                      }
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition text-center shadow-2xs"
                    >
                      {module.id === 6 ? 'Entregar Proyecto' : 'Portafolio / TP'}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-medium cursor-not-allowed text-center"
                    >
                      Bloqueado
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
