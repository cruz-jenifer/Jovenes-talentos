import { ModuleItem, UrgentTask, WeekScheduleItem, WorkshopActivity, CalendarEventItem, ChatMessage, ToolInventoryItem, ForumThread, AssessmentItem } from '../types';

export const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 1,
    code: '0001',
    month: 'Mes 1',
    title: 'Módulo 1: Fundamentos Técnicos, Taller y Seguridad',
    shortTitle: 'Fundamentos Técnicos, Taller y Seguridad',
    status: 'Finalizada 100%',
    statusType: 'finalized',
    progress: 100,
    grade: '9.50 / 10 - Aprobado',
    portfolioFile: 'Informe_Metrologia_Taller_Gomez.pdf',
    description: 'Normas de bioseguridad, metrología de precisión y termodinámica del motor de combustión interna.',
    topics: [
      {
        title: 'Seguridad e Higiene en el Taller',
        desc: 'Normas de seguridad biológica y física. Uso correcto de Equipos de Protección Individual (EPI). Manejo de residuos peligrosos (aceites, baterías, refrigerantes). Prevención y extinción de incendios en fosa y elevadores.'
      },
      {
        title: 'Herramientas y Equipamiento',
        desc: 'Identificación y uso técnico de herramientas de mano (llaves fijas, de vaso, dinamométricas). Manejo de equipos pesados (elevadores hidráulicos, prensas, gatos). Instrumentos de metrología (calibre pie de rey, micrómetro, comparador de carátula).'
      },
      {
        title: 'Fundamentos del Motor Térmico',
        desc: 'Principios de la termodinámica. Componentes fijos y móviles del motor (bloque, culata, pistones, cigüeñal). Ciclos de funcionamiento de 4 tiempos (Otto y Diésel) y cálculo de relación de compresión.'
      }
    ]
  },
  {
    id: 2,
    code: '0002',
    month: 'Mes 2',
    title: 'Módulo 2: Sistemas del Vehículo y Servicio al Cliente',
    shortTitle: 'Sistemas del Vehículo y Servicio al Cliente',
    status: 'Finalizada 100%',
    statusType: 'finalized',
    progress: 100,
    grade: '9.50 / 10 - Aprobado',
    portfolioFile: 'Informe_Revision_Frenos_Gomez.pdf',
    description: 'Sistemas dinámicos de suspensión, frenos hidráulicos/ABS y protocolos oficiales de atención al cliente VW.',
    topics: [
      {
        title: 'Sistemas de Suspensión y Dirección',
        desc: 'Componentes de la suspensión (amortiguadores, muelles helicoidales, barras estabilizadoras). Tipos de dirección (mecánica, asistida hidráulica y electromecánica Servotronic). Geometría y alineación 3D de ruedas.'
      },
      {
        title: 'Sistema de Frenos Hidráulicos y Asistidos',
        desc: 'Principios de hidráulica aplicados al frenado. Frenos de disco ventilados y de tambor. Componentes (bomba tándem, pinzas, pastillas, servofreno de vacío). Introducción básica a sistemas antibloqueo (ABS) y control de estabilidad (ESP).'
      },
      {
        title: 'Servicio y Atención al Cliente Oficial',
        desc: 'Recepción del vehículo y confección de la orden de trabajo (OR). Habilidades de comunicación y detección de las necesidades del cliente. Explicación técnica de presupuestos y transparencia en el servicio post-venta.'
      }
    ]
  },
  {
    id: 3,
    code: '0012',
    month: 'Mes 3',
    title: 'Módulo 3: Mantenimiento y Electricidad Automotriz',
    shortTitle: 'Mantenimiento y Electricidad Automotriz',
    status: 'En Curso • 40%',
    statusType: 'in-progress',
    progress: 40,
    grade: 'Pendiente de Calificación',
    portfolioFile: 'Diagnostico_Alternador_Bateria_Gomez.pdf',
    description: 'Mantenimiento programado por kilometraje, magnitudes eléctricas, análisis de circuitos de carga y arranque.',
    topics: [
      {
        title: 'Mantenimiento Programado y Preventivo',
        desc: 'Rutinas de inspección por kilometraje (15.000 / 30.000 km). Cambio de fluidos (aceite sintético 508.00/509.00, transmisión DSG, líquido de frenos DOT 4) y sustitución de filtros (aire, aceite, combustible, habitáculo carbón activado). Inspección visual de desgastes y fugas.'
      },
      {
        title: 'Electricidad Básica del Automóvil',
        desc: 'Magnitudes eléctricas (tensión, intensidad, resistencia, ley de Ohm). Uso profesional del multímetro digital y punta lógica automotriz. Interpretación de diagramas y esquemas eléctricos oficiales de la plataforma MQB.'
      },
      {
        title: 'Circuitos de Carga y Arranque',
        desc: 'Diagnóstico y mantenimiento de la batería de 12V (prueba de conductancia y reserva de capacidad). Funcionamiento y comprobación de alternador con regulador inteligente y motor de arranque. Fusibleras, relés y sistemas de iluminación LED.'
      }
    ]
  },
  {
    id: 4,
    code: '0013',
    month: 'Mes 4',
    title: 'Módulo 4: Diagnóstico y Proceso Post-Venta',
    shortTitle: 'Diagnóstico y Proceso Post-Venta',
    status: 'Bloqueada - Mes 4',
    statusType: 'locked',
    progress: 0,
    description: 'Gestión electrónica del motor, diagnóstico OBD-II con escáner ODIS oficial y prueba dinámica de ruta.',
    topics: [
      {
        title: 'Sistemas de Inyección y Gestión Electrónica',
        desc: 'Introducción a las unidades de control electrónico (ECU). Sensores (MAF, MAP, CKP, CMP, Sonda Lambda de banda ancha) y actuadores (inyectores de inyección directa TSI, bobinas individuales). Sistemas de alimentación de combustible y recirculación de gases (EGR / canister).'
      },
      {
        title: 'Diagnóstico con Escáner Oficial (ODIS / OBD-II)',
        desc: 'Conexión y lectura de códigos de falla (DTC). Interpretación de bloques de valores de medición en tiempo real. Uso de osciloscopio automotriz de 4 canales para análisis de señales analógicas y buses de datos CAN-Bus.'
      },
      {
        title: 'Proceso y Control de Calidad Post-Venta',
        desc: 'Prueba de ruta del vehículo post-reparación en circuito homologado. Verificación del cumplimiento estricto de la orden de reparación. Entrega técnica del automóvil al cliente y encuestas de satisfacción CSI.'
      }
    ]
  },
  {
    id: 5,
    code: '0021',
    month: 'Mes 5',
    title: 'Módulo 5: Prácticas Integradoras y Resolución de Casos Reales',
    shortTitle: 'Prácticas Integradoras y Casos Reales',
    status: 'Bloqueada - Mes 5',
    statusType: 'locked',
    progress: 0,
    description: 'Diagnóstico de averías complejas e intermitentes, despiece guiado en taller real y optimización de tiempos.',
    topics: [
      {
        title: 'Simulación de Averías Complejas',
        desc: 'Diagnóstico a ciegas de fallas intermitentes eléctricas y mecánicas generadas en vehículos de prueba. Aplicación del método sistemático de descarte lógico de fallas guiado por árbol de decisión técnico.'
      },
      {
        title: 'Talleres de Reparación Real',
        desc: 'Prácticas guiadas de desmontaje, reparación y montaje de conjuntos mecánicos de motor 1.4 TSI, frenos y tren delantero. Trabajo en equipo bajo presión de tiempo simulando la dinámica operativa del taller del concesionario.'
      },
      {
        title: 'Optimización de Tiempos de Trabajo (UT)',
        desc: 'Manejo de manuales técnicos de taller y software de reparación oficial (ELSAPro, Data Autodata). Gestión eficiente del puesto de trabajo, pañol y herramientas especiales.'
      }
    ]
  },
  {
    id: 6,
    code: '0030',
    month: 'Mes 6',
    title: 'Módulo 6: Inserción Laboral, Evaluación Final y Certificación',
    shortTitle: 'Inserción Laboral y Certificación',
    status: 'Bloqueada - Mes 6',
    statusType: 'locked',
    progress: 0,
    description: 'Proyecto integrador final, preparación para entrevistas técnicas en la red oficial y examen de certificación.',
    topics: [
      {
        title: 'Proyecto “Jóvenes Talentos LNG Olivieri”',
        desc: 'Desarrollo de una propuesta de optimización técnica o de flujo de servicio aplicable al taller de Ramos Mejía o San Justo. Presentación y defensa oral del caso de estudio resuelto ante el jurado directivo.'
      },
      {
        title: 'Orientación e Inserción Laboral',
        desc: 'Armado de currículum vitae técnico normalizado. Simulación de entrevistas de trabajo en concesionarios oficiales Volkswagen y talleres de la red. Pasantías remuneradas de 20 hs semanales.'
      },
      {
        title: 'Evaluación Final y Certificación Oficial VW',
        desc: 'Examen teórico integral de conocimientos y prueba práctica de diagnóstico y resolución de averías en banco y fosa ante el tribunal evaluador de la Academia Volkswagen Argentina.'
      }
    ]
  }
];

