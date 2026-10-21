export type ViewType = 'dashboard' | 'plan' | 'novedades' | 'calendario' | 'recursos' | 'mentoria' | 'foro' | 'evaluaciones';

export interface ModuleTopic {
  title: string;
  desc: string;
}

export interface ModuleApprovalScheme {
  isLastModule?: boolean;
  tp?: {
    name: string;
    isOptional: boolean;
    status: 'aprobado' | 'pendiente' | 'bloqueado';
    grade?: string;
    file?: string;
  };
  exam: {
    name: string;
    isMandatory: boolean;
    status: 'aprobado' | 'pendiente' | 'bloqueado';
    grade?: string;
    date?: string;
  };
  finalProject?: {
    name: string;
    isMandatory: boolean;
    status: 'bloqueado' | 'pendiente' | 'aprobado';
    grade?: string;
  };
}

export interface ModuleItem {
  id: number;
  code: string;
  month: string;
  title: string;
  shortTitle: string;
  status: string;
  statusType: 'finalized' | 'in-progress' | 'locked';
  progress: number;
  grade?: string;
  portfolioFile?: string;
  approvalScheme: ModuleApprovalScheme;
  topics: ModuleTopic[];
  description: string;
}

export interface UrgentTask {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeType: 'urgent' | 'pending' | 'warning' | 'completed';
  code: string;
  buttonLabel: string;
  buttonAction: 'upload-pdi' | 'safety-quiz' | 'sign-epi' | 'review';
  completed: boolean;
}

export interface WeekScheduleItem {
  id: string;
  dayLabel: string;
  time: string;
  title: string;
  location: string;
  instructor: string;
  tag: string;
  isToday?: boolean;
  notes?: string;
}

export interface WorkshopActivity {
  id: string;
  category: 'taller' | 'evento' | 'aviso';
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  speaker?: string;
  spotsLeft?: number;
  totalSpots?: number;
  isEnrolled: boolean;
  badgeLabel?: string;
  details: string;
}

export interface CalendarEventItem {
  day: number;
  monthIndex: number; // 10 = Noviembre, 11 = Diciembre
  year: number;
  title: string;
  shortBadge: string;
  time: string;
  location: string;
  mentor: string;
  description: string;
  type: 'taller' | 'masterclass' | 'evaluacion' | 'visita';
  isToday?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
}

export interface ToolInventoryItem {
  id: string;
  name: string;
  category: 'kit-manual' | 'metrologia' | 'didactico' | 'epp';
  spec: string;
  available: number;
  total: number;
  status: 'disponible' | 'en-uso' | 'revision';
}

export interface ForumComment {
  id: string;
  author: string;
  role: 'tutor' | 'student';
  avatarInitials: string;
  avatarColor: string;
  date: string;
  content: string;
  likes: number;
  isSolution?: boolean;
}

export interface ForumThread {
  id: string;
  title: string;
  moduleCode: string;
  moduleTitle: string;
  author: string;
  authorRole: 'tutor' | 'student';
  avatarInitials: string;
  avatarColor: string;
  date: string;
  views: number;
  repliesCount: number;
  solved: boolean;
  pinned?: boolean;
  content: string;
  tags: string[];
  comments: ForumComment[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AssessmentItem {
  id: string;
  title: string;
  moduleCode: string;
  moduleTitle: string;
  type: 'teorico-online' | 'practico-taller' | 'simulacion';
  categoryKind: 'tp-opcional' | 'examen-parcial' | 'proyecto-final' | 'examen-certificacion' | 'simulador';
  status: 'aprobado' | 'pendiente' | 'bloqueado';
  grade?: string;
  minScore: string;
  durationMinutes: number;
  dateScheduled?: string;
  evaluator?: string;
  location?: string;
  description: string;
  questions?: AssessmentQuestion[];
  rubric: {
    criteria: string;
    weight: string;
    scoreObtained?: string;
  }[];
}
