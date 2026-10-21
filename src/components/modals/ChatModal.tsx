import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextTitle?: string;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  contextTitle = 'Fundamentos Técnicos, Taller y Seguridad',
  messages,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setInputText('');
    setIsTyping(true);

    // Realistic automated tutor reply after 1.2s
    setTimeout(() => {
      setIsTyping(false);
      const automatedReplies = [
        `¡Excelente Facundo! Tomo nota para la práctica de mañana en el taller central de Ramos Mejía. No olvides traer el multímetro y el calzado dieléctrico.`,
        `Buen planteo Facundo. Revisá el esquema eléctrico de la página 14 del manual técnico MQB antes del inicio del turno.`,
        `Queda asentado en tu legajo técnico. Recordá que el informe debe incluir la firma del jefe de fosa antes de las 18 hs.`
      ];
      const randomReply = automatedReplies[Math.floor(Math.random() * automatedReplies.length)];
      onSendMessage(randomReply);
    }, 1200);
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
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* Dark Navy Header (#09152b) */}
          <div className="px-5 py-4 bg-[#09152b] text-white flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-bold flex items-center justify-center text-sm border-2 border-white/40 shadow-sm">
                  CP
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#09152b]" />
              </div>
              <div className="truncate">
                <h4 className="text-sm font-bold text-white truncate">
                  Consulta: {contextTitle}
                </h4>
                <p className="text-xs text-slate-400">Ing. Carlos Pérez • Tutor de Campo LNG Olivieri</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition shrink-0 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Message Stream */}
          <div className="p-5 space-y-4 max-h-96 min-h-[240px] overflow-y-auto bg-slate-50/70 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end ml-auto max-w-[85%]' : 'items-start max-w-[85%]'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0066cc] text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-medium px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs py-1">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-medium text-slate-500">Ing. Carlos Pérez está escribiendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe un mensaje al tutor..."
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 border border-slate-300 rounded-full focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 bg-[#0066cc] hover:bg-blue-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold rounded-full transition flex items-center gap-1.5 shrink-0"
            >
              <span>Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
