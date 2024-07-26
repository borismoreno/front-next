export interface Producto {
    _id: string;
    codigoPrincipal?: string;
    codigoAuxiliar?: string;
    descripcion: string;
    tarifaIva: string;
    tipoProducto: string;
    valorUnitario: number;
}

export const productoColumns = [
    {
        key: 'codigoPrincipal',
        label: 'Código Principal'
    },
    {
        key: 'codigoAuxiliar',
        label: 'Código Auxiliar'
    },
    {
        key: 'descripcion',
        label: 'Descripción'
    },
    {
        key: 'valorUnitario',
        label: 'Valor Unitario'
    },
    {
        key: 'actions',
        label: 'Actions'
    }
]