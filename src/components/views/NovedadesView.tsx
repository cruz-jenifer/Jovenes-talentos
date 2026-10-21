import React, { useState } from 'react';
import { WorkshopActivity } from '../../types';
import { Sparkles, Calendar, Clock, MapPin, User, Check, ArrowLeft, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities.filter((act) => {
    if (activeCategory !== 'all' && act.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return act.title.toLowerCase().includes(q) || act.description.toLowerCase().includes(q) || act.location.toLowerCase().includes(q);
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
      {/* Header Bar - Clean & Non-Saturated */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Talleres & Circulares
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">LNG OLIVIERI & Red VW</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Avisos, Talleres Optativos & Eventos
            </h1>
            <p className="text-sm text-slate-500">
              Inscripciones a masterclasses de especialización, visitas técnicas y comunicados de planta.
            </p>
          </div>

          <button
            onClick={onBackToPlan}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Plan</span>
          </button>
        </div>

        {/* Filter Tabs and Search */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Todas ({activities.length})
            </button>
            <button
              onClick={() => setActiveCategory('taller')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === 'taller'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Talleres y Masterclasses ({activities.filter(a => a.category === 'taller').length})
            </button>
            <button
              onClick={() => setActiveCategory('evento')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === 'evento'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Eventos ({activities.filter(a => a.category === 'evento').length})
            </button>
            <button
              onClick={() => setActiveCategory('aviso')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === 'aviso'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Circulares ({activities.filter(a => a.category === 'aviso').length})
            </button>
          </div>

          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar actividad o taller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
              act.isEnrolled
                ? 'border-emerald-300 ring-1 ring-emerald-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {act.tag}
                </span>

                {act.isEnrolled ? (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Inscripto
                  </span>
                ) : act.spotsLeft !== undefined ? (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {act.spotsLeft} cupos
                  </span>
                ) : null}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{act.date} {act.time ? `• ${act.time}` : ''}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{act.location}</span>
                </div>
                {act.speaker && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{act.speaker}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-100/80 border-t border-slate-200 flex items-center gap-2">
              <button
                onClick={() => onToggleEnroll(act.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition text-center ${
                  act.isEnrolled
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                }`}
              >
                {act.isEnrolled ? '✓ Inscripto' : 'Inscribirme'}
              </button>

              <button
                onClick={() =>
                  onOpenModal(
                    act.title,
                    `<b>Fecha:</b> ${act.date}<br/>
                     <b>Horario:</b> ${act.time || 'A coordinar'}<br/>
                     <b>Lugar:</b> ${act.location}<br/>
                     <b>Disertante / Instructor:</b> ${act.speaker || 'Equipo Docente LNG'}<br/><br/>
                     <b>Detalles Técnicos:</b><br/>${act.details}`
                  )
                }
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
