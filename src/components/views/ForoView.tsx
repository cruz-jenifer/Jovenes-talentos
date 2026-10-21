import React, { useState } from 'react';
import { ForumThread } from '../../types';
import { MessageSquare, CheckCircle2, Pin, Search, ThumbsUp, Send, Plus, ArrowLeft, Eye, MessageCircle, Tag, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ForoViewProps {
  threads: ForumThread[];
  onAddComment: (threadId: string, content: string) => void;
  onOpenNewThreadModal: () => void;
  onNotify: (msg: string) => void;
  initialSelectedThreadId?: string | null;
}

export const ForoView: React.FC<ForoViewProps> = ({
  threads,
  onAddComment,
  onOpenNewThreadModal,
  onNotify,
  initialSelectedThreadId
}) => {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(initialSelectedThreadId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'mine' | 'solved' | 'pinned'>('all');
  const [replyText, setReplyText] = useState('');

  const activeThread = threads.find((t) => t.id === selectedThreadId);

  const filteredThreads = threads.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModule = moduleFilter === 'all' || t.moduleCode === moduleFilter;

    if (statusFilter === 'mine') {
      return matchesSearch && matchesModule && t.author === 'Facundo Gómez';
    }
    if (statusFilter === 'solved') {
      return matchesSearch && matchesModule && t.solved;
    }
    if (statusFilter === 'pinned') {
      return matchesSearch && matchesModule && t.pinned;
    }

    return matchesSearch && matchesModule;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    onAddComment(activeThread.id, replyText.trim());
    setReplyText('');
    onNotify('Respuesta enviada al foro técnico.');
  };

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
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Comunidad Técnica Oficial
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-600 font-semibold">Resolución de Averías & Cátedra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Foro Técnico & Consultas de Taller
            </h1>
            <p className="text-sm text-slate-600">
              Espacio colaborativo con instructores, ingenieros de planta y compañeros de programa.
            </p>
          </div>

          <button
            onClick={onOpenNewThreadModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 shrink-0 self-start sm:self-center cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Consulta</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Todos ({threads.length})
            </button>
            <button
              onClick={() => setStatusFilter('solved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                statusFilter === 'solved'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Resueltos
            </button>
            <button
              onClick={() => setStatusFilter('pinned')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                statusFilter === 'pinned'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Destacados
            </button>
            <button
              onClick={() => setStatusFilter('mine')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                statusFilter === 'mine'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Mis Consultas
            </button>
          </div>

          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por avería, código o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Main Container: Split View or Full Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Thread List Column */}
        <div className={selectedThreadId ? 'lg:col-span-5 space-y-3' : 'lg:col-span-12 space-y-3'}>
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => {
              const isSelected = selectedThreadId === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-100 shadow-blue-100/50'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {thread.pinned && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                            Fijado
                          </span>
                        )}
                        {thread.solved && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-300">
                            <Check className="w-3 h-3" /> Resuelto
                          </span>
                        )}
                        <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {thread.moduleCode}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {thread.date}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                        {thread.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {thread.content}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-500" />
                        <span>{thread.comments?.length || thread.repliesCount || 0}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">{thread.author}</span>
                    <div className="flex items-center gap-1">
                      {thread.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 shadow-sm">
              No se encontraron consultas en este filtro.
            </div>
          )}
        </div>

        {/* Thread Detail View (Right Column when selected) */}
        {selectedThreadId && activeThread && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <button
                onClick={() => setSelectedThreadId(null)}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la lista</span>
              </button>

              <div className="flex items-center gap-2">
                {activeThread.solved && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Caso Resuelto
                  </span>
                )}
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">{activeThread.moduleCode}</span>
              </div>
            </div>

            {/* Question detail */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {activeThread.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-bold text-slate-800">{activeThread.author}</span>
                <span>•</span>
                <span>{activeThread.date}</span>
              </div>

              <div className="p-4 bg-slate-100/90 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                <p>{activeThread.content}</p>
                <div className="flex items-center gap-1.5 pt-2 flex-wrap">
                  {activeThread.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded border border-blue-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Replies section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Respuestas ({activeThread.comments?.length || 0})
              </h3>

              <div className="space-y-3">
                {activeThread.comments?.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                      reply.role === 'tutor' || reply.isSolution
                        ? 'bg-blue-50/80 border-blue-200 ring-1 ring-blue-100'
                        : 'bg-white border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{reply.author}</span>
                        {reply.role === 'tutor' && (
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.2 rounded border border-blue-200">
                            Respuesta de Cátedra
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">{reply.date}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed text-xs">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick reply form */}
            <form onSubmit={handleSendReply} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu respuesta o aporte técnico..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};