export const INITIAL_URGENT_TASKS: UrgentTask[] = [
  {
    id: 'task-1',
    title: 'Subir comprobante de revisión PDI (Pre-Delivery Inspection)',
    subtitle: 'Inspección técnica visual de unidad Taos 0km finalizada en elevador 2.',
    badge: '⚠️ Vence este viernes 22/11',
    badgeType: 'urgent',
    code: 'ID: PDI-9801',
    buttonLabel: 'Subir Comprobante / Foto',
    buttonAction: 'upload-pdi',
    completed: false
  },
  {
    id: 'task-2',
    title: 'Completar autoevaluación de Seguridad e Higiene',
    subtitle: 'Test rápido de 10 preguntas sobre manejo de baterías y solventes en fosa técnica.',
    badge: '⏳ Pendiente - 15 min estimados',
    badgeType: 'pending',
    code: 'Módulo: 0001',
    buttonLabel: 'Iniciar Autoevaluación',
    buttonAction: 'safety-quiz',
    completed: false
  },
  {
    id: 'task-3',
    title: 'Firmar conformidad de uso de Equipos de Protección (EPI)',
    subtitle: 'Recepción de botines dieléctricos homologados IRAM y antiparras nuevas entregados en pañol.',
    badge: '📅 Vence hoy 18:00 hs',
    badgeType: 'warning',
    code: 'RRHH / Pañol',
    buttonLabel: 'Firmar Digitalmente',
    buttonAction: 'sign-epi',
    completed: false
  }
];

