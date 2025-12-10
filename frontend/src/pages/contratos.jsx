import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

//import { ContratoDetailPanel } from './ContratoDetailPanel';
//import { CreateContratoModal } from './CreateContratoModal';
//import { EditContratoModal } from './EditContratoModal';
//import { RenewContratoModal } from './RenewContratoModal';
//import { FinalizeContratoModal } from './FinalizeContratoModal';


const mockContratos = [
  {
    id: '1',
    cliente: 'María González',
    codigoContrato: 'CTR-2024-001',
    apartamento: 'Apt 301 - Torre A',
    sucursal: 'Centro',
    tipoContrato: 'Anual',
    fechaInicio: '14 ene 2024',
    fechaFin: '14 ene 2025',
    montoMensual: 1500.00,
    deposito: 3000.00,
    estado: 'Activo',
    duracion: '12 meses',
    notas: 'Cliente preferencial, renovación automática acordada.',
    fechaCreacion: '14 de enero de 2024',
    ultimaActualizacion: '21 de noviembre de 2024',
  },
  {
    id: '2',
    cliente: 'Carlos Ramírez',
    codigoContrato: 'CTR-2024-002',
    apartamento: 'Apt 502 - Torre B',
    sucursal: 'Norte',
    tipoContrato: 'Mensual',
    fechaInicio: '30 nov 2023',
    fechaFin: '30 dic 2024',
    montoMensual: 1200.00,
    deposito: 2400.00,
    estado: 'Próximo a vencer',
    duracion: '13 meses',
    fechaCreacion: '30 de noviembre de 2023',
    ultimaActualizacion: '15 de noviembre de 2024',
  },
  {
    id: '3',
    cliente: 'Ana Martínez',
    codigoContrato: 'CTR-2024-003',
    apartamento: 'Apt 105 - Torre A',
    sucursal: 'Centro',
    tipoContrato: 'Anual',
    fechaInicio: '29 feb 2024',
    fechaFin: '31 ago 2024',
    montoMensual: 800.00,
    deposito: 1600.00,
    estado: 'Finalizado',
    duracion: '6 meses',
    fechaCreacion: '29 de febrero de 2024',
    ultimaActualizacion: '31 de agosto de 2024',
  },
  {
    id: '4',
    cliente: 'Roberto Silva',
    codigoContrato: 'CTR-2024-004',
    apartamento: 'Apt 208 - Torre C',
    sucursal: 'Sur',
    tipoContrato: 'Anual',
    fechaInicio: '31 may 2024',
    fechaFin: '31 may 2025',
    montoMensual: 1800.00,
    deposito: 3600.00,
    estado: 'Activo',
    duracion: '12 meses',
    fechaCreacion: '31 de mayo de 2024',
    ultimaActualizacion: '5 de diciembre de 2024',
  },
  {
    id: '5',
    cliente: 'Lucía Fernández',
    codigoContrato: 'CTR-2024-005',
    apartamento: 'Apt 410 - Torre B',
    sucursal: 'Norte',
    tipoContrato: 'Mensual',
    fechaInicio: '31 ene 2024',
    fechaFin: '30 abr 2024',
    montoMensual: 950.00,
    deposito: 1900.00,
    estado: 'Cancelado',
    duracion: '3 meses',
    fechaCreacion: '31 de enero de 2024',
    ultimaActualizacion: '15 de abril de 2024',
  },
  {
    id: '6',
    cliente: 'Jorge Morales',
    codigoContrato: 'CTR-2024-006',
    apartamento: 'Apt 701 - Torre A',
    sucursal: 'Centro',
    tipoContrato: 'Anual',
    fechaInicio: '14 abr 2024',
    fechaFin: '14 abr 2025',
    montoMensual: 2000.00,
    deposito: 4000.00,
    estado: 'Activo',
    duracion: '12 meses',
    fechaCreacion: '14 de abril de 2024',
    ultimaActualizacion: '1 de diciembre de 2024',
  },
  {
    id: '7',
    cliente: 'Patricia Vargas',
    codigoContrato: 'CTR-2024-007',
    apartamento: 'Apt 315 - Torre C',
    sucursal: 'Este',
    tipoContrato: 'Anual',
    fechaInicio: '30 abr 2024',
    fechaFin: '30 abr 2025',
    montoMensual: 1350.00,
    deposito: 2700.00,
    estado: 'Activo',
    duracion: '12 meses',
    fechaCreacion: '30 de abril de 2024',
    ultimaActualizacion: '28 de noviembre de 2024',
  },
];

