import React, { useState } from 'react';
import { WorkshopActivity } from '../../types';
import { Sparkles, Calendar, Clock, MapPin, User, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface NovedadesViewProps {
  activities: WorkshopActivity[];
  onToggleEnroll: (id: string) => void;
  onOpenModal: (title: string, body: string) => void;
  onBackToPlan: () => void;
}

export const NovedadesView: React.FC<NovedadesViewProps> = ({
  activities,
  onToggleEnroll,
  onOpenModal,
  onBackToPlan
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'taller' | 'evento' | 'aviso'>('all');

  const filteredActivities = activities.filter((act) => {
    if (activeCategory === 'all') return true;
    return act.category === activeCategory;
  });

  const talleres = filteredActivities.filter((a) => a.category === 'taller');
  const eventos = filteredActivities.filter((a) => a.category === 'evento');
  const avisos = filteredActivities.filter((a) => a.category === 'aviso');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#09152b] via-[#0d2247] to-[#0052a3] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-sky-200">
              <span>Programa Jóvenes Talentos LNG Olivieri</span>
              <span>•</span>
              <span className="text-white font-bold">Edición 2024</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Avisos, Novedades, Talleres y Eventos del Programa
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Talleres de especialización optativos certificados, jornadas técnicas en Planta Pacheco y circulares oficiales de coordinación.
            </p>
          </div>
          <button
            onClick={onBackToPlan}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Mi Plan</span>
          </button>
        </div>
      </div>

      {/* Filter Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              activeCategory === 'all'
                ? 'bg-[#0066cc] text-white'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200'
            }`}
          >
            Todas las Actividades ({activities.length})
          </button>
          <button
            onClick={() => setActiveCategory('taller')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeCategory === 'taller'
                ? 'bg-[#0066cc] text-white font-bold'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200'
            }`}
          >
            🛠️ Talleres y Masterclasses ({activities.filter(a => a.category === 'taller').length})
          </button>
          <button
            onClick={() => setActiveCategory('evento')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeCategory === 'evento'
                ? 'bg-[#0066cc] text-white font-bold'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200'
            }`}
          >
            🏛️ Eventos Especiales ({activities.filter(a => a.category === 'evento').length})
          </button>
          <button
            onClick={() => setActiveCategory('aviso')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeCategory === 'aviso'
                ? 'bg-[#0066cc] text-white font-bold'
                : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200'
            }`}
          >
            📢 Avisos Generales ({activities.filter(a => a.category === 'aviso').length})
          </button>
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          {filteredActivities.length} publicaciones vigentes
        </span>
      </div>

      {/* 1. TALLERES OPTATIVOS */}
      {talleres.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Talleres Optativos y Masterclasses Oficiales VW
            </h3>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              Suman horas de práctica a tu legajo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {talleres.map((taller) => (
              <div
                key={taller.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      {taller.badgeLabel || 'Optativo'}
                    </span>
                    {taller.spotsLeft !== undefined && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          taller.spotsLeft <= 3
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-emerald-600 bg-emerald-50'
                        }`}
                      >
                        {taller.spotsLeft} Cupos libres
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {taller.title}
                  </h4>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {taller.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Fecha:</strong> {taller.date}</span>
                    </p>
                    {taller.time && (
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span><strong>Horario:</strong> {taller.time}</span>
                      </p>
                    )}
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Sede:</strong> {taller.location}</span>
                    </p>
                    {taller.speaker && (
                      <p className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span><strong>Tutor:</strong> {taller.speaker}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenModal(`Temario: ${taller.title}`, taller.details.replace(/\n/g, '<br/>'))}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Ver Temario
                  </button>

                  <button
                    onClick={() => onToggleEnroll(taller.id)}
                    className={`px-4 py-2 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 ${
                      taller.isEnrolled
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#0066cc] hover:bg-blue-700 text-white'
                    }`}
                  >
                    {taller.isEnrolled ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Inscripto</span>
                      </>
                    ) : (
                      <span>Inscribirme</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. EVENTOS DEL PROGRAMA */}
      {eventos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Eventos del Programa Jóvenes Talentos
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Integración institucional y visitas de campo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {evento.badgeLabel || 'Evento'}
                    </span>
                    <span className="text-xs text-slate-400">Cupos Limitados</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {evento.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evento.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600">
                    <p><strong>Fecha:</strong> {evento.date}</p>
                    {evento.time && <p><strong>Horario:</strong> {evento.time}</p>}
                    <p><strong>Punto de Encuentro:</strong> {evento.location}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      evento.isEnrolled ? 'text-emerald-600' : 'text-blue-600'
                    }`}
                  >
                    {evento.isEnrolled ? '✓ Asistencia Confirmada' : 'Inscripción Abierta'}
                  </span>

                  <button
                    onClick={() => onToggleEnroll(evento.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                      evento.isEnrolled
                        ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        : 'bg-[#0066cc] hover:bg-blue-700 text-white'
                    }`}
                  >
                    {evento.isEnrolled ? 'Cancelar' : 'Confirmar Cupo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. AVISOS GENERALES */}
      {avisos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Avisos Generales y Circulares Oficiales
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Secretaría Académica
            </span>
          </div>

          <div className="space-y-3">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className="bg-white rounded-2xl border-l-4 border-l-blue-600 border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xl font-bold">
                    📢
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {aviso.badgeLabel}
                      </span>
                      <span className="text-xs text-slate-400">{aviso.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {aviso.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {aviso.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenModal(`Circular Oficial: ${aviso.title}`, aviso.details)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl shrink-0 transition"
                >
                  Leer Circular
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};
