import React, { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ForumThread } from '../../types';

interface NewThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (thread: Omit<ForumThread, 'id' | 'views' | 'repliesCount' | 'comments'>) => void;
}

export const NewThreadModal: React.FC<NewThreadModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [moduleCode, setModuleCode] = useState('0012');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const getModuleTitle = (code: string) => {
    switch (code) {
      case '0001':
        return 'Módulo 1: Fundamentos Técnicos, Taller y Seguridad';
      case '0002':
        return 'Módulo 2: Sistemas del Vehículo y Servicio al Cliente';
      case '0012':
        return 'Módulo 3: Mantenimiento y Electricidad Automotriz';
      case '0013':
        return 'Módulo 4: Diagnóstico y Proceso Post-Venta';
      default:
        return 'Consultas Generales de Taller';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSubmit({
      title: title.trim(),
      moduleCode,
      moduleTitle: getModuleTitle(moduleCode),
      author: 'Facundo Gómez',
      authorRole: 'student',
      avatarInitials: 'FG',
      avatarColor: 'bg-blue-600',
      date: 'Recién',
      solved: false,
      pinned: false,
      tags: tags.length > 0 ? tags : ['Consulta Taller'],
      content: content.trim()
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MessageSquarePlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Crear Consulta en el Foro
                </h3>
                <p className="text-xs text-slate-500">
                  Visible para mentores, instructores y compañeros de taller
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Módulo o Cátedra
              </label>
              <select
                value={moduleCode}
                onChange={(e) => setModuleCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
              >
                <option value="0012">Módulo 3: Mantenimiento y Electricidad Automotriz</option>
                <option value="0001">Módulo 1: Fundamentos Técnicos, Taller y Seguridad</option>
                <option value="0002">Módulo 2: Sistemas del Vehículo y Servicio al Cliente</option>
                <option value="0013">Módulo 4: Diagnóstico y Proceso Post-Venta</option>
                <option value="general">Consultas Generales de Taller y Fosa</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Título de la Consulta
              </label>
              <input
                type="text"
                placeholder="Ej: Calibración de entrehierro en sensor de giro o caída de masa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-600 focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Etiquetas / Tags (separados por coma)
              </label>
              <input
                type="text"
                placeholder="Ej: Alternador, Osciloscopio, Box 4"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Descripción detallada del caso o consulta
              </label>
              <textarea
                rows={4}
                placeholder="Describe el síntoma, mediciones obtenidas con multímetro/osciloscopio, modelo del vehículo y la duda técnica..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-600 focus:outline-none leading-relaxed"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0066cc] hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
              >
                Publicar Consulta
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