export const WEEK_SCHEDULE: WeekScheduleItem[] = [
  {
    id: 'sch-1',
    dayLabel: 'HOY • MARTES 19',
    time: '08:30 - 13:00 hs',
    title: 'Práctica en Boxes: Diagnóstico de Circuito de Carga',
    location: 'Sede Ramos Mejía - Box 4 (Fosa 2)',
    instructor: 'Ing. Carlos Pérez',
    tag: 'Práctica en Boxes',
    isToday: true,
    notes: 'Verificación de caída de tensión en batería y alternador en Taos 1.4 TSI con osciloscopio.'
  },
  {
    id: 'sch-2',
    dayLabel: 'MAÑANA • MIÉRCOLES 20',
    time: '09:00 - 12:30 hs',
    title: 'Práctica en Taller San Justo: Alineación y Geometría 3D',
    location: 'Sede Central San Justo - Taller Principal',
    instructor: 'Téc. Fernando Ruiz',
    tag: 'Alineación 3D',
    isToday: false,
    notes: 'Presentarse en recepción 08:45 hs. Traer calzado con puntera de acero.'
  },
  {
    id: 'sch-3',
    dayLabel: 'JUEVES 21',
    time: '14:00 - 15:30 hs',
    title: 'Reunión de Seguimiento con Buddy / Tutor',
    location: 'Sala Técnica / Virtual Microsoft Teams',
    instructor: 'Ing. Carlos Pérez',
    tag: 'Tutoría 1 a 1',
    isToday: false,
    notes: 'Revisión del informe de metrología y plan de rotación por sector de inyección.'
  },
  {
    id: 'sch-4',
    dayLabel: 'VIERNES 22',
    time: '10:00 - 12:00 hs',
    title: 'Clase Técnica: Protocolos ODIS y Escaneo VW',
    location: 'Laboratorio de Capacitación Central',
    instructor: 'Lic. Martín Rossi',
    tag: 'Laboratorio ODIS',
    isToday: false,
    notes: 'Uso de cabezal de diagnóstico inalámbrico VAS 6154A.'
  }
];

export const WORKSHOP_ACTIVITIES: WorkshopActivity[] = [
  {
    id: 'act-1',
    category: 'taller',
    tag: 'Talleres y Masterclasses',
    tagColor: 'blue',
    title: 'Masterclass: Diagnóstico de Baterías de Alto Voltaje y Sistemas Híbridos VW',
    description: 'Protocolos de corte y desconexión segura en modelos ID.3 y e-Golf, uso de multímetros Cat IV 1000V y software de servicio ODIS.',
    date: 'Viernes 22 de Noviembre',
    time: '14:30 a 18:00 hs',
    location: 'Taller Central Ramos Mejía - Bahía Especial',
    speaker: 'Ing. Carlos Pérez',
    spotsLeft: 8,
    totalSpots: 15,
    isEnrolled: false,
    badgeLabel: 'Recomendado',
    details: '1. Procedimientos de desconexión y bloqueo de alta tensión (LOTO).\n2. Medición de aislamiento y descarga residual de condensadores.\n3. Diagnóstico de celdas sobre módulo real de pruebas VW ID.3.'
  },
  {
    id: 'act-2',
    category: 'taller',
    tag: 'Talleres y Masterclasses',
    tagColor: 'blue',
    title: 'Taller Práctico: Manejo Avanzado de Sistema ODIS y Osciloscopio Digital',
    description: 'Captura de formas de onda en sensores de giro de cigüeñal (CKP) y actuadores de presión. Diagnóstico guiado con banco de pruebas.',
    date: 'Miércoles 27 de Noviembre',
    time: '09:00 a 12:30 hs',
    location: 'Laboratorio Sucursal Central',
    speaker: 'Lic. Martín Rossi',
    spotsLeft: 3,
    totalSpots: 12,
    isEnrolled: false,
    badgeLabel: 'Últimos 3 Cupos',
    details: 'Pruebas dinámicas sobre vehículos Taos y Amarok V6 con instrumental oficial del concesionario. Se entrega certificado oficial de asistencia.'
  },
  {
    id: 'act-3',
    category: 'taller',
    tag: 'Talleres y Masterclasses',
    tagColor: 'blue',
    title: 'Seminario: Seguridad y Calidad de Atención Post-Venta Oficial',
    description: 'Recepción activa con el cliente, checklist digital en tablet y protocolos de garantía del Grupo Volkswagen.',
    date: 'Martes 03 de Diciembre',
    time: '15:00 a 17:30 hs',
    location: 'Modalidad Híbrida (Auditorio Ramos Mejía / Teams)',
    speaker: 'Lic. Valeria Benítez',
    spotsLeft: 12,
    totalSpots: 25,
    isEnrolled: false,
    badgeLabel: 'Optativo',
    details: 'Estándares internacionales de servicio al cliente Volkswagen, confección sin fallas de OR y gestión de garantías con fábrica.'
  },
  {
    id: 'act-4',
    category: 'evento',
    tag: 'Eventos Especiales',
    tagColor: 'emerald',
    title: 'Jornada de Integración en Planta Pacheco Volkswagen',
    description: 'Recorrido técnico por las líneas robotizadas de armado de Taos y Amarok, centro de estampado y pista de pruebas de homologación.',
    date: 'Jueves 05 de Diciembre',
    time: '07:30 a 16:00 hs',
    location: 'Salida desde Sucursal Ramos Mejía en micro chárter',
    speaker: 'Coordinación LNG Olivieri & Directores de Planta VW',
    spotsLeft: 5,
    totalSpots: 20,
    isEnrolled: true,
    badgeLabel: 'Visita Técnica',
    details: 'Se incluye traslado ida y vuelta en micro chárter exclusivo, credencial oficial de visitante industrial y almuerzo en comedor de planta. Obligatorio calzado de seguridad dieléctrico.'
  },
  {
    id: 'act-5',
    category: 'evento',
    tag: 'Eventos Especiales',
    tagColor: 'purple',
    title: 'Charla Técnica con Ingenieros de Planta VW Argentina',
    description: 'Conversatorio sobre la arquitectura electrónica modular MQB y la transición hacia la electromovilidad en talleres oficiales.',
    date: 'Martes 10 de Diciembre',
    time: '17:00 a 19:00 hs',
    location: 'Auditorio Central LNG Olivieri',
    speaker: 'Ing. Rodrigo Santoro (Gerente de Ingeniería VW)',
    spotsLeft: 18,
    totalSpots: 40,
    isEnrolled: false,
    badgeLabel: 'Charla Magistral',
    details: 'Espacio de preguntas directas sobre desarrollo de carrera en el grupo automotriz, proyectos de hibridación en América Latina y nuevas plataformas digitales.'
  },
  {
    id: 'act-6',
    category: 'evento',
    tag: 'Eventos Especiales',
    tagColor: 'amber',
    title: 'Exposición de Casos Técnicos y Premiación 2024',
    description: 'Presentación de los proyectos de resolución de fallas complejas y entrega de reconocimientos al Mérito Técnico Jóvenes Talentos.',
    date: 'Viernes 20 de Diciembre',
    time: '18:30 hs',
    location: 'Salón Principal LNG Olivieri',
    speaker: 'Directorio LNG Olivieri',
    spotsLeft: 30,
    totalSpots: 50,
    isEnrolled: false,
    badgeLabel: 'Cierre Anual',
    details: 'Jornada de entrega de diplomas oficiales y reconocimientos a los mejores promedios y desempeño práctico en taller del programa.'
  },
  {
    id: 'act-7',
    category: 'aviso',
    tag: 'Avisos Generales',
    tagColor: 'blue',
    title: 'Entrega de Nuevos Uniformes Técnicos y Calzado Dieléctrico',
    description: 'Retiro por Pañol Central en Ramos Mejía de 08:00 a 16:00 hs con DNI para el turno tarde.',
    date: 'Publicado ayer',
    location: 'Pañol Central - Ramos Mejía',
    speaker: 'Secretaría de Recursos y Taller',
    isEnrolled: false,
    badgeLabel: 'Equipamiento y EPP',
    details: 'El kit incluye 2 pantalones de taller reforzados con grafa, 3 chombas oficiales con logo bordado LNG Olivieri / VW y calzado de seguridad con puntera norma IRAM.'
  },
  {
    id: 'act-8',
    category: 'aviso',
    tag: 'Avisos Generales',
    tagColor: 'emerald',
    title: 'Nuevo Cronograma de Rotación por Áreas del Taller (Módulo 0012)',
    description: 'Rotaciones quincenales hacia el sector de alineación 3D, frenos computarizados y escaneo electrónico asistido.',
    date: 'Hace 3 días',
    location: 'Taller General',
    speaker: 'Jefatura de Taller',
    isEnrolled: false,
    badgeLabel: 'Rotación Práctica',
    details: 'Facundo Gómez queda asignado al puesto 4 de Inyección y Diagnóstico Guiado durante el bloque en curso junto al Ing. Carlos Pérez.'
  },
  {
    id: 'act-9',
    category: 'aviso',
    tag: 'Avisos Generales',
    tagColor: 'purple',
    title: 'Convocatoria a Pasantías Técnicas en la Red Oficial LNG Olivieri',
    description: 'Abierta para aprendices con módulos teóricos al día y evaluación positiva de tutor de campo.',
    date: 'Hace 5 días',
    location: 'RRHH Concesionario',
    speaker: 'Dirección de RRHH',
    isEnrolled: false,
    badgeLabel: 'Pasantías Remuneradas',
    details: 'Acceso a prácticas rentadas de 20 hs semanales con cobertura médica de primer nivel y posibilidad de efectivización directa en plantilla oficial al finalizar el programa.'
  }
];

