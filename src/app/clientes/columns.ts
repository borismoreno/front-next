export type Cliente = {
    _id: string;
    RazonSocial: string;
    NumeroIdentificacion: string;
    TipoIdentificacion: string;
    Telefono: string;
    Direccion: string;
    Mail: string;
}

export const columns = [
    {
        key: 'RazonSocial',
        label: 'Razón Social'
    },
    {
        key: 'NumeroIdentificacion',
        label: 'Número Identificación'
    },
    {
        key: 'Mail',
        label: 'Mail'
    },
    {
        key: 'actions',
        label: 'Actions'
    }
]