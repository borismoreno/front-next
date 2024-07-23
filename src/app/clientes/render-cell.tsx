'use client';
import { Cliente } from '@/app/clientes/columns';
import { DeleteIcon } from '@/components/icons/table/delete-icon';
import { EditIcon } from '@/components/icons/table/edit-icon';
import { Tooltip } from '@nextui-org/react';

interface Props {
    cliente: Cliente;
    columnKey: string | React.Key;
    onClick: (cliente: Cliente) => void;
    onEditClick: (clienteId: Cliente) => void;
}

export default function RenderCell({ cliente, columnKey, onClick, onEditClick }: Props) {
    const cellValue = cliente[columnKey as keyof Cliente];
    switch (columnKey) {
        // case "razonSocial":
        //     return (
        //         <User
        //             avatarProps={{
        //                 src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        //             }}
        //             name={cellValue}
        //         >
        //             {cliente.mail}
        //         </User>
        //     );
        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Editar cliente" color="secondary">
                            <button onClick={() => onEditClick(cliente)}>
                                <EditIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            content="Eliminar cliente"
                            color="danger"
                        >
                            <button
                                onClick={() => onClick(cliente)}
                            >
                                <DeleteIcon size={20} fill="#FF0080" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            );
        default:
            return cellValue;
    }
}