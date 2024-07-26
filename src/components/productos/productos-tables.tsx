'use client';

import { Producto, productoColumns } from '@/types';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableCell,
    TableRow,
    Pagination,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { SearchIcon } from '../icons/table/search-icon';
import * as actions from '@/actions';
import Confirm from '../modal/Modal';
import RenderProductoCell from '@/app/productos/render-producto-cell';
import AddProducto from './add-producto';
import AddEditProducto from './add-edit-producto';

interface IProductosTableProps {
    productos: Producto[];
}

export default function ProductosTable({ productos }: IProductosTableProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [filterValue, setFilterValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoDelete, setProductoDelete] = useState<Producto | null>(null);
    const [productoEditar, setProductoEditar] = useState<Producto | undefined>(undefined);
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredProductos = [...productos];

        if (hasSearchFilter) {
            filteredProductos = filteredProductos.filter(producto => {
                return producto.descripcion.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) ||
                    producto.codigoPrincipal?.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) ||
                    producto.codigoAuxiliar?.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
            });
        }

        return filteredProductos;
    }, [productos, filterValue, hasSearchFilter]);

    const [page, setPage] = useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const handleClick = (producto: Producto) => {
        setIsModalOpen(true);
        setProductoDelete(producto);
    }

    const handleEditClick = (producto: Producto) => {
        setProductoEditar(producto);
        onOpen();
    }

    const handleConfirm = async () => {
        if (productoDelete?._id) {
            const res = await actions.DeleteProducto(productoDelete?._id);
            console.log(res.success);
        }
        setIsModalOpen(false);
    }

    const handleCancelClick = () => {
        setProductoEditar(undefined);
    }

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex items-end justify-between gap-3'>
                    <Input
                        isClearable
                        className='w-full sm:max-w-[44%]'
                        placeholder='Buscar por nombre, número de identificación o mail...'
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className='flex gap-3'>
                        <AddProducto />
                    </div>
                </div>
            </div>
        );
    }, [filterValue, onSearchChange, onClear])

    return (
        <div className='w-full flex flex-col gap-4'>
            {productoDelete && <Confirm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={`Seguro que desea eliminar el producto ${productoDelete.codigoPrincipal}?`} onConfirm={handleConfirm} />}
            <Table
                aria-label='Tabla de productos'
                topContent={topContent}
                topContentPlacement='outside'
                bottomContentPlacement='outside'
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader columns={productoColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            hideHeader={column.key === 'actions'}
                            align={column.key === 'actions' ? 'center' : 'start'}
                        >{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items} emptyContent={"No hay productos para mostrar."}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{RenderProductoCell({ producto: item, columnKey: columnKey, onClick: handleClick, onEditClick: handleEditClick })}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {productoEditar && (
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement='top-center'
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>
                                    Editar Producto
                                </ModalHeader>
                                <ModalBody>
                                    <AddEditProducto onCancelClick={handleCancelClick} producto={productoEditar} />
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
}