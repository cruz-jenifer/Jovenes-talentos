import React, { useState } from 'react';
import { AssessmentItem, AssessmentQuestion } from '../../types';
import { Award, CheckCircle2, Clock, MapPin, User, FileText, Play, ArrowRight, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EvaluacionesViewProps {
  assessments: AssessmentItem[];
  onOpenModal: (title: string, body: string) => void;
  onNotify: (msg: string) => void;
}

export const EvaluacionesView: React.FC<EvaluacionesViewProps> = ({
  assessments,
  onOpenModal,
  onNotify
}) => {
  const [filterType, setFilterType] = useState<'all' | 'practico-taller' | 'teorico-online' | 'simulacion'>('all');
  const [activeSimulation, setActiveSimulation] = useState<AssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [simScore, setSimScore] = useState<number | null>(null);

  const filteredAssessments = assessments.filter(a => {
    if (filterType === 'all') return true;
    return a.type === filterType;
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
      // Calculate score
      let correct = 0;
      activeSimulation.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct++;
        }
      });
      const score = Math.round((correct / activeSimulation.questions.length) * 10);
      setSimScore(score);
      setSimulationCompleted(true);
      onNotify(`Simulación completada con calificación ${score}/10 puntos.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#09152b] via-[#0d2247] to-[#0052a3] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-sky-200">
            <span>Academia Técnica LNG OLIVIERI & VW Argentina</span>
            <span>•</span>
            <span className="text-white font-bold">Rúbricas Oficiales</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Centro de Evaluaciones Teórico-Prácticas
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Exámenes de fosa y elevador con evaluador oficial, autoevaluaciones digitales y rúbricas de calibración para la certificación final.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenModal(
              'Régimen Académico y Calificaciones LNG Olivieri',
              `<b>• Criterio de Aprobación:</b> Cada módulo requiere un mínimo de 7.00/10 puntos tanto en examen teórico como en prueba de taller.<br/><br/>
               <b>• Correlatividades:</b> Para rendir el Módulo 4 (Diagnóstico Post-Venta) es requisito haber aprobado el Módulo 3.<br/><br/>
               <b>• Certificación Oficial Volkswagen:</b> Al finalizar el 6to mes se emite el Diploma Oficial homologado por la Red de Concesionarios VW.`
            )
          }
          className="px-4 py-2.5 bg-white text-[#0066cc] font-bold text-xs rounded-xl shadow hover:bg-blue-50 transition shrink-0 self-start md:self-center"
        >
          Reglamento Académico ↗
        </button>
      </div>

      {/* KPI Performance Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Promedio General</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">9.50 <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Sobresaliente</span></p>
          <p className="text-[11px] text-slate-500">Módulos 1 y 2 aprobados</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avance del Trayecto</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">2 <span className="text-sm font-bold text-slate-400">/ 6 Módulos</span></p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '38%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Horas Prácticas en Taller</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">72 <span className="text-sm font-bold text-slate-500">hs</span></p>
          <p className="text-[11px] text-emerald-600 font-semibold">✓ 100% Asistencia Registrada</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Próximo Examen Oficial</span>
          <p className="text-lg sm:text-xl font-black text-blue-700 leading-tight">Vie 15 Nov</p>
          <p className="text-[11px] text-slate-500">Módulo 3: Circuitos de Carga (08:30 hs)</p>
        </div>
      </div>

      {/* Interactive Simulation Modal or Full Box if triggered */}
      {activeSimulation && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-600 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Simulador Activo • {activeSimulation.title}
              </span>
            </div>
            <button
              onClick={() => setActiveSimulation(null)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
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

              {/* Question */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
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
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Anterior
                </button>

                <button
                  onClick={handleNextOrFinish}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="px-5 py-2 bg-[#0066cc] hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  {currentQuestionIndex === activeSimulation.questions.length - 1 ? 'Finalizar Simulación' : 'Siguiente Pregunta →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900">
                  ¡Simulación Finalizada!
                </h4>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  Puntaje obtenido: <span className="text-blue-600 font-extrabold text-xl">{simScore} / 10 puntos</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ¡Excelente preparación para el examen práctico en el taller de este viernes 15!
                </p>
              </div>

              <div className="pt-3 flex justify-center space-x-3">
                <button
                  onClick={() => handleStartSimulation(activeSimulation)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Reintentar Simulación
                </button>
                <button
                  onClick={() => setActiveSimulation(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
                >
                  Continuar al Hub
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-2 rounded-xl transition ${
              filterType === 'all'
                ? 'bg-[#0066cc] text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200 font-medium'
            }`}
          >
            Todas ({assessments.length})
          </button>
          <button
            onClick={() => setFilterType('practico-taller')}
            className={`px-3.5 py-2 rounded-xl transition ${
              filterType === 'practico-taller'
                ? 'bg-[#0066cc] text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200 font-medium'
            }`}
          >
            🛠️ Prácticas en Taller / Fosa
          </button>
          <button
            onClick={() => setFilterType('teorico-online')}
            className={`px-3.5 py-2 rounded-xl transition ${
              filterType === 'teorico-online'
                ? 'bg-[#0066cc] text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200 font-medium'
            }`}
          >
            💻 Teóricas Online
          </button>
          <button
            onClick={() => setFilterType('simulacion')}
            className={`px-3.5 py-2 rounded-xl transition ${
              filterType === 'simulacion'
                ? 'bg-[#0066cc] text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200 font-medium'
            }`}
          >
            ⚡ Simulador Interactivo
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          {filteredAssessments.length} evaluaciones listadas
        </span>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssessments.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs hover:shadow-md transition flex flex-col justify-between ${
              item.status === 'aprobado'
                ? 'border-emerald-200'
                : item.status === 'pendiente'
                ? 'border-blue-300 ring-1 ring-blue-100'
                : 'border-slate-200 opacity-80'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                      Cód: {item.moduleCode}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold truncate max-w-[200px]">
                      {item.moduleTitle}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {item.status === 'aprobado' && (
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      {item.grade}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold mt-0.5">Aprobado</span>
                  </div>
                )}

                {item.status === 'pendiente' && (
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200 shrink-0 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>En Curso</span>
                  </span>
                )}

                {item.status === 'bloqueado' && (
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl shrink-0">
                    Bloqueado
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* Metadata strip */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                {item.dateScheduled && (
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span><strong>Fecha / Horario:</strong> {item.dateScheduled}</span>
                  </p>
                )}
                {item.location && (
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span><strong>Lugar:</strong> {item.location}</span>
                  </p>
                )}
                {item.evaluator && (
                  <p className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span><strong>Evaluador:</strong> {item.evaluator}</span>
                  </p>
                )}
                <p className="text-[11px] text-slate-500">
                  Exigencia mínima de aprobación: <strong>{item.minScore}</strong> • Duración: {item.durationMinutes} min
                </p>
              </div>

              {/* Rubric Breakdown */}
              {item.rubric && item.rubric.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Criterios Oficiales de Evaluación:
                  </span>
                  <div className="space-y-1 text-xs">
                    {item.rubric.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between bg-white border border-slate-100 p-2 rounded-xl text-[11px]">
                        <span className="text-slate-700 truncate max-w-[240px]">• {r.criteria}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono font-medium">{r.weight}</span>
                          {r.scoreObtained && (
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {r.scoreObtained}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              {item.status === 'aprobado' ? (
                <>
                  <button
                    onClick={() =>
                      onOpenModal(
                        `Rúbrica Oficial Calificada: ${item.title}`,
                        `<div class="space-y-3">
                          <p class="text-xs text-slate-700">Esta evaluación práctica fue calificada y homologada por <b>${item.evaluator}</b> en la sede <b>${item.location}</b>.</p>
                          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold">
                            Calificación Final Obtenida: ${item.grade} (Aprobado)
                          </div>
                          <p class="text-[11px] text-slate-500">El acta técnica correspondiente fue enviada a la Secretaría Académica de LNG Olivieri.</p>
                        </div>`
                      )
                    }
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Acta Calificada</span>
                  </button>

                  <button
                    onClick={() => onNotify(`Constancia de aprobación descargada en PDF: ${item.title}`)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Descargar Certificado
                  </button>
                </>
              ) : item.type === 'simulacion' ? (
                <button
                  onClick={() => handleStartSimulation(item)}
                  className="w-full py-2.5 bg-[#0066cc] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Iniciar Simulación de Examen</span>
                </button>
              ) : item.status === 'pendiente' ? (
                <>
                  <button
                    onClick={() =>
                      onOpenModal(
                        'Temario para Examen de Fosa (Módulo 3)',
                        `<b>Instrumental Requerido:</b> Osciloscopio PicoScope 4 canales, multímetro CAT IV, pinza amperimétrica 600A.<br/><br/>
                         <b>Procedimientos a evaluar:</b><br/>
                         1. Prueba de rizado de alternador con motor a 2.500 RPM.<br/>
                         2. Caída de tensión máxima admisible en masa (límite 0.20V).<br/>
                         3. Diagnóstico de conductancia de batería de 12V con analizador Midtronics.`
                      )
                    }
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Ver Temario de Fosa
                  </button>

                  <button
                    onClick={() => onNotify('Inscripción al turno de examen confirmada para el Viernes 15.')}
                    className="px-4 py-2 bg-[#0066cc] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>Confirmar Asistencia</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNotify('Evaluación bloqueada: Requiere correlatividades anteriores.')}
                  className="w-full py-2 bg-slate-50 text-slate-400 font-medium text-xs rounded-xl cursor-not-allowed"
                >
                  Correlatividad Requerida
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
