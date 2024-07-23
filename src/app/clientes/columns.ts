export type Cliente = {
    id: string;
    razonSocial: string;
    numeroIdentificacion: string;
    tipoIdentificacion: string;
    telefono: string;
    direccion: string;
    mail: string;
}

export const columns = [
    {
        key: 'razonSocial',
        label: 'Razón Social'
    },
    {
        key: 'numeroIdentificacion',
        label: 'Número Identificación'
    },
    {
        key: 'mail',
        label: 'Mail'
    },
    {
        key: 'actions',
        label: 'Actions'
    }
]