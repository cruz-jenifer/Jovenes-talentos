import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SafetyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (score: number) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: '¿Qué tipo de calzado es obligatorio para ingresar a la zona de fosa técnica y elevadores?',
    options: [
      'Calzado deportivo con suela de goma común',
      'Calzado de seguridad dieléctrico con puntera de acero certificada norma IRAM',
      'Cualquier bota de lluvia resistente al agua',
      'Zapatos de vestir con suela antideslizante'
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: 'Al desconectar una batería automotriz convencional de 12V, ¿qué borne debe desconectarse SIEMPRE en primer lugar?',
    options: [
      'El borne positivo (+)',
      'Ambos al mismo tiempo con una llave combinada',
      'El borne negativo (- / masa)',
      'Es indiferente en vehículos modernos'
    ],
    correctIndex: 2
  },
  {
    id: 3,
    question: '¿Cuál es el protocolo correcto ante el derrame accidental de aceite o fluido de transmisión en el piso del taller?',
    options: [
      'Lavar inmediatamente con abundante agua a presión hacia la rejilla pluvial',
      'Aplicar absorbente mineral granular / aserrín ignífugo de contención y recoger con pala plástica',
      'Dejar que se evapore durante la noche con ventilación forzada',
      'Cubrirlo con cartones de embalaje y continuar trabajando'
    ],
    correctIndex: 1
  },
  {
    id: 4,
    question: 'En un sistema híbrido o de alto voltaje Volkswagen (ID.3 / GTE), ¿qué categoría mínima de multímetro debe utilizarse?',
    options: [
      'Multímetro básico Cat I 300V',
      'Punta lógica de 12V con lámpara incandescente',
      'Multímetro digital categoría CAT IV 1000V con puntas de prueba certificadas',
      'Detector inductivo de fase unipolar'
    ],
    correctIndex: 2
  }
];

export const SafetyQuizModal: React.FC<SafetyQuizModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleFinish = () => {
    let correctCount = 0;
    QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / QUESTIONS.length) * 10);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 7) {
      onSuccess(finalScore);
    }
  };

  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Módulo 0001 • Seguridad e Higiene
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Autoevaluación de Seguridad en Taller
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Screen */}
          {isSubmitted && score !== null ? (
            <div className="text-center py-6 space-y-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
                  score >= 7 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {score >= 7 ? <CheckCircle2 className="w-10 h-10 text-emerald-600" /> : <AlertCircle className="w-10 h-10 text-red-600" />}
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900">
                  {score >= 7 ? '¡Autoevaluación Aprobada!' : 'Revisión Necesaria'}
                </h4>
                <p className="text-sm font-semibold text-slate-600 mt-1">
                  Tu calificación: <span className="font-extrabold text-blue-600">{score} / 10 puntos</span>
                </p>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                  {score >= 7
                    ? 'Cumplimentaste los requerimientos de seguridad para la rotación activa en Boxes y Fosa Técnica.'
                    : 'Repasá el Módulo 1 en el Plan de Estudios y volvé a intentarlo.'}
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                >
                  Entendido y Continuar
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                Respondé las siguientes preguntas operativas de seguridad obligatorias para el turno de taller de hoy.
              </p>

              {/* Questions List */}
              <div className="space-y-5">
                {QUESTIONS.map((q, qIndex) => (
                  <div key={q.id} className="space-y-2 p-4 bg-slate-50/60 rounded-2xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      <span className="text-blue-600 font-extrabold mr-1">{qIndex + 1}.</span>
                      {q.question}
                    </p>
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[qIndex] === optIndex;
                        return (
                          <div
                            key={optIndex}
                            onClick={() => handleSelect(qIndex, optIndex)}
                            className={`p-2.5 rounded-xl text-xs cursor-pointer transition border flex items-center gap-2.5 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                                : 'bg-white hover:bg-slate-100/80 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                                isSelected ? 'border-white bg-white text-blue-700 font-bold' : 'border-slate-400'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">
                  {Object.keys(selectedAnswers).length} de {QUESTIONS.length} respondidas
                </span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Posponer
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    disabled={!allAnswered}
                    className="px-5 py-2 bg-[#0066cc] hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    Enviar Respuestas
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
