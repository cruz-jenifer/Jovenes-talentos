import React, { useState } from 'react';
import { ModuleItem } from '../../types';
import { BookOpen, CheckCircle2, Lock, MessageSquare, FileText, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

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

  const filteredModules = modules.filter((m) => {
    if (filter === 'all') return true;
    return m.statusType === filter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-7"
    >
      {/* Welcome & Mentor Summary */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a30] tracking-tight flex items-center gap-2">
            ¡Hola, Facundo! <span className="inline-block transform hover:rotate-12 transition cursor-pointer">🚀</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-between text-sm sm:text-base font-semibold text-slate-700">
            <span className="text-slate-600 font-medium">
              Programa de Formación Técnica Oficial LNG Olivieri (6 Meses)
            </span>
            <span className="text-[#0066cc] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              38% completado
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-[#0066cc] to-[#0099ff] h-full rounded-full transition-all duration-700"
              style={{ width: '38%' }}
            />
          </div>
        </div>

        {/* Mentor Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 lg:w-80 shrink-0">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Mentor Asignado
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 mt-1">Ing. Carlos Pérez</p>
            <p className="text-xs text-slate-500">Taller Central LNG Olivieri</p>
          </div>
          <button
            onClick={() => onOpenChat('Mantenimiento y Electricidad Automotriz')}
            className="px-3 py-2 bg-blue-50 text-[#0066cc] hover:bg-blue-600 hover:text-white rounded-xl text-xs font-semibold transition border border-blue-200 flex items-center gap-1.5 shadow-2xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultar</span>
          </button>
        </div>
      </section>

      {/* Interactive Direct Banner to Novedades */}
      <div
        onClick={onGoToNovedades}
        className="cursor-pointer bg-gradient-to-r from-[#0b1d3a] via-[#0f2d5c] to-[#0066cc] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md hover:shadow-lg transition group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 text-2xl shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-sky-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30">
                Novedades y Talleres 2024
              </span>
              <span className="text-xs text-amber-300 font-bold">
                ¡3 Nuevas inscripciones abiertas!
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100 mt-1">
              Masterclasses de Alta Tensión VW, visita a Planta Pacheco y entrega de equipamiento.
            </p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-white text-[#0066cc] font-bold text-xs rounded-xl shadow transition shrink-0 group-hover:bg-blue-50">
          Explorar Actividades →
        </button>
      </div>

      {/* Section Title & Tabs Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Materias del Programa{' '}
          <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full">
            {filteredModules.length} materias
          </span>
        </h2>

        <div className="flex items-center space-x-1 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === 'all'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Todas (6)
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === 'in-progress'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            En Curso (1)
          </button>
          <button
            onClick={() => setFilter('finalized')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === 'finalized'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Finalizadas (2)
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === 'locked'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Bloqueadas (3)
          </button>
        </div>
      </div>

      {/* SUBJECTS GRID (Cards 1 to 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((mod) => (
          <article
            key={mod.id}
            onClick={() => onOpenModuleDrawer(mod)}
            className={`rounded-2xl p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between cursor-pointer border ${
              mod.statusType === 'in-progress'
                ? 'bg-white border-2 border-[#0066cc] shadow-sm'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      mod.statusType === 'locked'
                        ? 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-blue-50 border-blue-100 text-[#0066cc]'
                    }`}
                  >
                    <BookOpen className="w-6 h-6" />
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
                    En Curso • 40%
                  </span>
                )}
                {mod.statusType === 'locked' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    🔒 Bloqueada - {mod.month}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">{mod.month}</span>
              </div>

              {/* Progress bar if in progress */}
              {mod.statusType === 'in-progress' && (
                <div className="mt-3">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="bg-[#0066cc] h-full rounded-full transition-all"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Requisitos de Aprobación Específicos del Módulo */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  {mod.approvalScheme.isLastModule ? 'Requisitos de Aprobación Culminante:' : 'Requisitos de Aprobación de Cátedra:'}
                </span>

                {mod.approvalScheme.isLastModule ? (
                  // MÓDULO 6: PROYECTO INTEGRADOR FINAL + EXAMEN FINAL
                  <div className="space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
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
                  // MÓDULOS 1 AL 5: TP OPCIONAL + EXAMEN PARCIAL
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    {/* TP Opcional */}
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

                    {/* Examen Parcial */}
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
            </div>

            {/* 4 Action Buttons Row */}
            <div
              className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-4 gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Button 1: Contenidos / Temario */}
              <button
                onClick={() => onOpenModuleDrawer(mod)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs truncate ${
                  mod.statusType === 'locked'
                    ? 'bg-slate-800 hover:bg-slate-900 text-white'
                    : 'bg-[#0066cc] hover:bg-blue-700 text-white'
                }`}
                title="Ver Contenidos"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{mod.statusType === 'locked' ? 'Temario' : 'Contenidos'}</span>
              </button>

              {/* Button 2: Portafolio */}
              {mod.statusType !== 'locked' ? (
                <button
                  onClick={() => onOpenPortfolio(mod.shortTitle, mod.portfolioFile, mod.grade)}
                  className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 truncate"
                  title="Portafolio"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">Portafolio</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenModal('Módulo Bloqueado', `El portafolio del ${mod.title} se habilitará al comenzar el ${mod.month}.`)}
                  className="py-2 px-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 truncate"
                >
                  <span className="truncate">Portafolio</span>
                </button>
              )}

              {/* Button 3: Mensajes */}
              {mod.statusType !== 'locked' ? (
                <button
                  onClick={() => onOpenChat(mod.shortTitle)}
                  className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 truncate"
                  title="Mensajes"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">Mensajes</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenModal('Módulo Bloqueado', `Las consultas de cátedra del ${mod.title} estarán disponibles durante su cursada.`)}
                  className="py-2 px-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 truncate"
                >
                  <span className="truncate">Mensajes</span>
                </button>
              )}

              {/* Button 4: Foro / Evaluaciones */}
              {mod.statusType === 'finalized' && (
                <button
                  onClick={() => {
                    if (onGoToForo) {
                      onGoToForo(mod.code);
                    } else {
                      onOpenModal(
                        `Foro de Cátedra: ${mod.shortTitle}`,
                        `Debates activos del módulo finalizado: Calibración y certificación periódica de torquímetros e instrumental de precisión.`
                      );
                    }
                  }}
                  className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 truncate"
                  title="Ver Foro de Cátedra"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">Foro</span>
                </button>
              )}

              {mod.statusType === 'in-progress' && (
                <button
                  onClick={() => {
                    if (onGoToEvaluaciones) {
                      onGoToEvaluaciones();
                    } else {
                      onOpenModal(
                        'Evaluaciones: Electricidad Automotriz (Módulo 3)',
                        `Próxima evaluación práctica presencial: Viernes 15 de Noviembre • 08:30 hs en Laboratorio Ramos Mejía.`
                      );
                    }
                  }}
                  className="py-2 px-2 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 truncate shadow-2xs"
                  title="Ir a Evaluaciones y Exámenes"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                  <span className="truncate">Evaluación</span>
                </button>
              )}

              {mod.statusType === 'locked' && (
                <button
                  onClick={() => onOpenModal('Módulo Bloqueado', `El foro y evaluaciones del ${mod.title} se habilitarán en ${mod.month}.`)}
                  className="py-2 px-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 truncate"
                >
                  <span className="truncate">Foro</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
};
