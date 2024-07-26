'use client';

import { Producto } from '@/types';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useEffect } from 'react';

interface IAddEditProductoProps {
    producto?: Producto;
    onCancelClick: () => void;
}

const tiposProducto = [
    { value: 'B', name: 'Bien' },
    { value: 'S', name: 'Servicio' },
];

const tarifasIva = [
    { value: '0', name: '0%' },
    { value: '4', name: '15%' },
    { value: '6', name: 'No Objeto de Impuesto' },
    { value: '7', name: 'Excento de IVA' },
];

export default function AddEditProducto({ producto, onCancelClick }: IAddEditProductoProps) {
    const [formState, action] = useFormState(actions.AddProducto, {
        message: '',
        errors: {},
        productoId: producto?._id,
    });

    useEffect(() => {
        if (formState.message === 'success') onCancelClick();
    }, [formState]);

    return (
        <form action={action}>
            <Input
                label='Descripción'
                name='descripcion'
                isInvalid={!!formState.errors.descripcion}
                errorMessage={formState.errors.descripcion?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={producto?.descripcion}
            // value={cliente?.numeroIdentificacion}
            />
            <Input
                label='Código Principal'
                name='codigoPrincipal'
                isInvalid={!!formState.errors.codigoPrincipal}
                errorMessage={formState.errors.codigoPrincipal?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={producto?.codigoPrincipal}
            // value={cliente?.numeroIdentificacion}
            />
            <Input
                label='Código Auxiliar'
                name='codigoAuxiliar'
                isInvalid={!!formState.errors.codigoAuxiliar}
                errorMessage={formState.errors.codigoAuxiliar?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={producto?.codigoAuxiliar}
            // value={cliente?.numeroIdentificacion}
            />
            <Select
                label='Tipo Producto'
                className='max-w'
                name='tipoProducto'
                isInvalid={!!formState.errors.tipoProducto}
                errorMessage={formState.errors.tipoProducto?.join(', ')}
                variant='bordered'
                defaultSelectedKeys={[producto?.tipoProducto || '']}
            // value={cliente?.tipoIdentificacion}
            >
                {tiposProducto.map((tipoProducto) => (
                    <SelectItem key={tipoProducto.value} value={tipoProducto.value}>
                        {tipoProducto.name}
                    </SelectItem>
                ))}
            </Select>
            <Select
                label='Tarifa IVA'
                className='max-w mt-4'
                name='tarifaIva'
                isInvalid={!!formState.errors.tarifaIva}
                errorMessage={formState.errors.tarifaIva?.join(', ')}
                variant='bordered'
                defaultSelectedKeys={[producto?.tarifaIva || '']}
            // value={cliente?.tipoIdentificacion}
            >
                {tarifasIva.map((tarifaIva) => (
                    <SelectItem key={tarifaIva.value} value={tarifaIva.value}>
                        {tarifaIva.name}
                    </SelectItem>
                ))}
            </Select>
            <Input
                label='Valor Unitario'
                name='valorUnitario'
                isInvalid={!!formState.errors.valorUnitario}
                errorMessage={formState.errors.valorUnitario?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                type='number'
                defaultValue={producto?.valorUnitario.toFixed(2)}
            // value={cliente?.razonSocial}
            />
            <div className='flex items-center justify-evenly mt-4 mb-4'>
                <Button color='danger' variant='flat' onClick={onCancelClick}>
                    Cancelar
                </Button>
                <Button color='primary' type='submit'>
                    {producto ? 'Actualizar' : 'Añadir'}
                </Button>
            </div>
            {formState.errors.authenthication && <div className='bg-red-500 text-white w-auto inline-block text-medium leading-5 py-1 px-3 rounded-md'>{formState.errors.authenthication}</div>}
        </form>
    );
}