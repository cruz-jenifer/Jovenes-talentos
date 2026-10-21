import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GeneralModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

export const GeneralModal: React.FC<GeneralModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  primaryActionLabel = 'Entendido',
  onPrimaryAction,
}) => {
  if (!isOpen) return null;

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
          className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-lg p-1 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5">
            {typeof content === 'string' ? (
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="space-y-2 leading-relaxed"
              />
            ) : (
              content
            )}
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100 space-x-2">
            <button
              onClick={onPrimaryAction || onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-xl text-white shadow-xs transition"
            >
              {primaryActionLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
