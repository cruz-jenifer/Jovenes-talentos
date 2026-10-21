/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ViewType,
  ModuleItem,
  UrgentTask,
  WorkshopActivity,
  CalendarEventItem,
  ChatMessage,
  ForumThread,
  AssessmentItem
} from './types';
import {
  INITIAL_MODULES,
  INITIAL_URGENT_TASKS,
  WEEK_SCHEDULE,
  WORKSHOP_ACTIVITIES,
  CALENDAR_EVENTS,
  INITIAL_CHAT_MESSAGES,
  FORUM_THREADS,
  ASSESSMENTS_DATA
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Toast } from './components/ui/Toast';

import { DashboardView } from './components/views/DashboardView';
import { PlanView } from './components/views/PlanView';
import { NovedadesView } from './components/views/NovedadesView';
import { CalendarioView } from './components/views/CalendarioView';
import { RecursosView } from './components/views/RecursosView';
import { ForoView } from './components/views/ForoView';
import { EvaluacionesView } from './components/views/EvaluacionesView';

import { PortfolioModal } from './components/modals/PortfolioModal';
import { ChatModal } from './components/modals/ChatModal';
import { ModuleDrawer } from './components/modals/ModuleDrawer';
import { GeneralModal } from './components/modals/GeneralModal';
import { PdiUploadModal } from './components/modals/PdiUploadModal';
import { SafetyQuizModal } from './components/modals/SafetyQuizModal';
import { SignatureModal } from './components/modals/SignatureModal';
import { NewThreadModal } from './components/modals/NewThreadModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);

  // Core Data States
  const [modules, setModules] = useState<ModuleItem[]>(INITIAL_MODULES);
  const [tasks, setTasks] = useState<UrgentTask[]>(INITIAL_URGENT_TASKS);
  const [activities, setActivities] = useState<WorkshopActivity[]>(WORKSHOP_ACTIVITIES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [events] = useState<CalendarEventItem[]>(CALENDAR_EVENTS);
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(FORUM_THREADS);
  const [assessments] = useState<AssessmentItem[]>(ASSESSMENTS_DATA);

  // Forum navigation state
  const [selectedForoThreadId, setSelectedForoThreadId] = useState<string | null>(null);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);

  // Modals & Drawers States
  const [portfolioState, setPortfolioState] = useState<{
    isOpen: boolean;
    moduleTitle: string;
    fileName?: string;
    grade?: string;
  }>({
    isOpen: false,
    moduleTitle: 'Fundamentos Técnicos, Taller y Seguridad',
    fileName: 'Informe_Metrologia_Taller_Gomez.pdf',
    grade: '9.50 / 10 - Aprobado'
  });

  const [chatState, setChatState] = useState<{
    isOpen: boolean;
    contextTitle: string;
  }>({
    isOpen: false,
    contextTitle: 'Mantenimiento y Electricidad Automotriz'
  });

  const [selectedDrawerModule, setSelectedDrawerModule] = useState<ModuleItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isPdiOpen, setIsPdiOpen] = useState(false);
  const [isSafetyQuizOpen, setIsSafetyQuizOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  const [generalModal, setGeneralModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: ''
  });

  // Toast System
  const [toast, setToast] = useState<{
    message: string | null;
    type?: 'success' | 'info' | 'warning';
  }>({
    message: null,
    type: 'success'
  });

  const notify = (msg: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => {
      setToast({ message: null });
    }, 3200);
  };

  // Keyboard shortcut: Escape closes all modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPortfolioState(prev => ({ ...prev, isOpen: false }));
        setChatState(prev => ({ ...prev, isOpen: false }));
        setIsDrawerOpen(false);
        setIsPdiOpen(false);
        setIsSafetyQuizOpen(false);
        setIsSignatureOpen(false);
        setIsNewThreadModalOpen(false);
        setGeneralModal(prev => ({ ...prev, isOpen: false }));
        setNotifPanelOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for Tasks
  const handleOpenTaskAction = (action: string) => {
    if (action === 'upload-pdi') {
      setIsPdiOpen(true);
    } else if (action === 'safety-quiz') {
      setIsSafetyQuizOpen(true);
    } else if (action === 'sign-epi') {
      setIsSignatureOpen(true);
    }
  };

  const handlePdiSuccess = () => {
    setTasks(prev =>
      prev.map(t => (t.id === 'task-1' ? { ...t, completed: true } : t))
    );
    notify('¡Comprobante de inspección PDI subido y homologado con éxito!');
  };

  const handleSafetyQuizSuccess = (score: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === 'task-2' ? { ...t, completed: true } : t))
    );
    notify(`¡Autoevaluación de Seguridad completada con calificación ${score}/10!`);
  };

  const handleSignatureSuccess = () => {
    setTasks(prev =>
      prev.map(t => (t.id === 'task-3' ? { ...t, completed: true } : t))
    );
    notify('¡Conformidad de EPI firmada digitalmente y archivada en legajo!');
  };

  // Workshop Activity Toggle
  const handleToggleEnroll = (id: string) => {
    setActivities(prev =>
      prev.map(act => {
        if (act.id === id) {
          const nextEnrolled = !act.isEnrolled;
          const currentSpots = act.spotsLeft ?? 0;
          const newSpots = nextEnrolled ? Math.max(0, currentSpots - 1) : currentSpots + 1;

          if (nextEnrolled) {
            notify(`¡Inscripción confirmada! Te esperamos en: ${act.title}`);
          } else {
            notify(`Inscripción cancelada para: ${act.title}`, 'info');
          }

          return {
            ...act,
            isEnrolled: nextEnrolled,
            spotsLeft: newSpots
          };
        }
        return act;
      })
    );
  };

  // Chat message sending
  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timeStr = `Hoy ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} hs`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: timeStr
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  // Forum Handlers
  const handleAddForumComment = (threadId: string, content: string) => {
    const now = new Date();
    const timeStr = `Hoy ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} hs`;

    setForumThreads(prev =>
      prev.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            repliesCount: thread.repliesCount + 1,
            comments: [
              ...thread.comments,
              {
                id: `c-${Date.now()}`,
                author: 'Facundo Gómez',
                role: 'student',
                avatarInitials: 'FG',
                avatarColor: 'bg-blue-600',
                date: timeStr,
                content,
                likes: 0
              }
            ]
          };
        }
        return thread;
      })
    );
  };

  const handleCreateForumThread = (newThreadData: Omit<ForumThread, 'id' | 'views' | 'repliesCount' | 'comments'>) => {
    const newThread: ForumThread = {
      ...newThreadData,
      id: `thread-${Date.now()}`,
      views: 1,
      repliesCount: 0,
      comments: []
    };

    setForumThreads(prev => [newThread, ...prev]);
    setSelectedForoThreadId(newThread.id);
    notify('¡Consulta publicada exitosamente en el Foro de Cátedra!');
  };

  // Drawer Controls
  const handleOpenModuleDrawer = (mod: ModuleItem) => {
    setSelectedDrawerModule(mod);
    setIsDrawerOpen(true);
  };

  // Portfolio Modal Controls
  const handleOpenPortfolio = (moduleTitle: string, currentFile?: string, grade?: string) => {
    setPortfolioState({
      isOpen: true,
      moduleTitle,
      fileName: currentFile || 'Informe_Tecnico_Gomez.pdf',
      grade: grade || '9.50 / 10 - Aprobado'
    });
  };

  // Chat Modal Controls
  const handleOpenChat = (contextTitle?: string) => {
    setChatState({
      isOpen: true,
      contextTitle: contextTitle || 'Mantenimiento y Electricidad Automotriz'
    });
  };

  // General Modal Controls
  const handleOpenModal = (title: string, body: string) => {
    setGeneralModal({
      isOpen: true,
      title,
      content: body
    });
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const next = !t.completed;
          notify(next ? `Tarea completada: ${t.title}` : `Tarea reactivada: ${t.title}`);
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  return (
    <div className="h-full min-h-screen text-slate-800 antialiased flex flex-col md:flex-row bg-[#f8fafc] overflow-x-hidden">
      {/* SIDEBAR */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => {
          if (v === 'mentoria') {
            handleOpenChat('Mentoría 1 a 1 - Consulta General');
          } else {
            setCurrentView(v);
          }
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenProfile={() =>
          handleOpenModal(
            'Perfil Oficial del Aprendiz: Facundo Gómez',
            `<b>DNI:</b> 44.892.104<br/>
             <b>Programa:</b> Jóvenes Talentos LNG Olivieri (Edición 2024)<br/>
             <b>Sede Principal:</b> Sucursal Central Ramos Mejía<br/>
             <b>Puesto actual:</b> Box 4 (Fosa de Electricidad y Carga)<br/>
             <b>Tutor Asignado:</b> Ing. Carlos Pérez<br/>
             <b>Avance Académico:</b> 38% completado (2 materias aprobadas, 1 en curso)<br/>
             <b>Legajo Técnico:</b> Habilitado para prácticas presenciales en taller oficial.`
          )
        }
        unreadCount={3}
      />

      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto" id="mainContainer">
        {/* Top Header */}
        <Header
          currentView={currentView}
          onSelectView={setCurrentView}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onToggleNotifs={() => setNotifPanelOpen(prev => !prev)}
          unreadCount={2}
          onSearchSelect={(type, id) => {
            if (type === 'module') {
              setCurrentView('plan');
            } else if (type === 'task') {
              setCurrentView('dashboard');
              handleOpenTaskAction('upload-pdi');
            } else if (type === 'forum') {
              setCurrentView('foro');
            }
          }}
        />

        {/* Notifications Dropdown Panel */}
        {notifPanelOpen && (
          <div className="fixed top-16 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-40 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
              <span>Notificaciones Recientes</span>
              <button
                onClick={() => {
                  setNotifPanelOpen(false);
                  notify('Notificaciones marcadas como leídas');
                }}
                className="text-blue-600 hover:text-blue-800 text-[11px] font-semibold"
              >
                Marcar leídas
              </button>
            </div>
            <div className="mt-2.5 space-y-2">
              <div
                onClick={() => {
                  setCurrentView('novedades');
                  setNotifPanelOpen(false);
                }}
                className="p-2.5 bg-blue-50/80 hover:bg-blue-100/70 transition rounded-xl cursor-pointer"
              >
                <p className="font-bold text-slate-800">Nueva Masterclass habilitada</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Baterías de alto voltaje VW. 8 cupos libres.</p>
              </div>

              <div
                onClick={() => {
                  setCurrentView('evaluaciones');
                  setNotifPanelOpen(false);
                }}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 transition rounded-xl cursor-pointer"
              >
                <p className="font-bold text-slate-800">Examen Práctico Módulo 3</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Viernes 15 • 08:30 hs en Laboratorio Eléctrico.</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Body Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto pb-28 md:pb-10">
          {currentView === 'dashboard' && (
            <DashboardView
              tasks={tasks}
              schedule={WEEK_SCHEDULE}
              onOpenTaskAction={handleOpenTaskAction}
              onOpenChat={handleOpenChat}
              onSelectView={setCurrentView}
              onShowNoticeModal={handleOpenModal}
              onNotify={notify}
              onToggleTaskComplete={handleToggleTaskComplete}
            />
          )}

          {currentView === 'plan' && (
            <PlanView
              modules={modules}
              onOpenModuleDrawer={handleOpenModuleDrawer}
              onOpenPortfolio={handleOpenPortfolio}
              onOpenChat={handleOpenChat}
              onOpenModal={handleOpenModal}
              onGoToNovedades={() => setCurrentView('novedades')}
              onGoToForo={(modCode) => {
                setCurrentView('foro');
                const matched = forumThreads.find(t => t.moduleCode === modCode);
                if (matched) setSelectedForoThreadId(matched.id);
              }}
              onGoToEvaluaciones={() => setCurrentView('evaluaciones')}
            />
          )}

          {currentView === 'foro' && (
            <ForoView
              threads={forumThreads}
              onAddComment={handleAddForumComment}
              onOpenNewThreadModal={() => setIsNewThreadModalOpen(true)}
              onNotify={notify}
              initialSelectedThreadId={selectedForoThreadId}
            />
          )}

          {currentView === 'evaluaciones' && (
            <EvaluacionesView
              assessments={assessments}
              onOpenModal={handleOpenModal}
              onNotify={notify}
            />
          )}

          {currentView === 'novedades' && (
            <NovedadesView
              activities={activities}
              onToggleEnroll={handleToggleEnroll}
              onOpenModal={handleOpenModal}
              onBackToPlan={() => setCurrentView('plan')}
            />
          )}

          {currentView === 'calendario' && (
            <CalendarioView
              events={events}
              onOpenEventModal={(ev) =>
                handleOpenModal(
                  ev.title,
                  `<div class="space-y-3">
                    <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-xs text-blue-900">
                      <p><strong>📅 Horario:</strong> ${ev.time}</p>
                      <p><strong>📍 Sede y Puesto:</strong> ${ev.location}</p>
                      <p><strong>👨‍🏫 Responsable / Tutor:</strong> ${ev.mentor}</p>
                    </div>
                    <p class="text-xs text-slate-700 leading-relaxed">${ev.description}</p>
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Turno Confirmado en Legajo</span>
                    </div>
                  </div>`
                )
              }
              onOpenChat={handleOpenChat}
              onGoToPlan={() => setCurrentView('plan')}
              onNotify={notify}
            />
          )}

          {currentView === 'recursos' && (
            <RecursosView
              onNotify={notify}
              onOpenModal={handleOpenModal}
            />
          )}
        </main>
      </div>

      {/* MODALS & DRAWERS */}
      <PortfolioModal
        isOpen={portfolioState.isOpen}
        onClose={() => setPortfolioState(prev => ({ ...prev, isOpen: false }))}
        moduleTitle={portfolioState.moduleTitle}
        currentFileName={portfolioState.fileName}
        grade={portfolioState.grade}
        onUploadSuccess={(newName) => {
          setModules(prev =>
            prev.map(m =>
              m.shortTitle === portfolioState.moduleTitle
                ? { ...m, portfolioFile: newName }
                : m
            )
          );
          notify(`Nueva versión subida con éxito: ${newName}`);
        }}
      />

      <ChatModal
        isOpen={chatState.isOpen}
        onClose={() => setChatState(prev => ({ ...prev, isOpen: false }))}
        contextTitle={chatState.contextTitle}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />

      <ModuleDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        module={selectedDrawerModule}
        onOpenChat={handleOpenChat}
        onOpenPortfolio={(title) => handleOpenPortfolio(title)}
      />

      <PdiUploadModal
        isOpen={isPdiOpen}
        onClose={() => setIsPdiOpen(false)}
        onSuccess={handlePdiSuccess}
      />

      <SafetyQuizModal
        isOpen={isSafetyQuizOpen}
        onClose={() => setIsSafetyQuizOpen(false)}
        onSuccess={handleSafetyQuizSuccess}
      />

      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        onSuccess={handleSignatureSuccess}
      />

      <NewThreadModal
        isOpen={isNewThreadModalOpen}
        onClose={() => setIsNewThreadModalOpen(false)}
        onSubmit={handleCreateForumThread}
      />

      <GeneralModal
        isOpen={generalModal.isOpen}
        onClose={() => setGeneralModal(prev => ({ ...prev, isOpen: false }))}
        title={generalModal.title}
        content={generalModal.content}
      />

      {/* Floating Toast */}
      <Toast message={toast.message} type={toast.type} />

      {/* Modern Mobile Bottom Navigation */}
      <MobileNav
        currentView={currentView}
        onSelectView={setCurrentView}
        unreadNotifsCount={2}
      />
    </div>
  );
}
