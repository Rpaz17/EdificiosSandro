import { X, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

/**Componente para detalle generico solo incluye header y footer */

export function Detalle({
  title,
  description,
  children,
  onClose,
  onConfirmButton,
  onEditButton,
  onDeleteButton,
  viewOnly, // Por si solo se quiere tener el boton de cerrar
}) {
  return (
    <div
      className=" fixed backdrop-blur-sm
 inset-0 z-40 bg-black/20"
      onClick={onClose}
    >
      <div
        className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto 
      "
        onClick={(e) => e.stopPropagation()}
      >
        {/**Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Detalle del {title}</h2>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/**Content */}
        <div className="p-6 space-y-6">
          <div>{children}</div>

          {/**footer */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            {!viewOnly && (
              <>
                {/**Boton para editar */}
                {onEditButton && (
                  <Button
                    variant="default"
                    onClick={onEditButton.onClick}
                    className="w-full px-4 py-3"
                  >
                    {onEditButton.icon}
                    {onEditButton.label}
                  </Button>
                )}

                {/**Boton para validar/confirmar*/}
                {onConfirmButton && (
                  <Button
                    variant="confirmation"
                    onClick={() => {
                      setConfirmDialog({ isOpen: true, type: "validate" });
                      onConfirmButton?.onClick(); // call the function safely
                    }}
                    className="w-full px-4 py-3"
                  >
                    {onConfirmButton.icon} {onConfirmButton.label}
                  </Button>
                )}

                {/**Boton para rechazar/eliminar */}
                <Button
                  variant="danger"
                  onClick={onDeleteButton.onClick}
                  className="w-full px-4 py-3"
                >
                  {onDeleteButton.icon} {onDeleteButton.label}
                </Button>
              </>
            )}
            <Button
              variant="close"
              onClick={onClose}
              className="w-full px-4 py-3"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
