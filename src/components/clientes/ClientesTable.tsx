'use client';
import { Cliente, columns } from '@/app/clientes/columns';
import RenderCell from '@/app/clientes/render-cell';
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
import Confirm from '../modal/Modal';
import * as actions from '@/actions';
import AddCliente from './add-cliente';
import AddEditClienteForm from './addEditClienteForm';

export type ClientesTableProps = {
    clientes: Cliente[];
}


export default function ClientesTable({ clientes }: ClientesTableProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [filterValue, setFilterValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteDelete, setClienteDelete] = useState<Cliente | null>(null);
    const [clienteEditar, setClienteEditar] = useState<Cliente | undefined>(undefined);
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredClientes = [...clientes];

        if (hasSearchFilter) {
            filteredClientes = filteredClientes.filter(cliente => {
                return cliente.RazonSocial.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) ||
                    cliente.Mail.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) ||
                    cliente.NumeroIdentificacion.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
            });
        }

        return filteredClientes;
    }, [clientes, filterValue, hasSearchFilter])

    const [page, setPage] = useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

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

    const handleClick = (cliente: Cliente) => {
        setIsModalOpen(true);
        setClienteDelete(cliente);
    }

    const handleEditClick = (cliente: Cliente) => {
        setClienteEditar(cliente);
        onOpen();
    }

    const handleConfirm = async () => {
        if (clienteDelete?._id) {
            const res = await actions.DeleteCliente(clienteDelete?._id);
            console.log(res.success);
        }
        setIsModalOpen(false);
    }

    const handleCancelClick = () => {
        setClienteEditar(undefined);
    }

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
                        <AddCliente />
                    </div>
                </div>
            </div>
        );
    }, [filterValue, onSearchChange, onClear])

    return (
        <div className='w-full flex flex-col gap-4'>
            {clienteDelete && <Confirm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={`Seguro que desea eliminar el cliente ${clienteDelete.RazonSocial}?`} onConfirm={handleConfirm} />}
            <Table
                aria-label='Tabla de clientes'
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
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            hideHeader={column.key === 'actions'}
                            align={column.key === 'actions' ? 'center' : 'start'}
                        >{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items} emptyContent={"No hay clientes para mostrar."}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{RenderCell({ cliente: item, columnKey: columnKey, onClick: handleClick, onEditClick: handleEditClick })}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {clienteEditar && (
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement='top-center'
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>
                                    Editar Cliente
                                </ModalHeader>
                                <ModalBody>
                                    <AddEditClienteForm onCancelClick={handleCancelClick} cliente={clienteEditar} />
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}