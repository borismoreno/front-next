import { Producto } from "../../types";
import { DeleteIcon } from '@/components/icons/table/delete-icon';
import { EditIcon } from '@/components/icons/table/edit-icon';
import { Tooltip } from '@nextui-org/react';

interface Props {
    producto: Producto;
    columnKey: string | React.Key;
    onClick: (producto: Producto) => void;
    onEditClick: (productoId: Producto) => void;
}
export default function RenderProductoCell({ producto, columnKey, onClick, onEditClick }: Props) {
    const cellValue = producto[columnKey as keyof Producto];
    switch (columnKey) {
        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Editar producto" color="secondary">
                            <button onClick={() => onEditClick(producto)}>
                                <EditIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            content="Eliminar producto"
                            color="danger"
                        >
                            <button
                                onClick={() => onClick(producto)}
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