export const CALENDAR_EVENTS: CalendarEventItem[] = [
  {
    day: 1,
    monthIndex: 10,
    year: 2024,
    title: 'Revisión de Seguridad y EPP',
    shortBadge: '✓ EPP y Pañol',
    time: '08:30 a 11:30 hs',
    location: 'Taller Ramos Mejía - Box 2',
    mentor: 'Ing. Carlos Pérez',
    description: 'Revisión e inspección obligatoria de calzado de seguridad, guantes y calibración inicial de herramientas de mano.',
    type: 'taller'
  },
  {
    day: 4,
    monthIndex: 10,
    year: 2024,
    title: 'Rotación Box Motores',
    shortBadge: '08:00 Práctica Box',
    time: '08:00 - 12:00 hs',
    location: 'Sede Ramos Mejía',
    mentor: 'Tutor Técnico',
    description: 'Desarme guiado de conjunto de distribución y correas en motor 1.4 TSI sobre soporte didáctico.',
    type: 'taller'
  },
  {
    day: 6,
    monthIndex: 10,
    year: 2024,
    title: 'Entrega Informe Metrología',
    shortBadge: '18:00 Informe PDI',
    time: '18:00 hs Límite',
    location: 'Campus Virtual',
    mentor: 'Lic. Valeria Benítez',
    description: 'Carga de informe de mediciones con micrómetro y calibre comparador sobre discos de freno de prueba.',
    type: 'evaluacion'
  },
  {
    day: 7,
    monthIndex: 10,
    year: 2024,
    title: 'Alineación y Geometría 3D',
    shortBadge: '09:00 San Justo 3D',
    time: '09:00 - 13:00 hs',
    location: 'Taller San Justo - Fosa 4',
    mentor: 'Téc. Fernando Ruiz',
    description: 'Práctica computarizada en bancada Hunter con unidades Taos y Amarok.',
    type: 'taller'
  },
  {
    day: 11,
    monthIndex: 10,
    year: 2024,
    title: 'Tutoría 1 a 1: Diagnóstico',
    shortBadge: '11:00 Buddy Tutor',
    time: '11:00 hs',
    location: 'Box Central Ramos Mejía',
    mentor: 'Ing. Carlos Pérez',
    description: 'Revisión personalizada de fallas en bus de datos CAN y osciloscopio con el mentor.',
    type: 'visita'
  },
  {
    day: 14,
    monthIndex: 10,
    year: 2024,
    title: 'Jornada Práctica de Carga y Arranque',
    shortBadge: '⚡ 08:30 Fosa 2 Carga',
    time: '08:30 a 13:00 hs',
    location: 'Taller Central Ramos Mejía - Fosa 2',
    mentor: 'Ing. Carlos Pérez',
    description: 'Diagnóstico dinámico de circuito de carga y arranque en Taos con osciloscopio de 4 canales. Obligatorio calzado dieléctrico.',
    type: 'taller'
  },
  {
    day: 15,
    monthIndex: 10,
    year: 2024,
    title: 'Examen Práctico Módulo 3',
    shortBadge: '⚠️ 08:30 Examen M3',
    time: 'Viernes 08:30 hs',
    location: 'Laboratorio Eléctrico Ramos Mejía',
    mentor: 'Comité Evaluador VW',
    description: 'Evaluación práctica de diagnóstico de alternador, batería y caída de tensión en banco y fosa.',
    type: 'evaluacion'
  },
  {
    day: 19,
    monthIndex: 10,
    year: 2024,
    title: 'Práctica en Boxes: Diagnóstico Circuito de Carga',
    shortBadge: 'HOY • Box 4',
    time: '08:30 a 13:00 hs',
    location: 'Taller Central Ramos Mejía - Box 4',
    mentor: 'Ing. Carlos Pérez',
    description: 'Comprobación de alternador inteligente, caída de masa y oscilograma de señal LIN en unidad Taos.',
    type: 'taller',
    isToday: true
  },
  {
    day: 22,
    monthIndex: 10,
    year: 2024,
    title: 'Masterclass: Baterías Alto Voltaje VW',
    shortBadge: '⚡ 14:30 Masterclass',
    time: '14:30 a 18:00 hs',
    location: 'Taller Central Ramos Mejía',
    mentor: 'Ing. Carlos Pérez',
    description: 'Protocolos de corte seguro, banco de pruebas ID.3 y multímetros Cat IV. 8 cupos disponibles.',
    type: 'masterclass'
  },
  {
    day: 27,
    monthIndex: 10,
    year: 2024,
    title: 'Taller Práctico: Manejo de ODIS',
    shortBadge: '09:00 Taller ODIS',
    time: '09:00 a 12:30 hs',
    location: 'Laboratorio Sucursal Central',
    mentor: 'Lic. Martín Rossi',
    description: 'Captura de señales con osciloscopio y diagnóstico guiado con cabezal inalámbrico VAS 6154A.',
    type: 'taller'
  },
  {
    day: 29,
    monthIndex: 10,
    year: 2024,
    title: 'Cierre de Planillas de Taller Mes 3',
    shortBadge: 'Cierre Legajo M3',
    time: '17:00 hs',
    location: 'Administración Académica',
    mentor: 'Secretaría de Alumnos',
    description: 'Firma de horas prácticas presenciales acumuladas en legajo del aprendiz.',
    type: 'visita'
  },
  {
    day: 5,
    monthIndex: 11,
    year: 2024,
    title: 'Visita Técnica a Planta Pacheco VW',
    shortBadge: '🏛️ Pacheco VW',
    time: 'Jueves 05 Dic • 07:30 hs',
    location: 'Salida desde Ramos Mejía',
    mentor: 'Coordinación LNG Olivieri',
    description: 'Líneas robotizadas de armado Taos / Amarok, centro de estampado y pista de homologación.',
    type: 'visita'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'tutor',
    text: '¡Hola Facundo! Recordá subir el registro de calibración del osciloscopio antes de las 18:00 hs para validar la práctica de hoy.',
    time: 'Hoy 10:14 hs'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Perfecto Ingeniero, ya estoy preparando la documentación del taller de Ramos Mejía y la planilla de mediciones de caída de tensión.',
    time: 'Hoy 10:22 hs'
  },
  {
    id: 'msg-3',
    sender: 'tutor',
    text: 'Excelente. Acordate de prestar especial atención a los picos de rizado del alternador que medimos en el Taos. Si necesitás la pinza amperimétrica pedila en pañol a mi nombre.',
    time: 'Hoy 10:26 hs'
  }
];