export function Contratos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [sucursalFilter, setSucursalFilter] = useState('Todas las sucursales');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [tipoFilter, setTipoFilter] = useState('Todos');
  const [contratos, setContratos] = useState(mockContratos);

  const [selectedContrato, setSelectedContrato] = useState(null); 
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);

  
  const filteredContratos = contratos.filter((contrato) => {
    const matchesSearch =
      contrato.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.codigoContrato.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSucursal = sucursalFilter === 'Todas las sucursales' || contrato.sucursal === sucursalFilter;
    const matchesEstado = estadoFilter === 'Todos' || contrato.estado === estadoFilter;
    const matchesTipo = tipoFilter === 'Todos' || contrato.tipoContrato === tipoFilter;
    
    
    return matchesSearch && matchesSucursal && matchesEstado && matchesTipo;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setFechaInicio('');
    setFechaFin('');
    setSucursalFilter('Todas las sucursales');
    setEstadoFilter('Todos');
    setTipoFilter('Todos');
  };


  const handleViewDetails = (contrato) => {
    setSelectedContrato(contrato);
    setIsDetailPanelOpen(true);
  };

  const handleEdit = (contrato) => {
    setSelectedContrato(contrato);
    setIsEditModalOpen(true);
  };

  const handleRenew = (contrato) => {
    setSelectedContrato(contrato);
    setIsRenewModalOpen(true);
  };

  const handleFinalize = (contrato) => {
    setSelectedContrato(contrato);
    setIsFinalizeModalOpen(true);
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Próximo a vencer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizado':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
    {/* El nuevo contenedor que alinea el título y el botón */}
    <div className="flex items-start justify-between"> 
        {/* Contenedor del Título y Descripción*/}
        <div>
        <h1 className="text-gray-900">Contratos</h1>
        <p className="text-sm text-gray-600 mt-1">
            Gestiona y supervisa todos los contratos de alquiler
        </p>
        </div>
        {/* Botón "Nuevo Contrato" */}
        <button
        onClick={() => setIsCreateModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-1"
        >
        <Plus className="w-5 h-5" />
        Nuevo Contrato
        </button>
    </div>
      

      {/* Filters Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Filtros de Contratos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Fecha de inicio */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Fecha de inicio</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Fecha de fin */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Fecha de fin</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Sucursal</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sucursalFilter}
                onChange={(e) => setSucursalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Todas las sucursales</option>
                <option>Centro</option>
                <option>Norte</option>
                <option>Sur</option>
                <option>Este</option>
              </select>
            </div>
          </div>

          {/* Estado del contrato */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Estado del contrato</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Todos</option>
                <option>Activo</option>
                <option>Finalizado</option>
                <option>Próximo a vencer</option>
                <option>Cancelado</option>
              </select>
            </div>
          </div>

          {/* Tipo de contrato */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Tipo de contrato</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Todos</option>
                <option>Mensual</option>
                <option>Anual</option>
                <option>Renovado</option>
              </select>
            </div>
          </div>

          {/* Buscar */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente o número de contrato"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Aplicar Filtros
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Contratos Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <h3 className="text-gray-900">Listado de Contratos</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Cliente</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Apartamento</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Fecha de inicio</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Fecha de fin</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Monto mensual</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Depósito</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Estado</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContratos.map((contrato) => (
                <tr key={contrato.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{contrato.cliente}</div>
                      <div className="text-sm text-gray-600">{contrato.codigoContrato}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      {/* En JSX, aseguramos el manejo si split falla (aunque con los mock data no debería) */}
                      <div className="text-sm text-gray-900">{contrato.apartamento.split(' - ')[0]}</div>
                      <div className="text-sm text-gray-600">{contrato.apartamento.split(' - ')[1]}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contrato.fechaInicio}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contrato.fechaFin}</td>
                  {/* Aseguramos que toFixed(2) se use en los números */}
                  <td className="px-6 py-4 text-sm text-gray-900">{typeof contrato.montoMensual === 'number' ? contrato.montoMensual.toFixed(2) : contrato.montoMensual} US$</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{typeof contrato.deposito === 'number' ? contrato.deposito.toFixed(2) : contrato.deposito} US$</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                        contrato.estado
                      )}`}
                    >
                      {contrato.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(contrato)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(contrato)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {/* Se pueden añadir botones adicionales para Renovar y Finalizar si es necesario */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Mostrando 1-7 de 7 contratos</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {isDetailPanelOpen && selectedContrato && (
        <ContratoDetailPanel
          contrato={selectedContrato}
          onClose={() => {
            setIsDetailPanelOpen(false);
            setSelectedContrato(null);
          }}
          onEdit={(contrato) => {
            setIsDetailPanelOpen(false);
            handleEdit(contrato);
          }}
          onRenew={(contrato) => {
            setIsDetailPanelOpen(false);
            handleRenew(contrato);
          }}
          onFinalize={(contrato) => {
            setIsDetailPanelOpen(false);
            handleFinalize(contrato);
          }}
        />
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateContratoModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(contratoData) => {
            // Handle create
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedContrato && (
        <EditContratoModal
          contrato={selectedContrato}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContrato(null);
          }}
          onSave={(contratoData) => {
            // Handle edit
            setIsEditModalOpen(false);
            setSelectedContrato(null);
          }}
        />
      )}

      {/* Renew Modal */}
      {isRenewModalOpen && selectedContrato && (
        <RenewContratoModal
          contrato={selectedContrato}
          onClose={() => {
            setIsRenewModalOpen(false);
            setSelectedContrato(null);
          }}
          onRenew={(renewData) => {
            // Handle renew
            setIsRenewModalOpen(false);
            setSelectedContrato(null);
          }}
        />
      )}

      {/* Finalize Modal */}
      {isFinalizeModalOpen && selectedContrato && (
        <FinalizeContratoModal
          contrato={selectedContrato}
          onClose={() => {
            setIsFinalizeModalOpen(false);
            setSelectedContrato(null);
          }}
          onFinalize={(finalizeData) => {
            // Handle finalize
            setIsFinalizeModalOpen(false);
            setSelectedContrato(null);
          }}
        />
      )}
    </div>
  );
}