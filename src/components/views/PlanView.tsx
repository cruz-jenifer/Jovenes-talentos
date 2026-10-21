import React, { useState } from 'react';
import { ModuleItem } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  MessageSquare,
  FileText,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronRight,
  Award,
  Building2,
  ClipboardCheck,
  Calendar,
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const getModuleIcon = (id: number) => {
  const iconClass = 'w-6 h-6';
  switch (id) {
    case 1:
      return <BookOpen className={iconClass} />;
    case 2:
      return <Building2 className={iconClass} />;
    case 3:
      return <ClipboardCheck className={iconClass} />;
    case 4:
      return <Calendar className={iconClass} />;
    case 5:
      return <Wrench className={iconClass} />;
    case 6:
      return <Award className={iconClass} />;
    default:
      return <BookOpen className={iconClass} />;
  }
};

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
  const [expandedModuleIds, setExpandedModuleIds] = useState<number[]>([]); // Minimized by default

  const toggleModule = (id: number) => {
    setExpandedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

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
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 flex-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Programa Jóvenes Talentos 2024
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-600 font-semibold">6 Módulos Teórico-Prácticos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Plan de Estudios & Trayectoria Académica
            </h1>
            <p className="text-sm text-slate-600">
              Régimen: Módulos 1 al 5 se aprueban con <b>Examen Parcial + TP Opcional</b>. El Módulo 6 se aprueba con <b>Proyecto Integrador Final + Examen</b>.
            </p>
          </div>

          {/* Progress Overview Card */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-4 shrink-0 sm:w-64 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Progreso General</span>
              <span className="text-blue-700 font-extrabold text-sm">38%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-200">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-700" style={{ width: '38%' }} />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Todos (6)
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                filter === 'in-progress'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              En Curso (1)
            </button>
            <button
              onClick={() => setFilter('finalized')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                filter === 'finalized'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Aprobados (2)
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                filter === 'locked'
                  ? 'bg-slate-600 text-white border-slate-600 shadow-2xs'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border-slate-200'
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
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
              />
            </div>

            {viewMode === 'grid' && (
              <button
                onClick={() => {
                  if (expandedModuleIds.length > 0) {
                    setExpandedModuleIds([]);
                  } else {
                    setExpandedModuleIds(filteredModules.map((m) => m.id));
                  }
                }}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition whitespace-nowrap cursor-pointer shadow-2xs"
                title={expandedModuleIds.length > 0 ? 'Minimizar todas las cajas' : 'Expandir todas las cajas'}
              >
                {expandedModuleIds.length > 0 ? 'Minimizar todos' : 'Expandir todos'}
              </button>
            )}

            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista Cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((mod) => {
            const isExpanded = expandedModuleIds.includes(mod.id);
            const hasEvaluation = mod.id === 3 || mod.id === 6;

            return (
              <article
                key={mod.id}
                className={`rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between border shadow-sm hover:shadow-md ${
                  mod.statusType === 'in-progress'
                    ? 'bg-white border-2 border-[#0066cc] ring-2 ring-blue-50 shadow-blue-100/50'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top: Icon + Code/Title + Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                          mod.statusType === 'locked'
                            ? 'bg-slate-100 border-slate-200 text-slate-400'
                            : 'bg-blue-50 border-blue-100 text-[#0066cc]'
                        }`}
                      >
                        {getModuleIcon(mod.id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500 font-mono">
                            Módulo {mod.id} • Código: {mod.code}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    {/* Top Right Circular Badge */}
                    {mod.statusType === 'finalized' && (
                      <div
                        className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs ring-2 ring-emerald-200 shrink-0"
                        title="Módulo completado"
                      >
                        ✓
                      </div>
                    )}
                    {mod.statusType === 'in-progress' && (
                      <span className="w-7 h-7 rounded-full bg-[#0066cc] text-white text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
                        {mod.id}
                      </span>
                    )}
                    {mod.statusType === 'locked' && (
                      <span
                        className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs shrink-0"
                        title="Bloqueada"
                      >
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {mod.statusType === 'finalized' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        ✓ Finalizada 100%
                      </span>
                    )}
                    {mod.statusType === 'in-progress' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        En Curso • {mod.progress}%
                      </span>
                    )}
                    {mod.statusType === 'locked' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                        🔒 Bloqueada - {mod.month}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {mod.statusType === 'locked'
                        ? `Requiere Módulo ${mod.id - 1}`
                        : mod.statusType === 'in-progress'
                        ? `${mod.month} (Actual)`
                        : mod.month}
                    </span>
                  </div>

                  {/* Progress bar if in progress */}
                  {mod.statusType === 'in-progress' && (
                    <div className="mt-3">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-[#0066cc] h-full rounded-full transition-all duration-500"
                          style={{ width: `${mod.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Collapsible Section for Details (Requisitos de Aprobación & Ejes Temáticos) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-3 pt-3"
                      >
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {mod.description}
                        </p>

                        {/* Approval Scheme Box */}
                        {mod.approvalScheme && (
                          <div className={`p-3 rounded-xl border text-xs ${
                            mod.id === 6
                              ? 'bg-purple-50/80 border-purple-200 text-purple-950'
                              : mod.statusType === 'in-progress'
                              ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                              : 'bg-slate-100/90 border-slate-200 text-slate-800'
                          }`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                {mod.approvalScheme.isLastModule ? 'Requisitos Culminantes:' : 'Requisitos de Aprobación:'}
                              </span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                mod.id === 6
                                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                                  : mod.statusType === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                                  : 'bg-white text-slate-600 border-slate-300'
                              }`}>
                                {mod.id === 6 ? 'Certificación Final' : 'Parcial + TP'}
                              </span>
                            </div>

                            {mod.approvalScheme.isLastModule ? (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                                    <span>🏆</span>
                                    <span className="truncate">Proyecto Integrador Final</span>
                                  </span>
                                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                                    Obligatorio
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                                    <span>🎓</span>
                                    <span className="truncate">Examen Final de Certificación VW</span>
                                  </span>
                                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                                    Obligatorio
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-700 flex items-center gap-1 truncate">
                                    <span>📄</span>
                                    <span className="font-medium truncate">{mod.approvalScheme.tp?.name || 'TP Opcional'}</span>
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                      mod.approvalScheme.tp?.status === 'aprobado'
                                        ? 'text-emerald-700 bg-emerald-100'
                                        : mod.approvalScheme.tp?.status === 'pendiente'
                                        ? 'text-blue-700 bg-blue-100'
                                        : 'text-slate-500 bg-slate-200'
                                    }`}
                                  >
                                    {mod.approvalScheme.tp?.status === 'aprobado'
                                      ? '✓ Entregado (Opcional)'
                                      : mod.approvalScheme.tp?.status === 'pendiente'
                                      ? 'En Revisión (Opcional)'
                                      : 'TP Opcional'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-800 font-bold flex items-center gap-1 truncate">
                                    <span>📝</span>
                                    <span className="truncate">{mod.approvalScheme.exam?.name || 'Examen Parcial'}</span>
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                      mod.approvalScheme.exam?.status === 'aprobado'
                                        ? 'text-emerald-800 bg-emerald-100'
                                        : mod.approvalScheme.exam?.status === 'pendiente'
                                        ? 'text-red-700 bg-red-100 font-extrabold'
                                        : 'text-slate-500 bg-slate-200'
                                    }`}
                                  >
                                    {mod.approvalScheme.exam?.status === 'aprobado'
                                      ? '✓ Parcial Aprobado'
                                      : mod.approvalScheme.exam?.status === 'pendiente'
                                      ? 'Parcial Vie 15 Nov'
                                      : 'Parcial Obligatorio'}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Topics */}
                        {mod.topics && mod.topics.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Ejes Temáticos ({mod.topics.length}):
                            </p>
                            {mod.topics.map((t, idx) => (
                              <div key={idx} className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs shadow-2xs">
                                <p className="font-bold text-slate-900">{t.title}</p>
                                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{t.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Minimized toggle button */}
                  <div className="mt-3 pt-2 flex items-center justify-between border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                    <button
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
                    >
                      <span>{isExpanded ? 'Ocultar requisitos y ejes' : 'Ver requisitos y ejes temáticos'}</span>
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-slate-400">{mod.topics?.length || 3} ejes</span>
                  </div>
                </div>

                {/* 4 to 5 Action Buttons Row */}
                <div
                  className={`mt-4 pt-3 border-t border-slate-100 grid gap-2 ${
                    hasEvaluation ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Button 1: Contenido / Temario */}
                  <button
                    onClick={() => onOpenModuleDrawer(mod)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs truncate cursor-pointer ${
                      mod.statusType === 'locked'
                        ? 'bg-slate-800 hover:bg-slate-900 text-white'
                        : 'bg-[#0066cc] hover:bg-blue-700 text-white'
                    }`}
                    title={mod.statusType === 'locked' ? 'Ver Temario' : 'Ver Contenidos'}
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{mod.statusType === 'locked' ? 'Temario' : 'Contenido'}</span>
                  </button>

                  {/* Button 2: Portafolio */}
                  {mod.statusType !== 'locked' ? (
                    <button
                      onClick={() => onOpenPortfolio(mod.shortTitle, mod.portfolioFile, mod.grade)}
                      className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 truncate shadow-2xs hover:border-slate-300 cursor-pointer"
                      title="Portafolio de Entregas"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span className="truncate">Portafolio</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenModal('Módulo Bloqueado', `El portafolio del ${mod.title} se habilitará al comenzar el ${mod.month}.`)}
                      className="py-2 px-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 truncate"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">Portafolio</span>
                    </button>
                  )}

                  {/* Button 3: Mensajes */}
                  {mod.statusType !== 'locked' ? (
                    <button
                      onClick={() => onOpenChat(mod.shortTitle)}
                      className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 truncate shadow-2xs hover:border-slate-300 cursor-pointer"
                      title="Mensajes de Cátedra"
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span className="truncate">Mensajes</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenModal('Módulo Bloqueado', `Las consultas de cátedra del ${mod.title} estarán disponibles durante su cursada.`)}
                      className="py-2 px-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 truncate"
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">Mensajes</span>
                    </button>
                  )}

                  {/* Button 4: Foro */}
                  {mod.statusType !== 'locked' ? (
                    <button
                      onClick={() => {
                        if (onGoToForo) {
                          onGoToForo(mod.code);
                        } else {
                          onOpenModal(
                            `Foro Técnico: ${mod.shortTitle}`,
                            `Debates y consultas abiertas de la cátedra para ${mod.title}.`
                          );
                        }
                      }}
                      className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 truncate shadow-2xs hover:border-slate-300 cursor-pointer"
                      title="Foro de Cátedra"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span className="truncate">Foro</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenModal('Módulo Bloqueado', `El foro de debate del ${mod.title} se habilitará durante el ${mod.month}.`)}
                      className="py-2 px-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 truncate"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">Foro</span>
                    </button>
                  )}

                  {/* Button 5: Evaluación (Para materias con evaluación: Módulo 3 y Módulo 6) */}
                  {hasEvaluation && (
                    <button
                      onClick={() => {
                        if (onGoToEvaluaciones) {
                          onGoToEvaluaciones();
                        } else {
                          onOpenModal(
                            `Evaluación: ${mod.title}`,
                            `Próxima evaluación programada para ${mod.title}.`
                          );
                        }
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 truncate shadow-2xs cursor-pointer border ${
                        mod.id === 6
                          ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                      }`}
                      title={mod.id === 6 ? 'Proyecto Integrador Final & Examen' : 'Evaluación Parcial'}
                    >
                      {mod.id === 6 ? (
                        <Award className="w-3.5 h-3.5 shrink-0 text-purple-600" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                      )}
                      <span className="truncate">Evaluación</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