export const TOOL_INVENTORY: ToolInventoryItem[] = [
  {
    id: 'tool-1',
    name: 'Kit Manual por Comisión (8 a 19mm)',
    category: 'kit-manual',
    spec: 'Llaves combinadas cromo-vanadio, destornilladores aislados 1000V, pinzas universales y martillo de bolita',
    available: 18,
    total: 20,
    status: 'disponible'
  },
  {
    id: 'tool-2',
    name: 'Calibre Pie de Rey Digital (Mitutoyo 150mm)',
    category: 'metrologia',
    spec: 'Resolución 0.01mm con certificado de calibración vigente para medición de espesor de discos',
    available: 12,
    total: 15,
    status: 'disponible'
  },
  {
    id: 'tool-3',
    name: 'Micrómetro de Exteriores (0-25mm)',
    category: 'metrologia',
    spec: 'Tambor graduado 0.001mm con trinquete de presión constante',
    available: 8,
    total: 10,
    status: 'disponible'
  },
  {
    id: 'tool-4',
    name: 'Osciloscopio Digital Automotriz 4 Canales',
    category: 'metrologia',
    spec: 'PicoScope automotriz con software de diagnóstico guiado y atenuadores 10:1 y 20:1',
    available: 3,
    total: 4,
    status: 'en-uso'
  },
  {
    id: 'tool-5',
    name: 'Motor Didáctico 1.4 TSI Seccionado en Soporte',
    category: 'didactico',
    spec: 'Corte transversal didáctico con accionamiento eléctrico a baja velocidad sin riesgo vehicular',
    available: 2,
    total: 2,
    status: 'disponible'
  },
  {
    id: 'tool-6',
    name: 'Kit EPP Homologado IRAM (Calzado + Antiparras)',
    category: 'epp',
    spec: 'Botines dieléctricos suela poliuretano antideslizante + antiparras policarbonato antiempaño',
    available: 20,
    total: 20,
    status: 'disponible'
  }
];

