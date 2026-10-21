import React, { useState } from 'react';
import { CalendarEventItem } from '../../types';
import { Calendar as CalendarIcon, Clock, MapPin, User, ShieldAlert, CheckCircle2, ChevronLeft, ChevronRight, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CalendarioViewProps {
  events: CalendarEventItem[];
  onOpenEventModal: (event: CalendarEventItem) => void;
  onOpenChat: (context?: string) => void;
  onGoToPlan: () => void;
  onNotify: (msg: string) => void;
}

export const CalendarioView: React.FC<CalendarioViewProps> = ({
  events,
  onOpenEventModal,
  onOpenChat,
  onGoToPlan,
  onNotify
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10); // 10 = Noviembre, 11 = Diciembre
  const [activeFilter, setActiveFilter] = useState<'all' | 'taller' | 'masterclass' | 'evaluacion' | 'visita'>('all');
  const [viewMode, setViewMode] = useState<'mes' | 'semana' | 'agenda'>('mes');
  const [isSyncing, setIsSyncing] = useState(false);

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthName = monthNames[currentMonthIndex];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onNotify('¡Calendario sincronizado con éxito con Google Calendar y Outlook!');
    }, 800);
  };

  // Filter events
  const filteredEvents = events.filter((ev) => {
    if (activeFilter === 'all') return true;
    return ev.type === activeFilter;
  });

  // Calendar cells for November 2024:
  // Starts on Friday Nov 1 (so Lun=28, Mar=29, Mie=30, Jue=31 of Octubre are prev month)
  // Days 1..30 of Noviembre
  // Days 1..5 of Diciembre
  const calendarCells = [
    { day: 28, isCurrentMonth: false, monthIndex: 9 },
    { day: 29, isCurrentMonth: false, monthIndex: 9 },
    { day: 30, isCurrentMonth: false, monthIndex: 9 },
    { day: 31, isCurrentMonth: false, monthIndex: 9 },
    ...Array.from({ length: 30 }, (_, i) => ({ day: i + 1, isCurrentMonth: true, monthIndex: 10 })),
    { day: 1, isCurrentMonth: false, monthIndex: 11 },
    { day: 2, isCurrentMonth: false, monthIndex: 11 },
    { day: 3, isCurrentMonth: false, monthIndex: 11 },
    { day: 4, isCurrentMonth: false, monthIndex: 11 },
    { day: 5, isCurrentMonth: false, monthIndex: 11, label: '5 Dic' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
        {/* Top Title Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Programa Jóvenes Talentos 2024
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sincronización en vivo
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Calendario y Cronograma Operativo
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Turnos de taller en fosa, rotaciones de boxes, masterclasses y evaluaciones técnicas de Facundo Gómez.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Calendario'}</span>
            </button>

            <button
              onClick={onGoToPlan}
              className="px-4 py-2.5 bg-[#0066cc] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <span>Ver Plan Curricular</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Chips & View Controls */}
        <div className="py-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-xs font-bold text-slate-500 mr-1">Filtros:</span>

            <button
              onClick={() => setActiveFilter(activeFilter === 'taller' ? 'all' : 'taller')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                activeFilter === 'taller'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/70'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeFilter === 'taller' ? 'bg-white' : 'bg-blue-600'}`} />
              <span>Prácticas en Taller / Boxes</span>
            </button>

            <button
              onClick={() => setActiveFilter(activeFilter === 'masterclass' ? 'all' : 'masterclass')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                activeFilter === 'masterclass'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeFilter === 'masterclass' ? 'bg-white' : 'bg-purple-600'}`} />
              <span>Masterclasses y Charlas</span>
            </button>

            <button
              onClick={() => setActiveFilter(activeFilter === 'evaluacion' ? 'all' : 'evaluacion')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                activeFilter === 'evaluacion'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeFilter === 'evaluacion' ? 'bg-white' : 'bg-red-500'}`} />
              <span>Evaluaciones y Entregas</span>
            </button>

            <button
              onClick={() => setActiveFilter(activeFilter === 'visita' ? 'all' : 'visita')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                activeFilter === 'visita'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeFilter === 'visita' ? 'bg-white' : 'bg-amber-500'}`} />
              <span>Tutoría y Visitas</span>
            </button>
          </div>

          {/* Month Switcher & View Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                onClick={() => {
                  setCurrentMonthIndex((prev) => (prev === 10 ? 9 : 10));
                  onNotify(`Visualizando ${currentMonthIndex === 10 ? 'Octubre 2024' : 'Noviembre 2024'}`);
                }}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-700 transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="px-3 py-1 font-bold text-slate-900 bg-white rounded-lg shadow-xs">
                {monthName} 2024
              </span>

              <button
                onClick={() => {
                  setCurrentMonthIndex((prev) => (prev === 10 ? 11 : 10));
                  onNotify(`Visualizando ${currentMonthIndex === 10 ? 'Diciembre 2024' : 'Noviembre 2024'}`);
                }}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-700 transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {(['mes', 'semana', 'agenda'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-lg capitalize transition ${
                    viewMode === mode
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid + Right Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Main 7-Column Calendar Grid */}
          <div className="lg:col-span-2 space-y-4">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase tracking-wider text-slate-400 pb-2">
              <div className="py-1">Lun</div>
              <div className="py-1">Mar</div>
              <div className="py-1">Mié</div>
              <div className="py-1">Jue</div>
              <div className="py-1">Vie</div>
              <div className="py-1 text-slate-300">Sáb</div>
              <div className="py-1 text-slate-300">Dom</div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-xs">
              {calendarCells.map((cell, idx) => {
                const dayEvents = filteredEvents.filter(
                  (e) => e.day === cell.day && e.monthIndex === cell.monthIndex
                );
                const hasEvent = dayEvents.length > 0;
                const isToday = cell.day === 19 && cell.monthIndex === 10;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (hasEvent) {
                        onOpenEventModal(dayEvents[0]);
                      } else {
                        onNotify(`Sin eventos registrados para el ${cell.day} de ${monthNames[cell.monthIndex]}`);
                      }
                    }}
                    className={`min-h-[90px] p-2 rounded-xl transition border cursor-pointer flex flex-col justify-between ${
                      !cell.isCurrentMonth
                        ? 'bg-slate-50/50 border-slate-100 text-slate-400'
                        : isToday
                        ? 'bg-blue-50/70 border-2 border-blue-600 shadow-xs'
                        : hasEvent
                        ? 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`font-bold ${
                          isToday
                            ? 'text-blue-800 text-sm font-black'
                            : cell.isCurrentMonth
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {cell.label || cell.day}
                      </span>

                      {isToday && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white px-1.5 py-0.5 rounded">
                          HOY
                        </span>
                      )}
                    </div>

                    {/* Event Badges inside Cell */}
                    <div className="space-y-1">
                      {dayEvents.map((ev, evIdx) => (
                        <div
                          key={evIdx}
                          className={`p-1 rounded text-[10px] font-bold leading-tight truncate border ${
                            ev.type === 'masterclass'
                              ? 'bg-purple-100 text-purple-800 border-purple-200'
                              : ev.type === 'evaluacion'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : ev.type === 'visita'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : isToday
                              ? 'bg-white text-blue-800 border-blue-300 shadow-xs'
                              : 'bg-blue-50 text-blue-700 border-blue-100'
                          }`}
                        >
                          {ev.shortBadge}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Turno Inmediato & Próximas Obligaciones */}
          <div className="space-y-4">
            {/* Turno Inmediato Asignado Box */}
            <div className="bg-[#09152b] text-white p-5 rounded-2xl shadow-md border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-950 px-2 py-0.5 rounded-full border border-sky-800">
                  Turno Inmediato Asignado
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                Práctica Presencial en Fosa: Circuito de Carga y Arranque
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Diagnóstico con instrumental oficial y osciloscopio digital en unidades VW Taos 1.4 TSI.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    <strong className="text-white">Horario:</strong> Hoy • 08:30 a 13:00 hs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    <strong className="text-white">Ubicación:</strong> Taller Central Ramos Mejía (Fosa 2 / Puesto 4)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    <strong className="text-white">Mentor:</strong> Ing. Carlos Pérez
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 text-amber-300">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span className="text-[11px] leading-tight">
                    <strong>EPP Requerido:</strong> Calzado dieléctrico norma IRAM, pantalón de grafa oficial y lentes protectores.
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenChat('Práctica en Fosa 2: Circuito de Carga')}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Consultar al Mentor
                </button>
                <button
                  onClick={() => onNotify('Asistencia confirmada para el turno de hoy en Box 4')}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition"
                >
                  Confirmar Asistencia
                </button>
              </div>
            </div>

            {/* Próximas Obligaciones Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Próximas Obligaciones
                </h4>
                <span className="text-xs font-bold text-blue-600">Noviembre / Diciembre</span>
              </div>

              {/* Obligacion 1 */}
              <div
                onClick={() =>
                  onOpenEventModal({
                    day: 15,
                    monthIndex: 10,
                    year: 2024,
                    title: 'Examen Práctico Módulo 3',
                    shortBadge: 'Examen M3',
                    time: 'Viernes 15 • 08:30 hs',
                    location: 'Laboratorio de Electricidad Ramos Mejía',
                    mentor: 'Ing. Carlos Pérez',
                    description: 'Examen integrador práctico con osciloscopio y diagnóstico de fallas simuladas sobre alternador y batería.',
                    type: 'evaluacion'
                  })
                }
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 cursor-pointer hover:border-blue-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                    Examen Práctico
                  </span>
                  <span className="text-xs font-bold text-slate-800">Vie 15</span>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  Módulo 3: Circuitos de Carga y Alternador
                </p>
                <p className="text-[11px] text-slate-500">Lugar: Laboratorio de Electricidad Automotriz</p>
              </div>

              {/* Obligacion 2 */}
              <div
                onClick={() =>
                  onOpenEventModal({
                    day: 22,
                    monthIndex: 10,
                    year: 2024,
                    title: 'Masterclass: Baterías Alto Voltaje VW',
                    shortBadge: 'Masterclass',
                    time: 'Viernes 22 • 14:30 hs',
                    location: 'Taller Central Ramos Mejía',
                    mentor: 'Ing. Carlos Pérez',
                    description: 'Capacitación oficial Volkswagen en protocolos e-Mobility y corte de alta tensión.',
                    type: 'masterclass'
                  })
                }
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 cursor-pointer hover:border-purple-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                    Masterclass
                  </span>
                  <span className="text-xs font-bold text-slate-800">Vie 22</span>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  Baterías Alto Voltaje y Vehículos Híbridos
                </p>
                <p className="text-[11px] text-slate-500">8 cupos libres • Con certificación oficial</p>
              </div>

              {/* Obligacion 3 */}
              <div
                onClick={() =>
                  onOpenEventModal({
                    day: 5,
                    monthIndex: 11,
                    year: 2024,
                    title: 'Jornada en Planta Pacheco VW',
                    shortBadge: 'Visita Técnica',
                    time: 'Jueves 05 Dic • 07:30 hs',
                    location: 'Planta Pacheco VW',
                    mentor: 'Coordinación LNG Olivieri',
                    description: 'Visita guiada por líneas de montaje, centro de estampado y pista de pruebas.',
                    type: 'visita'
                  })
                }
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 cursor-pointer hover:border-emerald-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Visita Técnica
                  </span>
                  <span className="text-xs font-bold text-slate-800">Jue 05 Dic</span>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  Visita a Planta Pacheco Volkswagen Argentina
                </p>
                <p className="text-[11px] text-slate-500">Traslado y almuerzo corporativo incluido</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
