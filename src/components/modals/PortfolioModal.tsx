import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
  currentFileName?: string;
  grade?: string;
  onUploadSuccess: (newFileName: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  moduleTitle,
  currentFileName = 'Informe_Revision_Frenos_Gomez.pdf',
  grade = '9.50 / 10 - Aprobado',
  onUploadSuccess
}) => {
  const [fileName, setFileName] = useState(currentFileName);
  const [fileGrade, setFileGrade] = useState(grade);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const generatedName = `Evidencia_${moduleTitle.slice(0, 15).replace(/\s+/g, '_')}_Gomez_v2.pdf`;
          setFileName(generatedName);
          setFileGrade('En revisión por Ing. Carlos Pérez');
          onUploadSuccess(generatedName);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(30);
      setTimeout(() => {
        setIsUploading(false);
        setFileName(file.name);
        setFileGrade('En revisión por Ing. Carlos Pérez');
        onUploadSuccess(file.name);
      }, 700);
    }
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
          className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  TP Opcional de Cátedra
                </span>
                <span className="text-xs text-slate-400 font-medium">+1.00 Pts Extra al Legajo</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Portafolio de Evidencias</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {moduleTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-sky-400 bg-sky-50/40 rounded-2xl p-6 text-center cursor-pointer hover:bg-sky-50/80 transition relative overflow-hidden group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
            />

            {isUploading ? (
              <div className="py-4 space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <p className="text-xs font-bold text-slate-700">Subiendo evidencia al legajo técnico ({uploadProgress}%)...</p>
                <div className="w-48 mx-auto bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 mx-auto rounded-full text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  Arrastra tu informe técnico aquí o haz clic para subir
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Formatos admitidos: PDF, JPG, PNG (Hasta 25MB) • Con sello del taller
                </p>
              </>
            )}
          </div>

          {/* ÚLTIMA ENTREGA REGISTRADA */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
              ÚLTIMA ENTREGA REGISTRADA
            </h4>
            <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 truncate">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {fileName}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Calificación: {fileGrade}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg shrink-0 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Revisado</span>
              </span>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Cerrar
            </button>
            <button
              onClick={handleSimulateUpload}
              disabled={isUploading}
              className="px-5 py-2.5 bg-[#0066cc] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              Subir nueva versión
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