export const FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'Torque y secuencia de apriete en culata de motor 1.4 TSI EA211',
    moduleCode: '0001',
    moduleTitle: 'Módulo 1: Fundamentos Técnicos, Taller y Seguridad',
    author: 'Facundo Gómez',
    authorRole: 'student',
    avatarInitials: 'FG',
    avatarColor: 'bg-blue-600',
    date: 'Hace 2 días',
    views: 142,
    repliesCount: 3,
    solved: true,
    pinned: true,
    tags: ['Torques', 'Motor 1.4 TSI', 'Metrología'],
    content: 'Hola a todos. Durante la práctica del despiece del motor didáctico en Taller 1 tuvimos dudas con la secuencia en caracol de la culata. ¿Se reutilizan los tornillos originales o siempre van nuevos por estiramiento plástico?',
    comments: [
      {
        id: 'c-1',
        author: 'Ing. Carlos Pérez',
        role: 'tutor',
        avatarInitials: 'CP',
        avatarColor: 'bg-[#09152b]',
        date: 'Hace 1 día',
        content: '¡Excelente pregunta Facundo! En la familia EA211 los tornillos de culata trabajan en zona de deformación plástica (apriete angular). SIEMPRE deben reemplazarse por nuevos (M9x1.25). La secuencia oficial es en espiral de adentro hacia afuera: Etapa 1 a 40 Nm, Etapa 2 giro de 90° con goniómetro, Etapa 3 giro adicional de 90°. No olviden lubricar levemente la rosca con aceite de motor limpio.',
        likes: 12,
        isSolution: true
      },
      {
        id: 'c-2',
        author: 'Martín Rossi',
        role: 'tutor',
        avatarInitials: 'MR',
        avatarColor: 'bg-indigo-900',
        date: 'Ayer 15:40 hs',
        content: 'Sumando a lo del Ing. Pérez: recuerden sopletear los orificios ciegos del block para que no quede aceite ni refrigerante atrapado, de lo contrario se produce golpe hidráulico y se puede rajar la fundición.',
        likes: 8
      },
      {
        id: 'c-3',
        author: 'Facundo Gómez',
        role: 'student',
        avatarInitials: 'FG',
        avatarColor: 'bg-blue-600',
        date: 'Ayer 18:10 hs',
        content: 'Muchas gracias Carlos y Martín, clarísimo. Ya lo anoté en la bitácora de taller para la prueba del viernes.',
        likes: 3
      }
    ]
  },
  {
    id: 'thread-2',
    title: 'Caída de tensión anormal en borne negativo del alternador en Taos (0.45V medidos)',
    moduleCode: '0012',
    moduleTitle: 'Módulo 3: Mantenimiento y Electricidad Automotriz',
    author: 'Facundo Gómez',
    authorRole: 'student',
    avatarInitials: 'FG',
    avatarColor: 'bg-blue-600',
    date: 'Hoy 09:20 hs',
    views: 89,
    repliesCount: 2,
    solved: false,
    pinned: false,
    tags: ['Electricidad', 'Alternador', 'Osciloscopio', 'Box 4'],
    content: 'Estamos en el Box 4 midiendo caída de tensión entre la carcasa del alternador y el borne negativo de la batería con motor regulando a 2.500 RPM y todas las cargas eléctricas encendidas (luces altas, climatizador y desempañador). El multímetro marca 0.45V. ¿El límite admisible por norma VW no era de 0.20V máximo?',
    comments: [
      {
        id: 'c-4',
        author: 'Ing. Carlos Pérez',
        role: 'tutor',
        avatarInitials: 'CP',
        avatarColor: 'bg-[#09152b]',
        date: 'Hoy 09:45 hs',
        content: 'Exacto Facundo. La caída de masa admisible en la red de 12V es de 0.20V como máximo. Un valor de 0.45V indica resistencia parásita por sulfato o falso contacto. Revisen el cable de masa que va del soporte del motor al larguero izquierdo (debajo de la caja de batería). Aflojen, limpien con cepillo de alambre y reaprieten a 20 Nm.',
        likes: 9,
        isSolution: false
      },
      {
        id: 'c-5',
        author: 'Sofía Martínez',
        role: 'student',
        avatarInitials: 'SM',
        avatarColor: 'bg-purple-600',
        date: 'Hoy 10:05 hs',
        content: '¡Nos pasó lo mismo en la unidad de prueba la semana pasada! Era sulfato en la tuerca del larguero. Al limpiar bajó a 0.08V.',
        likes: 4
      }
    ]
  },
  {
    id: 'thread-3',
    title: 'Protocolo de purga al vacío en circuito refrigerante con bomba de agua pilotada',
    moduleCode: '0002',
    moduleTitle: 'Módulo 2: Sistemas del Vehículo y Servicio al Cliente',
    author: 'Lucas Benítez',
    authorRole: 'student',
    avatarInitials: 'LB',
    avatarColor: 'bg-emerald-600',
    date: 'Hace 4 días',
    views: 198,
    repliesCount: 2,
    solved: true,
    pinned: false,
    tags: ['Refrigeración', 'Bomba Variable', 'Herramientas Especiales'],
    content: '¿Para el llenado de refrigerante G12evo se utiliza obligatoriamente el equipo de vacío VAS 6096 o se puede purgar por gravedad acelerando el motor?',
    comments: [
      {
        id: 'c-6',
        author: 'Ing. Carlos Pérez',
        role: 'tutor',
        avatarInitials: 'CP',
        avatarColor: 'bg-[#09152b]',
        date: 'Hace 4 días',
        content: 'En motores TSI y TDI modernos es OBLIGATORIO usar el llenador por vacío VAS 6096. Las bombas de agua tienen una cortina de obturación comandada por vacío y el circuito secundario del intercooler aire-agua no purga por gravedad, quedando burbujas de aire que recalientan el turbo.',
        likes: 15,
        isSolution: true
      }
    ]
  },
  {
    id: 'thread-4',
    title: 'Lectura de osciloscopio en sensor CKP inductivo vs efecto Hall',
    moduleCode: '0012',
    moduleTitle: 'Módulo 3: Mantenimiento y Electricidad Automotriz',
    author: 'Sofía Martínez',
    authorRole: 'student',
    avatarInitials: 'SM',
    avatarColor: 'bg-purple-600',
    date: 'Hace 5 días',
    views: 215,
    repliesCount: 1,
    solved: true,
    pinned: false,
    tags: ['Sensores', 'Osciloscopio', 'Inyección'],
    content: '¿Cómo diferenciamos rápidamente en la pantalla del osciloscopio una señal de sensor de cigüeñal inductivo de una de efecto Hall en los modelos Taos y Nivus?',
    comments: [
      {
        id: 'c-7',
        author: 'Lic. Martín Rossi',
        role: 'tutor',
        avatarInitials: 'MR',
        avatarColor: 'bg-indigo-900',
        date: 'Hace 5 días',
        content: 'Muy fácil: el sensor inductivo genera una onda senoidal analógica de corriente alterna cuya amplitud y frecuencia aumentan con las RPM (sin alimentación externa de 5V o 12V). El sensor Hall genera una onda cuadrada digital pura de 0V a 5V con flancos verticales definidos y requiere 3 cables (positivo, negativo y señal). Taos utiliza sensor Hall.',
        likes: 18,
        isSolution: true
      }
    ]
  }
];

