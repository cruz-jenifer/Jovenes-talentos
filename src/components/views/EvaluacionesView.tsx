import React, { useState } from 'react';
import { AssessmentItem } from '../../types';
import { CheckCircle2, Clock, MapPin, User, FileText, Play, ArrowRight, ShieldCheck, AlertCircle, HelpCircle, Award, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EvaluacionesViewProps {
  assessments: AssessmentItem[];
  onOpenModal: (title: string, body: string) => void;
  onNotify: (msg: string) => void;
  onOpenPortfolio?: (moduleTitle: string, currentFile?: string, grade?: string) => void;
}

export const EvaluacionesView: React.FC<EvaluacionesViewProps> = ({
  assessments,
  onOpenModal,
  onNotify,
  onOpenPortfolio
}) => {
  const [filterType, setFilterType] = useState<'all' | 'examen-parcial' | 'tp-opcional' | 'instancia-final' | 'simulador'>('all');
  const [activeSimulation, setActiveSimulation] = useState<AssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [simScore, setSimScore] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssessments = assessments.filter(a => {
    if (filterType !== 'all') {
      if (filterType === 'instancia-final') {
        if (a.categoryKind !== 'proyecto-final' && a.categoryKind !== 'examen-certificacion') return false;
      } else if (a.categoryKind !== filterType) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.moduleTitle.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStartSimulation = (assessment: AssessmentItem) => {
    if (!assessment.questions || assessment.questions.length === 0) return;
    setActiveSimulation(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSimulationCompleted(false);
    setSimScore(null);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (simulationCompleted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNextOrFinish = () => {
    if (!activeSimulation?.questions) return;
    if (currentQuestionIndex < activeSimulation.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let correct = 0;
      activeSimulation.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct++;
        }
      });
      const score = Math.round((correct / activeSimulation.questions.length) * 10);
      setSimScore(score);
      setSimulationCompleted(true);
      onNotify(`Simulación completada: ${score}/10 puntos.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header Bar - Clean & Non-Saturated */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Academia Técnica Oficial VW
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-600 font-semibold">Rúbricas Homologadas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Centro de Evaluaciones & Certificación
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Calificaciones oficiales, exámenes parciales, trabajos prácticos y proyecto integrador final.
            </p>
          </div>

          <button
            onClick={() =>
              onOpenModal(
                'Régimen Académico y Calificaciones LNG Olivieri',
                `<b>• Módulos 1 al 5:</b> Se aprueban con un <b>Examen Parcial obligatorio</b> (calificación mínima 7.00/10) y un <b>Trabajo Práctico (TP) Opcional</b> que suma hasta +1.00 punto al promedio final del legajo.<br/><br/>
                 <b>• Módulo 6 (Último Módulo):</b> Se aprueba exclusivamente con el <b>Proyecto Integrador Final</b> (entrega y defensa) y la aprobación del <b>Examen Final de Certificación Oficial Volkswagen</b>.<br/><br/>
                 <b>• Certificación Oficial Volkswagen:</b> Al finalizar el 6to mes se emite el Diploma Oficial con matrícula homologada por la Red de Concesionarios VW.`
              )
            }
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition shrink-0 self-start md:self-center cursor-pointer"
          >
            Ver Reglamento Académico
          </button>
        </div>

        {/* Academic Rule Reminder Banner - Defined Contrast & Clear Hierarchy */}
        <div className="bg-blue-50/90 border border-blue-200 rounded-xl p-4 shadow-2xs flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-2xs">
            ℹ️
          </div>
          <div className="text-xs text-slate-800 leading-relaxed">
            <span className="font-extrabold text-blue-900">Criterio de Aprobación Oficial: </span>
            <b>Módulos 1 al 5:</b> Examen Parcial obligatorio + TP Opcional para sumar promedio. •{' '}
            <b>Módulo 6:</b> Proyecto Integrador Final + Examen de Certificación VW.
          </div>
        </div>

        {/* 3 Metric Cards with distinct container background */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Promedio General</p>
              <p className="text-base font-extrabold text-slate-900">9.50 / 10</p>
              <p className="text-[11px] text-emerald-700 font-bold">Sobresaliente</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Instancias Aprobadas</p>
              <p className="text-base font-extrabold text-slate-900">4 de 4 Presentadas</p>
              <p className="text-[11px] text-slate-600 font-medium">Módulos 1 y 2 al día</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Próximo Parcial</p>
              <p className="text-base font-extrabold text-slate-900">Viernes 15 Nov</p>
              <p className="text-[11px] text-slate-600 font-medium">Módulo 3 • 08:30 hs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulation Modal */}
      <AnimatePresence>
        {activeSimulation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-blue-600 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Simulador de Práctica • {activeSimulation.title}
                </span>
              </div>
              <button
                onClick={() => setActiveSimulation(null)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
              >
                Cerrar Simulador
              </button>
            </div>

            {!simulationCompleted && activeSimulation.questions ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Pregunta {currentQuestionIndex + 1} de {activeSimulation.questions.length}</span>
                  <span className="font-semibold text-blue-600">Simulación Técnica Guiada</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {activeSimulation.questions[currentQuestionIndex].question}
                  </h3>

                  <div className="space-y-2 pt-1">
                    {activeSimulation.questions[currentQuestionIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition flex items-center gap-3 ${
                            isSelected
                              ? 'bg-blue-600 text-white font-semibold border-blue-600'
                              : 'bg-white hover:bg-slate-100/70 border-slate-200 text-slate-800'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                              isSelected ? 'border-white bg-white text-blue-700 font-bold' : 'border-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Anterior
                  </button>

                  <button
                    onClick={handleNextOrFinish}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-2xs transition"
                  >
                    {currentQuestionIndex === activeSimulation.questions.length - 1 ? 'Finalizar Simulación' : 'Siguiente Pregunta →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">¡Simulación Completada!</h4>
                  <p className="text-sm font-bold text-slate-600 mt-1">
                    Calificación: <span className="text-blue-600 font-extrabold text-lg">{simScore} / 10 puntos</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Preparación completada para el examen práctico en el taller.
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleStartSimulation(activeSimulation)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Reintentar
                  </button>
                  <button
                    onClick={() => setActiveSimulation(null)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Todas ({assessments.length})
          </button>
          <button
            onClick={() => setFilterType('examen-parcial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'examen-parcial'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Parciales Obligatorios ({assessments.filter(a => a.categoryKind === 'examen-parcial').length})
          </button>
          <button
            onClick={() => setFilterType('tp-opcional')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'tp-opcional'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            TPs Opcionales ({assessments.filter(a => a.categoryKind === 'tp-opcional').length})
          </button>
          <button
            onClick={() => setFilterType('instancia-final')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'instancia-final'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Módulo 6: Final ({assessments.filter(a => a.categoryKind === 'proyecto-final' || a.categoryKind === 'examen-certificacion').length})
          </button>
          <button
            onClick={() => setFilterType('simulador')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'simulador'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Simulador ({assessments.filter(a => a.categoryKind === 'simulador').length})
          </button>
        </div>

        <div className="relative sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar evaluación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssessments.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
              item.status === 'aprobado'
                ? 'border-slate-200 hover:border-slate-300'
                : item.categoryKind === 'proyecto-final' || item.categoryKind === 'examen-certificacion'
                ? 'border-purple-300 ring-1 ring-purple-100 shadow-purple-50'
                : item.status === 'pendiente'
                ? 'border-blue-400 ring-1 ring-blue-100 shadow-blue-50'
                : 'border-slate-200 opacity-80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-slate-200 bg-slate-100/90 text-slate-700">
                      {item.categoryKind === 'tp-opcional'
                        ? 'TP Opcional (+1 pt)'
                        : item.categoryKind === 'examen-parcial'
                        ? 'Examen Parcial'
                        : item.categoryKind === 'proyecto-final'
                        ? 'Proyecto Integrador Final'
                        : item.categoryKind === 'examen-certificacion'
                        ? 'Certificación Oficial VW'
                        : 'Simulador'}
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">
                      {item.moduleTitle}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {item.status === 'aprobado' && (
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                      {item.grade}
                    </span>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">Aprobado</p>
                  </div>
                )}

                {item.status === 'pendiente' && (
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-300 shrink-0 shadow-2xs">
                    En Curso
                  </span>
                )}

                {item.status === 'bloqueado' && (
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300 shrink-0">
                    Bloqueado
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* Régimen container with enhanced contrast */}
              <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>
                  Régimen:{' '}
                  <b className={item.categoryKind === 'tp-opcional' ? 'text-blue-700 font-bold' : 'text-slate-900 font-bold'}>
                    {item.categoryKind !== 'tp-opcional' ? 'Obligatorio' : 'Opcional (Suma +1 pt)'}
                  </b>
                </span>
                {item.dateScheduled && (
                  <span className="text-slate-700 font-semibold bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs">
                    {item.dateScheduled}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
              {item.questions && item.questions.length > 0 && (
                <button
                  onClick={() => handleStartSimulation(item)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Simular Evaluación</span>
                </button>
              )}

              {item.categoryKind === 'tp-opcional' && onOpenPortfolio && item.status !== 'bloqueado' && (
                <button
                  onClick={() => onOpenPortfolio(item.moduleTitle)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Portafolio / TP</span>
                </button>
              )}

              <button
                onClick={() => {
                  const rubricText = item.rubric && item.rubric.length > 0
                    ? `<br/><br/><b>Rúbrica de Criterios:</b><br/>` + item.rubric.map(r => `• ${r.criteria} (${r.weight})${r.scoreObtained ? ` - <b>Puntaje: ${r.scoreObtained}</b>` : ''}`).join('<br/>')
                    : '';
                  onOpenModal(
                    item.title,
                    `<b>Módulo:</b> ${item.moduleTitle}<br/>
                     <b>Modalidad:</b> ${item.categoryKind !== 'tp-opcional' ? 'Obligatoria' : 'Opcional (+1.00 pt extra al promedio)'}<br/>
                     <b>Evaluador:</b> ${item.evaluator || 'Equipo Docente VW'}<br/>
                     <b>Criterio / Descripción:</b> ${item.description}<br/>
                     <b>Instancia / Fecha:</b> ${item.dateScheduled || (item.categoryKind === 'tp-opcional' ? 'Entrega digital por Portafolio' : 'A coordinar con tutor')}<br/>
                     <b>Calificación Actual:</b> ${item.grade || (item.status === 'bloqueado' ? 'Bloqueado (requiere aprobar módulo anterior)' : 'Pendiente de rendir')}${rubricText}`
                  );
                }}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer shadow-2xs"
              >
                Ver Ficha
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
