import React, { useState } from 'react';
import { Camera, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PdiUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PdiUploadModal: React.FC<PdiUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [elevadorNum, setElevadorNum] = useState('Elevador 2 (Fosa Técnica)');
  const [vinNumber, setVinNumber] = useState('WVW-ZZZ-3CZ-LE049281');
  const [notes, setNotes] = useState('Revisión visual de bajos, comprobación de niveles de fluidos sintéticos y torque de tuercas de rueda (120 Nm).');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateSelectPhoto = () => {
    setSelectedImage('Taos_0km_PDI_Elevador2_Firmado.jpg');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 1000);
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
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  ID: PDI-9801
                </span>
                <span className="text-xs font-semibold text-slate-500">Unidad 0km Taos</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                Subir Comprobante de Revisión PDI
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Puesto / Elevador</label>
                <input
                  type="text"
                  value={elevadorNum}
                  onChange={(e) => setElevadorNum(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">VIN / Chasis</label>
                <input
                  type="text"
                  value={vinNumber}
                  onChange={(e) => setVinNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">Observaciones Técnicas</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Upload Box */}
            <div
              onClick={handleSimulateSelectPhoto}
              className="border-2 border-dashed border-blue-300 bg-blue-50/40 hover:bg-blue-50/80 transition rounded-2xl p-5 text-center cursor-pointer"
            >
              {selectedImage ? (
                <div className="flex items-center justify-center space-x-2 text-emerald-700 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Foto seleccionada: {selectedImage}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-blue-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">
                    Capturar o seleccionar foto de la planilla PDI firmada
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Formatos: JPG, PNG o PDF sellado por Jefe de Taller (hasta 15MB)
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#0066cc] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Homologando...</span>
                  </>
                ) : (
                  <span>Subir Comprobante</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
