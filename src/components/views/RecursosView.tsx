import React, { useState } from 'react';
import { TOOL_INVENTORY } from '../../data/mockData';
import { ToolInventoryItem } from '../../types';
import { Wrench, Shield, Coffee, Bus, CheckCircle2, AlertTriangle, Layers, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface RecursosViewProps {
  onNotify: (msg: string) => void;
  onOpenModal: (title: string, body: string) => void;
}

export const RecursosView: React.FC<RecursosViewProps> = ({ onNotify, onOpenModal }) => {
  const [tools, setTools] = useState<ToolInventoryItem[]>(TOOL_INVENTORY);
  const [requestItem, setRequestItem] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kit-manual' | 'metrologia' | 'didactico' | 'epp'>('all');

  const filteredTools = tools.filter(t => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const handleToolRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestItem) return;
    onNotify(`Solicitud de ${requestItem} enviada a Pañol Central con éxito.`);
    setRequestItem('');
    setRequestReason('');
  };

  const handleRequestItemQuick = (name: string) => {
    onNotify(`Pedido de ${name} procesado para entrega en Puesto 4.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#09152b] via-[#0d2247] to-[#0052a3] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-sky-200">
            <span>Área Operativa 2 • Recursos y Logística</span>
            <span>•</span>
            <span className="text-white font-bold">LNG OLIVIERI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Almacén, Pañol y Logística del Programa
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Inventario oficial de herramientas manuales, metrología de precisión, entrega de EPP, refrigerios y gestión de viáticos de transporte.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() =>
              onOpenModal(
                'Protocolo de Seguridad Industrial en Taller',
                `<b>Delimitación de Zonas:</b> Señalización de franjas peatonales de circulación y áreas restringidas de elevadores.<br/><br/>
                 <b>Inspección de Equipos:</b> Verificación de matafuegos ABC vigentes, tableros con disyuntor diferencial y estado de cables de aislación.<br/><br/>
                 <b>Prohibición estricta:</b> No ingresar a fosa sin antiparras ni manipular líquidos a más de 60°C sin guantes de nitrilo reforzados.`
              )
            }
            className="px-4 py-2.5 bg-white text-blue-900 rounded-xl text-xs font-bold hover:bg-blue-50 transition shadow-xs flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Protocolo de Seguridad</span>
          </button>
        </div>
      </div>

      {/* 4 Pillars Summary Grid (Direct from PDF) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1: Espacios Físicos */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Espacios Físicos</h4>
          <p className="text-xs text-slate-600">
            Aula Teórica + Taller 1 (bancos didácticos) + Taller 2 (bahía táctica de elevadores en concesionario).
          </p>
          <span className="text-[11px] font-bold text-emerald-600 inline-block pt-1">
            ✓ 3 Sectores Activos
          </span>
        </div>

        {/* Card 2: Almacén de Herramientas */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5 text-indigo-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Kit Manual por Comisión</h4>
          <p className="text-xs text-slate-600">
            Juegos de llaves 8 a 19mm, destornilladores 1000V, calibres, flexómetros y bandejas de contención.
          </p>
          <span className="text-[11px] font-bold text-blue-600 inline-block pt-1">
            ✓ 20 Kits Disponibles
          </span>
        </div>

        {/* Card 3: EPP & Bioseguridad */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Dotación y Entrega de EPP</h4>
          <p className="text-xs text-slate-600">
            Calzado con puntera norma IRAM, antiparras de policarbonato y stock de resguardo por desgaste.
          </p>
          <span className="text-[11px] font-bold text-emerald-600 inline-block pt-1">
            ✓ Conformidad Firmada
          </span>
        </div>

        {/* Card 4: Viáticos y Refrigerios */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Coffee className="w-5 h-5 text-amber-700" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Refrigerio y Viáticos</h4>
          <p className="text-xs text-slate-600">
            Dispensa habilitada para descanso intermedio y asignación de boletos de transporte SUBE.
          </p>
          <span className="text-[11px] font-bold text-amber-700 inline-block pt-1">
            ✓ Acreditado Mes 3
          </span>
        </div>
      </div>

      {/* Main Grid: Tool Inventory Table + Quick Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Tool Inventory (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Inventario Exclusivo de Capacitación
                </h3>
                <p className="text-xs text-slate-500">
                  Herramientas e instrumental calibrado bajo norma ISO 9001
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedCategory === 'all' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedCategory('kit-manual')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedCategory === 'kit-manual' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Manuales
                </button>
                <button
                  onClick={() => setSelectedCategory('metrologia')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedCategory === 'metrologia' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Metrología
                </button>
                <button
                  onClick={() => setSelectedCategory('didactico')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedCategory === 'didactico' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Motores
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {tool.category}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          tool.status === 'disponible'
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        ● {tool.available} de {tool.total} en Pañol
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug">
                      {tool.spec}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRequestItemQuick(tool.name)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition shrink-0 self-start sm:self-center flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pedir a Puesto</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Request & Logistics Management (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Form: Solicitud de Material */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Solicitud de Pañol / Recambio</span>
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              ¿Se dañó una herramienta, requerís recambio de guantes o instrumental especial para el box?
            </p>

            <form onSubmit={handleToolRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Elemento Solicitado
                </label>
                <input
                  type="text"
                  placeholder="Ej: Calibre de cuadrante o torquímetro 40-200Nm"
                  value={requestItem}
                  onChange={(e) => setRequestItem(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100/90 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Motivo / Puesto Asignado
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Medición de alabeo en disco de Taos - Box 4"
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100/90 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 focus:bg-white focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0066cc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition"
              >
                Enviar Solicitud a Pañol Central
              </button>
            </form>
          </div>

          {/* Viáticos & Transporte */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bus className="w-4 h-4 text-emerald-600" />
                <span>Gestión de Viáticos (SUBE)</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Aprobado
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Acreditación automática mensual de boletos de transporte público para asistencia al Taller Ramos Mejía y San Justo.
            </p>

            <div className="p-3.5 bg-slate-100/90 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
              <p><strong>Tarjeta Registrada:</strong> •••• 9812 (SUBE Facundo Gómez)</p>
              <p><strong>Recarga Mes 3:</strong> $34.500 ARS acreditados</p>
              <p className="text-[11px] text-slate-500">Próxima renovación: 01 de Diciembre</p>
            </div>

            <button
              onClick={() => onNotify('Comprobante de viático descargado en formato PDF.')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 text-xs font-bold rounded-xl transition shadow-2xs hover:shadow-xs"
            >
              Descargar Constancia de Viático
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
