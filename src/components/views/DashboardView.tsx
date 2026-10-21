import React from 'react';
import { UrgentTask, WeekScheduleItem, ViewType } from '../../types';
import { CheckCircle2, Clock, MapPin, Upload, FileCheck, PenTool, MessageSquare, ArrowRight, BookOpen, Wrench, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardViewProps {
  tasks: UrgentTask[];
  schedule: WeekScheduleItem[];
  onOpenTaskAction: (action: string) => void;
  onOpenChat: (context?: string) => void;
  onSelectView: (view: ViewType) => void;
  onShowNoticeModal: (title: string, body: string) => void;
  onNotify: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  schedule,
  onOpenTaskAction,
  onOpenChat,
  onSelectView,
  onShowNoticeModal,
  onNotify
}) => {
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-7"
    >
      {/* 1. Header Welcome & Current Operational Status */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              🟢 Presente en Taller • Box 4 Asignado
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] border border-blue-100 text-xs font-bold">
              Programa Jóvenes Talentos • Mes 3 (Mantenimiento y Electricidad)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0c1a30] tracking-tight flex items-center gap-2">
            ¡Buen día, Facundo! <span className="text-3xl">🔧</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-slate-600">
            Tu resumen operativo de hoy en Taller Sucursal Ramos Mejía. Respondemos directamente:{' '}
            <span className="text-blue-700 font-bold underline decoration-blue-300">
              ¿Qué tenés que hacer hoy y a dónde vas?
            </span>
          </p>
        </div>

        {/* Fichaje Box */}
        <div className="bg-[#09152b] text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-5 shrink-0 shadow-md lg:w-80 border border-slate-800">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider font-extrabold text-blue-300">
              Fichaje Diario
            </p>
            <p className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              08:04{' '}
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                ✓ EN HORARIO
              </span>
            </p>
            <p className="text-xs text-slate-300">Egreso estimado: 14:00 hs</p>
          </div>
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
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            Ver Fichada
          </button>
        </div>
      </section>

      {/* 2. Main Layout (2-Column Grid: Left 65%, Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* LEFT COLUMN (Col span 8) */}
        <div className="lg:col-span-8 space-y-7">
          {/* A) Tus 3 Pendientes Urgentes */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>🎯</span> Tus 3 Pendientes Urgentes
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Completá estas acciones obligatorias antes de finalizar tu jornada de hoy.
                </p>
              </div>
              <span
                className={`px-2.5 py-1 text-xs font-extrabold rounded-full border ${
                  pendingCount === 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {pendingCount === 0 ? '¡Al día! 0 Pendientes' : `${pendingCount} Acciones Requeridas`}
              </span>
            </div>

            <div className="space-y-3.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200 opacity-90'
                      : task.badgeType === 'urgent'
                      ? 'border-2 border-blue-200 bg-blue-50/30 hover:border-blue-300'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                          task.completed
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : task.badgeType === 'urgent'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : task.badgeType === 'warning'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {task.completed ? '✓ Completado y Homologado' : task.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {task.code}
                      </span>
                    </div>

                    <h3 className={`text-base font-bold leading-snug ${task.completed ? 'text-slate-600 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {task.subtitle}
                    </p>
                  </div>

                  {task.completed ? (
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Listo</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenTaskAction(task.buttonAction)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 shrink-0 ${
                        task.buttonAction === 'upload-pdi'
                          ? 'bg-[#0066cc] hover:bg-blue-700 text-white'
                          : task.buttonAction === 'safety-quiz'
                          ? 'bg-white hover:bg-blue-50 text-[#0066cc] border border-blue-200'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {task.buttonAction === 'upload-pdi' && <Upload className="w-4 h-4" />}
                      {task.buttonAction === 'safety-quiz' && <FileCheck className="w-4 h-4" />}
                      {task.buttonAction === 'sign-epi' && <PenTool className="w-4 h-4 text-emerald-400" />}
                      <span>{task.buttonLabel}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* B) Tu Cronograma de la Semana */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>📅</span> Tu Cronograma de la Semana
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  ¿Dónde tenés que estar y en qué horarios específicos?
                </p>
              </div>
              <button
                onClick={() =>
                  onShowNoticeModal(
                    'Sedes y Puntos de Encuentro LNG Olivieri',
                    `<b>• Sede Ramos Mejía (Taller Central):</b> Av. de Mayo 560, Ramos Mejía. Boxes 1 al 8 y Fosas Técnicas de Mecánica.<br/><br/>
                     <b>• Sede San Justo:</b> Av. Juan Manuel de Rosas 3400. Taller de Chapa, Pintura, Bancada 3D y Laboratorio de Alineación.<br/><br/>
                     <b>• Laboratorio de Capacitación Oficial ODIS:</b> Edificio Central, 2do Piso, Aula Técnica 3.`
                  )
                }
                className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1"
              >
                Ver Mapa de Sedes ↗
              </button>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {schedule.map((item) => (
                <div key={item.id} className="relative">
                  {/* Bullet */}
                  <div
                    className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-4 ${
                      item.isToday
                        ? 'bg-blue-600 border-blue-100 ring-2 ring-blue-400'
                        : 'bg-white border-slate-300'
                    }`}
                  />

                  <div
                    className={`p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      item.isToday
                        ? 'bg-blue-50/70 border-blue-200 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded font-extrabold text-[10px] uppercase tracking-wider ${
                            item.isToday
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.dayLabel}
                        </span>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {item.time}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-600 flex items-center gap-1.5 flex-wrap">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          {item.location}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>{item.instructor}</span>
                      </p>

                      {item.notes && (
                        <p className="text-[11px] text-slate-500 pt-0.5">
                          {item.notes}
                        </p>
                      )}
                    </div>

                    {item.isToday ? (
                      <button
                        onClick={() => onNotify('Asistencia confirmada en Box 4 Ramos Mejía.')}
                        className="px-3.5 py-1.5 bg-white border border-blue-200 text-[#0066cc] text-xs font-bold rounded-xl hover:bg-blue-50 shrink-0 self-start md:self-center shadow-2xs transition"
                      >
                        Estoy en el Box
                      </button>
                    ) : item.location.includes('San Justo') ? (
                      <button
                        onClick={() =>
                          onShowNoticeModal(
                            'Indicaciones de Traslado a San Justo',
                            `Presentarse 08:45 hs en Av. Juan Manuel de Rosas 3400 con credencial física y calzado con puntera de acero.<br/><br/>
                             Consultar por el <b>Lic. Martín Rossi</b> o el <b>Téc. Fernando Ruiz</b> en el puesto de control de recepción de vehículos.`
                          )
                        }
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl shrink-0 self-start md:self-center transition"
                      >
                        Cómo llegar
                      </button>
                    ) : (
                      <button
                        onClick={() => onNotify('Reunión agendada en tu calendario.')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl shrink-0 self-start md:self-center transition"
                      >
                        Ver Enlace
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (Col span 4) */}
        <div className="lg:col-span-4 space-y-7">
          {/* C) Tu Buddy / Tutor Asignado */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🤝</span> Tutor Asignado
              </h2>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                En Taller Hoy
              </span>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b1d3a] to-[#0066cc] text-white flex items-center justify-center font-extrabold text-lg shadow-sm ring-2 ring-blue-200 shrink-0">
                CP
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Ing. Carlos Pérez
                </h3>
                <p className="text-xs font-semibold text-slate-600">
                  Jefe de Taller Central & Tutor Oficial LNG Olivieri
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-emerald-700">
                    🟢 En taller (Box Central Ramos Mejía)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200 leading-relaxed">
              ¿Tenés una duda con una herramienta, torque de ajuste o procedimiento técnico? Consultale directo:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onOpenChat('Operaciones en Box 4')}
                className="w-full py-2.5 px-4 bg-[#0066cc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>💬 Mandar Mensaje Interno</span>
              </button>

              <button
                onClick={() =>
                  onNotify('Abriendo canal directo de WhatsApp técnico (+54 9 11 5821-4400)...')
                }
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>📱 WhatsApp Directo de Taller</span>
              </button>
            </div>
          </section>

          {/* D) Avisos Rápidos de RRHH y Taller */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>📢</span> Avisos Rápidos de RRHH y Taller
              </h2>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Importante
              </span>
            </div>

            <div className="space-y-3">
              <div
                onClick={() =>
                  onShowNoticeModal(
                    'Uso Obligatorio de Calzado de Seguridad',
                    'A todo el personal y alumnos del programa: queda terminantemente prohibido el paso a la línea de elevadores sin calzado con puntera normalizado IRAM. Quien no lo posea debe solicitarlo en pañol inmediatamente.'
                  )
                }
                className="p-3.5 bg-amber-50/70 hover:bg-amber-100/60 transition cursor-pointer rounded-2xl border border-amber-200 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <span>⚠️</span>
                  <span>Recordar asistir con calzado de seguridad a pañol</span>
                </div>
                <p className="text-xs text-amber-800 leading-snug">
                  Obligatorio para el ingreso estricto a la zona de elevadores y fosa técnica sin excepción.
                </p>
              </div>

              <div
                onClick={() =>
                  onShowNoticeModal(
                    'Mantenimiento Programado en Boxes',
                    'Este viernes a partir de las 13:00 hs se realizará la calibración semestral de los elevadores electromecánicos y bancos de geometría Hunter. Las prácticas de taller culminan a las 12:30 hs.'
                  )
                }
                className="p-3.5 bg-red-50/70 hover:bg-red-100/60 transition cursor-pointer rounded-2xl border border-red-200 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                  <span>🛑</span>
                  <span>El viernes no hay actividad en boxes después de las 13 hs</span>
                </div>
                <p className="text-xs text-red-800 leading-snug">
                  Jornada de calibración de bancos de prueba y mantenimiento preventivo oficial.
                </p>
              </div>

              <div
                onClick={() =>
                  onShowNoticeModal(
                    'Entrega de Uniformes de Verano',
                    'Los kits de chombas técnicas respirables con monograma LNG Olivieri están disponibles para su retiro en la oficina 2 de Recursos Humanos (1er piso) de 14:00 a 16:30 hs.'
                  )
                }
                className="p-3.5 bg-blue-50/70 hover:bg-blue-100/60 transition cursor-pointer rounded-2xl border border-blue-200 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <span>👕</span>
                  <span>Entrega de uniformes de verano</span>
                </div>
                <p className="text-xs text-blue-800 leading-snug">
                  Retirar por RRHH oficina 2 (piso 1) con firma de remito de 14:00 a 16:30 hs.
                </p>
              </div>
            </div>
          </section>

          {/* E) Guía Rápida de la Plataforma */}
          <section className="bg-gradient-to-br from-[#09152b] to-[#0c1b38] rounded-3xl p-6 text-white shadow-md space-y-4 border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-sm border border-blue-400/30">
                🗺️
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Guía Rápida de la Plataforma</h3>
                <p className="text-[11px] text-slate-400">Cómo navegar tu formación técnica</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">●</span> 🏠 Inicio (Estás aquí):
                </p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Tu resumen del día a día (pendientes, horarios y avisos urgentes).
                </p>
              </div>

              <div
                onClick={() => onSelectView('plan')}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
              >
                <p className="font-bold text-slate-200 flex items-center justify-between">
                  <span>📚 Plan de Estudios:</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  La biblioteca con los 6 módulos homologados para leer teoría, manuales y ver videos.
                </p>
              </div>

              <div
                onClick={() => onSelectView('recursos')}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
              >
                <p className="font-bold text-slate-200 flex items-center justify-between">
                  <span>🧰 Recursos y Logística:</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Pedí herramientas especiales al pañol, tramitá viáticos o solicitá reposición de EPP.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