export const ASSESSMENTS_DATA: AssessmentItem[] = [
  {
    id: 'ass-1',
    title: 'Examen Práctico Módulo 1: Metrología y Seguridad en Taller',
    moduleCode: '0001',
    moduleTitle: 'Módulo 1: Fundamentos Técnicos, Taller y Seguridad',
    type: 'practico-taller',
    status: 'aprobado',
    grade: '9.50 / 10',
    minScore: '7.00 / 10',
    durationMinutes: 60,
    dateScheduled: '04 de Octubre 2024',
    evaluator: 'Ing. Carlos Pérez',
    location: 'Taller 1 Bancos Ramos Mejía',
    description: 'Evaluación práctica individual sobre uso de calibre Mitutoyo, micrómetro de exteriores, torquímetro y normas de seguridad en fosa.',
    rubric: [
      { criteria: 'Medición de espesor y alabeo con calibre y comparador', weight: '30%', scoreObtained: '10/10' },
      { criteria: 'Cumplimiento estricto de EPP y delimitación peatonal', weight: '20%', scoreObtained: '10/10' },
      { criteria: 'Despiece ordenado y torqueo de conjunto motor didáctico', weight: '30%', scoreObtained: '9/10' },
      { criteria: 'Limpieza de puesto y almacenamiento en pañol', weight: '20%', scoreObtained: '9/10' }
    ]
  },
  {
    id: 'ass-2',
    title: 'Examen Teórico Módulo 2: Suspensión, Dirección y Frenos ABS',
    moduleCode: '0002',
    moduleTitle: 'Módulo 2: Sistemas del Vehículo y Servicio al Cliente',
    type: 'teorico-online',
    status: 'aprobado',
    grade: '9.50 / 10',
    minScore: '7.50 / 10',
    durationMinutes: 45,
    dateScheduled: '01 de Noviembre 2024',
    evaluator: 'Lic. Valeria Benítez',
    location: 'Campus Virtual LNG Olivieri',
    description: 'Examen teórico online de 25 preguntas sobre hidráulica de frenos, geometría de dirección y recepción en taller oficial.',
    rubric: [
      { criteria: 'Hidráulica de frenos y modulación ABS', weight: '40%', scoreObtained: '10/10' },
      { criteria: 'Ángulos de alineación (Camber, Caster, Toe)', weight: '35%', scoreObtained: '9/10' },
      { criteria: 'Confección de Orden de Reparación (OR)', weight: '25%', scoreObtained: '10/10' }
    ]
  },
  {
    id: 'ass-3',
    title: 'Examen Práctico Módulo 3: Circuitos de Carga y Alternador Inteligente',
    moduleCode: '0012',
    moduleTitle: 'Módulo 3: Mantenimiento y Electricidad Automotriz',
    type: 'practico-taller',
    status: 'pendiente',
    minScore: '7.00 / 10',
    durationMinutes: 90,
    dateScheduled: 'Viernes 15 de Noviembre • 08:30 hs',
    evaluator: 'Comité Evaluador LNG Olivieri / VW',
    location: 'Laboratorio de Electricidad Ramos Mejía (Fosa 2)',
    description: 'Evaluación presencial de diagnóstico guiado de alternador con osciloscopio de 4 canales, caída de tensión y estado de salud de batería de 12V.',
    rubric: [
      { criteria: 'Diagnóstico de caída de masa y positivo de alternador', weight: '30%' },
      { criteria: 'Configuración y captura de rizado de diodos con osciloscopio', weight: '35%' },
      { criteria: 'Prueba de conductancia y diagnóstico de batería con analizador', weight: '20%' },
      { criteria: 'Uso de calzado dieléctrico y aislamiento de herramientas', weight: '15%' }
    ]
  },
  {
    id: 'ass-4',
    title: 'Simulador Interactivo: Diagnóstico Eléctrico y Baterías',
    moduleCode: '0012',
    moduleTitle: 'Módulo 3: Mantenimiento y Electricidad Automotriz',
    type: 'simulacion',
    status: 'pendiente',
    minScore: '8.00 / 10',
    durationMinutes: 20,
    description: 'Test interactivo con casos reales de taller, oscilogramas y códigos de avería para practicar antes del examen presencial del viernes.',
    questions: [
      {
        id: 1,
        question: '¿Cuál es la tensión de carga normal que debe entregar un alternador inteligente con motor regulando?',
        options: [
          'Entre 11.5V y 12.2V',
          'Exactamente 12.0V sin variación',
          'Entre 13.8V y 14.7V según el estado de carga de la batería',
          'Mayor a 16.5V constante'
        ],
        correctIndex: 2,
        explanation: 'En los alternadores con regulador LIN comandado por la ECU, la tensión se modula entre 13.8V y 14.7V para evitar sobrecarga y optimizar consumo.'
      },
      {
        id: 2,
        question: 'Al observar en el osciloscopio la tensión de salida del alternador, se visualizan picos descendentes simétricos y repetitivos. ¿A qué falla apunta?',
        options: [
          'Diodo rectificador del puente en cortocircuito o abierto',
          'Batería con bajo nivel de electrolito',
          'Correa poli-V con exceso de tensión',
          'Bomba de combustible defectuosa'
        ],
        correctIndex: 0,
        explanation: 'Un diodo quemado en el puente rectificador genera una pérdida cíclica de fase, visible como valles o picos anormales en la onda de rizado.'
      },
      {
        id: 3,
        question: '¿Qué caída de tensión máxima es admisible en el circuito de masa entre la carcasa del motor y el borne negativo de la batería con consumo?',
        options: [
          'Hasta 1.50 Voltios',
          'Máximo 0.20 Voltios',
          '0.80 Voltios en vehículos nafteros',
          'Es indistinta si el burro gira'
        ],
        correctIndex: 1,
        explanation: 'Las tolerancias técnicas de Volkswagen exigen un máximo de 0.20V de caída de tensión en el circuito de masa.'
      },
      {
        id: 4,
        question: 'Al reemplazar la batería EFB o AGM de un vehículo con sistema Start-Stop, ¿qué procedimiento técnico es OBLIGATORIO en el escáner ODIS?',
        options: [
          'Solo limpiar los bornes con grasa de vaselina',
          'Codificar la nueva batería en la unidad de control de red de a bordo (Gateway J533)',
          'Desconectar el fusible del airbag durante 10 minutos',
          'Acelerar a fondo durante 30 segundos'
        ],
        correctIndex: 1,
        explanation: 'El módulo Gateway gestiona el mapa de envejecimiento de la batería. Si no se codifica la capacidad y fabricante nuevo, el alternador continuará cargando como si fuera la batería vieja degradada.'
      }
    ],
    rubric: [
      { criteria: 'Respuestas correctas en primera tentativa', weight: '100%' }
    ]
  },
  {
    id: 'ass-5',
    title: 'Examen Módulo 4: Diagnóstico Guiado con Escáner ODIS y Buses CAN',
    moduleCode: '0013',
    moduleTitle: 'Módulo 4: Diagnóstico y Proceso Post-Venta',
    type: 'practico-taller',
    status: 'bloqueado',
    minScore: '7.50 / 10',
    durationMinutes: 90,
    evaluator: 'Lic. Martín Rossi',
    description: 'Diagnóstico en tiempo real de fallas simuladas en red multiplexada CAN-Bus y lectura de parámetros DTC con software ODIS oficial.',
    rubric: [
      { criteria: 'Conexión y navegación en diagnóstico guiado ODIS', weight: '35%' },
      { criteria: 'Identificación de códigos DTC y borrado de averías', weight: '35%' },
      { criteria: 'Prueba de actuadores y adaptación de mariposa motorizada', weight: '30%' }
    ]
  },
  {
    id: 'ass-6',
    title: 'Examen Integral Final y Certificación Oficial Volkswagen',
    moduleCode: '0030',
    moduleTitle: 'Módulo 6: Inserción Laboral, Evaluación Final y Certificación',
    type: 'practico-taller',
    status: 'bloqueado',
    minScore: '8.00 / 10',
    durationMinutes: 180,
    evaluator: 'Tribunal Académico Volkswagen Argentina & LNG Olivieri',
    description: 'Examen culminante del programa de 6 meses frente al comité directivo: resolución integral de fallas en vehículo en fosa y defensa de proyecto técnico.',
    rubric: [
      { criteria: 'Resolución de falla compleja en tiempo asignado', weight: '40%' },
      { criteria: 'Presentación de proyecto de optimización para taller', weight: '30%' },
      { criteria: 'Habilidades de atención técnica y confección de OR', weight: '30%' }
    ]
  }
];

