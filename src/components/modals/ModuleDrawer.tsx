import React from 'react';
import { X, CheckCircle2, Lock, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleItem } from '../../types';

interface ModuleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  module: ModuleItem | null;
  onOpenChat: (moduleTitle: string) => void;
  onOpenPortfolio: (moduleTitle: string) => void;
}

export const ModuleDrawer: React.FC<ModuleDrawerProps> = ({
  isOpen,
  onClose,
  module,
  onOpenChat,
  onOpenPortfolio,
}) => {
  if (!isOpen || !module) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between"
          >
            <div className="overflow-y-auto flex-1">
              {/* Drawer Header */}
              <div className="p-6 bg-[#09152b] text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-sky-300 bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-700 uppercase tracking-wider">
                    MÓDULO {module.id} • {module.month.toUpperCase()}
                  </span>

                  {module.statusType === 'finalized' && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Finalizada 100%</span>
                    </span>
                  )}
                  {module.statusType === 'in-progress' && (
                    <span className="text-[11px] font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-700 flex items-center gap-1 animate-pulse">
                      <Clock className="w-3.5 h-3.5" />
                      <span>En Curso • {module.progress}%</span>
                    </span>
                  )}
                  {module.statusType === 'locked' && (
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-700 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{module.status}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Código: {module.code} • Programa Oficial LNG OLIVIERI
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-5">
                {/* Sistema de Aprobación */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  module.approvalScheme.isLastModule
                    ? 'bg-amber-50/70 border-amber-300 text-amber-900'
                    : 'bg-blue-50/70 border-blue-200 text-blue-900'
                }`}>
                  <p className="font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                    <span>{module.approvalScheme.isLastModule ? '🏆' : '📋'}</span>
                    <span>Sistema de Aprobación del Módulo:</span>
                  </p>
                  {module.approvalScheme.isLastModule ? (
                    <div className="space-y-1 text-slate-700">
                      <p>• <strong>Proyecto Integrador Final:</strong> Propuesta técnica aplicada con defensa oral ante jurado directivo (Obligatorio).</p>
                      <p>• <strong>Examen Final de Certificación VW:</strong> Evaluación integral de conocimientos y prueba práctica frente a evaluadores oficiales (Obligatorio).</p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-slate-700">
                      <p>• <strong>Examen Parcial:</strong> Evaluación obligatoria de conocimientos teórico-prácticos del módulo.</p>
                      <p>• <strong>Trabajo Práctico (TP) Opcional:</strong> Entrega optativa de informe o planilla técnica (suma hasta +1.00 punto al promedio del legajo).</p>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Estructura Curricular Obligatoria
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Este módulo comprende 3 ejes pedagógicos con evaluación teórico-práctica en los talleres oficiales de LNG Olivieri.
                  </p>
                </div>

                {/* Topics from Official PDF */}
                <div className="space-y-4">
                  {module.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-6 h-6 rounded-lg bg-[#09152b] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {topic.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {topic.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dynamic Status Callout */}
                {module.statusType === 'in-progress' && (
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-2">
                    <p className="font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                      Módulo actualmente en cursada activa:
                    </p>
                    <p className="text-slate-600">
                      Se encuentra en desarrollo el eje de <em>Circuitos de Carga y Arranque</em>. Turnos prácticos asignados en el taller central de Ramos Mejía.
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenPortfolio(module.title);
                        }}
                        className="px-3 py-1.5 bg-[#0066cc] text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition"
                      >
                        Subir Entrega Práctica
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenChat(module.title);
                        }}
                        className="px-3 py-1.5 bg-white border border-blue-200 text-[#0066cc] font-bold rounded-xl text-xs hover:bg-blue-50 transition"
                      >
                        Consultar al Mentor
                      </button>
                    </div>
                  </div>
                )}

                {module.statusType === 'locked' && (
                  <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-slate-500" />
                      Acceso a clases y evaluaciones:
                    </p>
                    <p>
                      El material práctico y los exámenes se habilitarán automáticamente al cumplimentar la correlatividad del mes anterior.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Programa Oficial de Certificación VW
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Cerrar
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </AnimatePresence>
  );
};
