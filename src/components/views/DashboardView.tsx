import React, { useState } from 'react';
import { UrgentTask, WeekScheduleItem, ViewType } from '../../types';
import { CheckCircle2, Clock, MapPin, Upload, FileCheck, PenTool, MessageSquare, ArrowRight, BookOpen, Wrench, ChevronRight, ChevronDown, Check, Search, Calendar, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardViewProps {
  tasks: UrgentTask[];
  schedule: WeekScheduleItem[];
  onOpenTaskAction: (action: string) => void;
  onOpenChat: (context?: string) => void;
  onSelectView: (view: ViewType) => void;
  onShowNoticeModal: (title: string, body: string) => void;
  onNotify: (msg: string) => void;
  onToggleTaskComplete?: (taskId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  schedule,
  onOpenTaskAction,
  onOpenChat,
  onSelectView,
  onShowNoticeModal,
  onNotify,
  onToggleTaskComplete,
}) => {
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [taskSearch, setTaskSearch] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Schedule selected day filter (defaults to Tuesday which is today)
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<string>('martes');

  // Compact vs Detailed view toggle
  const [isCompactMode, setIsCompactMode] = useState(false);

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'pending' && task.completed) return false;
    if (taskFilter === 'completed' && !task.completed) return false;
    if (taskSearch.trim()) {
      const q = taskSearch.toLowerCase();
      return task.title.toLowerCase().includes(q) || task.subtitle.toLowerCase().includes(q) || task.code.toLowerCase().includes(q);
    }
    return true;
  });

  const days = [
    { id: 'lunes', label: 'Lun 18', fullDay: 'Lunes' },
    { id: 'martes', label: 'Mar 19', fullDay: 'Martes (Hoy)', isToday: true },
    { id: 'miercoles', label: 'Mié 20', fullDay: 'Miércoles' },
    { id: 'jueves', label: 'Jue 21', fullDay: 'Jueves' },
    { id: 'viernes', label: 'Vie 22', fullDay: 'Viernes' },
    { id: 'sabado', label: 'Sáb 23', fullDay: 'Sábado' },
  ];

  const currentDaySchedule = schedule.filter(item => {
    const itemDay = item.dayLabel.toLowerCase();
    if (selectedScheduleDay === 'lunes') return itemDay.includes('lunes');
    if (selectedScheduleDay === 'martes') return itemDay.includes('martes');
    if (selectedScheduleDay === 'miercoles') return itemDay.includes('miércoles') || itemDay.includes('miercoles');
    if (selectedScheduleDay === 'jueves') return itemDay.includes('jueves');
    if (selectedScheduleDay === 'viernes') return itemDay.includes('viernes');
    if (selectedScheduleDay === 'sabado') return itemDay.includes('sábado') || itemDay.includes('sabado');
    return false;
  });

  const getTaskIcon = (action: string) => {
    switch (action) {
      case 'upload-pdi':
        return <Upload className="w-4 h-4 text-blue-600" />;
      case 'safety-quiz':
        return <FileCheck className="w-4 h-4 text-emerald-600" />;
      case 'sign-epi':
        return <PenTool className="w-4 h-4 text-amber-600" />;
      default:
        return <FileCheck className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* 1. Header & Live Status Strip - Clean & Breathable */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">Presente en Planta</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Módulo 3: Mantenimiento y Electricidad</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              ¡Buen día, Facundo!
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Taller Sucursal Ramos Mejía • Jornada de Turno Mañana (08:00 - 14:00)
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => setIsCompactMode(prev => !prev)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              {isCompactMode ? 'Vista Normal' : 'Vista Compacta'}
            </button>
            <button
              onClick={() =>
                onShowNoticeModal(
                  'Registro Biométrico de Fichaje - Facundo Gómez',
                  `<b>Fecha:</b> Martes 19 de Noviembre 2024<br/>
                   <b>Hora de ingreso:</b> 08:04:12 hs (Torniquete Pañol Ramos Mejía)<br/>
                   <b>Estado de presentismo:</b> Presente Normal (Sin demoras)<br/>
                   <b>Tutor responsable en planta:</b> Ing. Carlos Pérez<br/>
                   <b>Asignación:</b> Fosa 2 / Elevador 2 (Box 4)`
                )
              }
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
            >
              <span>Fichada: 08:04 hs</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Fichaje</p>
              <p className="text-sm font-bold text-slate-900 truncate">08:04 hs • En horario</p>
              <p className="text-xs text-slate-500">Egreso: 14:00 hs</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Puesto de Taller</p>
              <p className="text-sm font-bold text-slate-900 truncate">Box 4 • Fosa 2</p>
              <p className="text-xs text-slate-500">Elevador Hidráulico #2</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Tareas de Hoy</p>
                <span className="text-xs font-bold text-slate-700">{progressPercent}%</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {pendingCount === 0 ? 'Todas completadas' : `${pendingCount} requeridas`}
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid (8 Cols Left, 4 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Tareas Pendientes & Cronograma */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAREAS DEL DÍA */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>🎯</span> Tareas Obligatorias del Día
                </h2>
                <p className="text-xs text-slate-500">
                  Completá estas acciones operativas antes del cierre de turno.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1.5 self-start sm:self-center">
                <button
                  onClick={() => setTaskFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    taskFilter === 'all'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  Todas ({tasks.length})
                </button>
                <button
                  onClick={() => setTaskFilter('pending')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    taskFilter === 'pending'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  Pendientes ({pendingCount})
                </button>
                <button
                  onClick={() => setTaskFilter('completed')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    taskFilter === 'completed'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  Listas ({completedCount})
                </button>
              </div>
            </div>

            {/* Task Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar tareas por nombre o código..."
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200/70 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Tasks List */}
            <div className="space-y-2.5">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const isExpanded = expandedTaskId === task.id;
                  return (
                    <div
                      key={task.id}
                      className={`rounded-xl border transition ${
                        task.completed
                          ? 'bg-slate-50/60 border-slate-200/70'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div className="p-3.5 flex items-start gap-3">
                        {/* Checkbox button */}
                        <button
                          onClick={() => {
                            if (onToggleTaskComplete) {
                              onToggleTaskComplete(task.id);
                            }
                          }}
                          className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition ${
                            task.completed
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-300 hover:border-blue-500 bg-white'
                          }`}
                          title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        {/* Title and subtitle */}
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {task.code}
                            </span>
                            <h3
                              className={`text-sm font-semibold truncate ${
                                task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                              }`}
                            >
                              {task.title}
                            </h3>
                            {!task.completed && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  task.badgeType === 'urgent'
                                    ? 'bg-amber-100/70 text-amber-800'
                                    : task.badgeType === 'warning'
                                    ? 'bg-red-100/70 text-red-800'
                                    : 'bg-blue-100/70 text-blue-800'
                                }`}
                              >
                                {task.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{task.subtitle}</p>
                        </div>

                        {/* Action CTA */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onOpenTaskAction(task.buttonAction)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                              task.completed
                                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                            }`}
                          >
                            {getTaskIcon(task.buttonAction)}
                            <span className="hidden sm:inline">
                              {task.completed ? 'Revisar' : task.buttonLabel}
                            </span>
                          </button>

                          <button
                            onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                            aria-label="Ver detalles"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 rounded-b-xl"
                          >
                            <p className="font-medium text-slate-700">Procedimiento requerido:</p>
                            <p className="mt-1 text-slate-500">{task.subtitle}</p>
                            <div className="mt-2.5 flex items-center gap-3">
                              <span className="text-[11px] text-slate-400">
                                Responsable: <b className="text-slate-600">Facundo Gómez</b>
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-[11px] text-slate-400">
                                Validador: <b className="text-slate-600">Ing. Carlos Pérez</b>
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 rounded-xl">
                  No hay tareas para este filtro.
                </div>
              )}
            </div>
          </section>

          {/* CRONOGRAMA DE LA SEMANA (Interactivo con Selector de Días) */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" /> Cronograma de la Semana
                </h2>
                <p className="text-xs text-slate-500">
                  Seleccioná un día para ver turnos, boxes asignados y materias.
                </p>
              </div>

              <button
                onClick={() => onSelectView('calendario')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-center"
              >
                <span>Ver Mes Completo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Day selector pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {days.map((day) => {
                const isSelected = selectedScheduleDay === day.id;
                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedScheduleDay(day.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex flex-col items-center gap-0.5 min-w-[70px] ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>{day.label}</span>
                    {day.isToday && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                        Hoy
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Day Schedule Cards */}
            <div className="space-y-2.5">
              {currentDaySchedule.length > 0 ? (
                currentDaySchedule.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {item.time}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{item.tag}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {item.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {item.instructor}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onShowNoticeModal(
                          item.title,
                          `<b>Horario:</b> ${item.time}<br/>
                           <b>Lugar:</b> ${item.location}<br/>
                           <b>Instructor:</b> ${item.instructor}<br/>
                           <b>Temario:</b> ${item.notes || 'Práctica intensiva en vehículos didácticos VW.'}`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white hover:border-slate-300 transition shrink-0 self-start sm:self-center"
                    >
                      Ver Detalle
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-xl">
                  Sin actividades programadas para este día.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Quick Widgets (Mentor, Evaluaciones, Pañol) */}
        <div className="lg:col-span-4 space-y-6">
          {/* MENTOR WIDGET */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Mentor de Turno
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                En Taller
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 shadow-inner text-sm">
                CP
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">Ing. Carlos Pérez</h4>
                <p className="text-xs text-slate-500">Jefe de Taller & Tutor Principal</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              &ldquo;Recordá subir el checklist de la Taos antes de las 13:00 para la entrega al cliente.&rdquo;
            </p>

            <button
              onClick={() => onOpenChat('Consulta de Taller Diario')}
              className="w-full py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-semibold transition border border-blue-200 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar Consulta 1 a 1</span>
            </button>
          </div>

          {/* EVALUACIONES QUICK CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600" /> Evaluaciones
              </h3>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Módulos 1 al 6
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recordá: Cada módulo se aprueba con un <b>Examen Parcial</b> y un <b>TP Opcional</b>. El Módulo 6 finaliza con el <b>Proyecto Integrador</b>.
            </p>
            <button
              onClick={() => onSelectView('evaluaciones')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <span>Ver Centro de Evaluaciones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PAÑOL Y LOGÍSTICA QUICK ACCESS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-slate-700" /> Pañol & Herramientas
              </h3>
              <span className="text-[11px] text-slate-400">Ramos Mejía</span>
            </div>
            <p className="text-xs text-slate-500">
              Solicitud de torquímetros, escáner ODIS, EPP dieléctrico y calibres Mitutoyo para tu box.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onSelectView('recursos')}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition text-center"
              >
                Ver Inventario
              </button>
              <button
                onClick={() => onSelectView('foro')}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition text-center"
              >
                Foro Técnico
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
