import React, { useState } from 'react';
import { ForumThread } from '../../types';
import { MessageSquare, CheckCircle2, Pin, Search, ThumbsUp, Send, Plus, ArrowLeft, Eye, MessageCircle } from 'lucide-react';
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
    // Search
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Module
    const matchesModule = moduleFilter === 'all' || t.moduleCode === moduleFilter;

    // Status
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-7"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#09152b] via-[#0d2247] to-[#0052a3] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-sky-200">
            <span>Comunidad Técnica & Cátedras Oficiales</span>
            <span>•</span>
            <span className="text-white font-bold">LNG OLIVIERI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Foro Técnico y Debates de Taller
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Espacio de consulta de procedimientos, torques de fábrica, oscilogramas y resolución colaborativa de averías junto a los ingenieros y tutores.
          </p>
        </div>

        <button
          onClick={onOpenNewThreadModal}
          className="px-5 py-3 bg-white text-[#0066cc] font-bold text-xs rounded-xl shadow-md hover:bg-blue-50 transition flex items-center justify-center gap-2 shrink-0 self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Consulta</span>
        </button>
      </div>

      {/* Main Container: Split or List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Thread List & Filters (5 cols if detail open, 12 cols if not) */}
        <div className={selectedThreadId ? 'lg:col-span-5 space-y-4' : 'lg:col-span-12 space-y-5'}>
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Buscar por tema, falla, sensor o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    statusFilter === 'all' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos ({threads.length})
                </button>
                <button
                  onClick={() => setStatusFilter('mine')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    statusFilter === 'mine' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mis Temas
                </button>
                <button
                  onClick={() => setStatusFilter('solved')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    statusFilter === 'solved' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Resueltos
                </button>
                <button
                  onClick={() => setStatusFilter('pinned')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    statusFilter === 'pinned' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fijados
                </button>
              </div>

              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-700 text-xs focus:outline-none"
              >
                <option value="all">Todas las Materias</option>
                <option value="0001">Módulo 1: Fundamentos</option>
                <option value="0002">Módulo 2: Sistemas</option>
                <option value="0012">Módulo 3: Electricidad</option>
                <option value="0013">Módulo 4: Diagnóstico</option>
              </select>
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-3">
            {filteredThreads.map((thread) => {
              const isSelected = selectedThreadId === thread.id;
              return (
                <article
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/60 border-2 border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-blue-300 shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {thread.pinned && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                            <Pin className="w-3 h-3 text-amber-600" />
                            Fijado
                          </span>
                        )}
                        {thread.solved ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Caso Resuelto
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                            En Debate
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-400 font-mono">
                          Mód. {thread.moduleCode}
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-400">{thread.date}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {thread.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {thread.content}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {thread.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${thread.avatarColor}`}>
                        {thread.avatarInitials}
                      </div>
                      <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                        {thread.author}
                      </span>
                      {thread.authorRole === 'tutor' && (
                        <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                          Tutor
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {thread.views}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-blue-600">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {thread.comments.length}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}

            {filteredThreads.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">No se encontraron temas con esos filtros</p>
                <p className="text-xs text-slate-400">Prueba con otra palabra clave o crea una nueva consulta.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Thread Detail (7 cols when open) */}
        {activeThread && (
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
              {/* Detail Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeThread.solved && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Caso Resuelto
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {activeThread.moduleTitle}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    {activeThread.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedThreadId(null)}
                  className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Author & Initial Post Content */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-sm ${activeThread.avatarColor}`}>
                    {activeThread.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{activeThread.author}</h4>
                      {activeThread.authorRole === 'tutor' && (
                        <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          Tutor Oficial
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">Publicado {activeThread.date}</p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-200 whitespace-pre-line">
                  {activeThread.content}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeThread.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responses List */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Respuestas e Indicaciones Técnicas ({activeThread.comments.length})</span>
                  <span className="text-xs font-normal text-slate-500">Moderado por Cátedra</span>
                </h4>

                <div className="space-y-3.5">
                  {activeThread.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-2xl border space-y-2 transition ${
                        comment.isSolution
                          ? 'bg-emerald-50/50 border-2 border-emerald-400/80 shadow-xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 ${comment.avatarColor}`}>
                            {comment.avatarInitials}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                              {comment.role === 'tutor' && (
                                <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                                  Tutor
                                </span>
                              )}
                              {comment.isSolution && (
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  Solución Verificada
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">{comment.date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onNotify(`Voto registrado para la respuesta de ${comment.author}`)}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 px-2.5 py-1 rounded-lg hover:bg-slate-50 border border-slate-200 transition"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="font-semibold">{comment.likes}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-100 space-y-2.5">
                <label className="block text-xs font-bold text-slate-700">
                  Agregar tu respuesta o aporte técnico al debate:
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escribe tu observación o duda técnica para los instructores..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-5 py-2.5 bg-[#0066cc] hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publicar Respuesta</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
