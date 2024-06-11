'use client';

import { Cliente } from '@/app/clientes/columns';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useEffect } from 'react';

interface IAddEditClienteFormProps {
    cliente?: Cliente;
    onCancelClick: () => void;
}

const tiposIdentificacion = [
    { value: '04', name: 'Ruc' },
    { value: '05', name: 'Cédula' },
    { value: '06', name: 'Pasaporte' },
    { value: '07', name: 'Consumidor Final' },
];

export default function AddEditClienteForm({ cliente, onCancelClick }: IAddEditClienteFormProps) {
    const [formState, action] = useFormState(actions.AddCliente, {
        message: '',
        errors: {},
        clienteId: cliente?.id,
    });

    useEffect(() => {
        if (formState.message === 'success') onCancelClick();
    }, [formState])

    return (
        <form action={action}>
            <Input
                label='Número de Identificación'
                name='numeroIdentificacion'
                isInvalid={!!formState.errors.numeroIdentificacion}
                errorMessage={formState.errors.numeroIdentificacion?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={cliente?.numeroIdentificacion}
            // value={cliente?.numeroIdentificacion}
            />
            <Select
                label='Tipo de identificación'
                className='max-w'
                name='tipoIdentificacion'
                isInvalid={!!formState.errors.tipoIdentificacion}
                errorMessage={formState.errors.tipoIdentificacion?.join(', ')}
                variant='bordered'
                defaultSelectedKeys={[cliente?.tipoIdentificacion || '']}
            // value={cliente?.tipoIdentificacion}
            >
                {tiposIdentificacion.map((identificacion) => (
                    <SelectItem key={identificacion.value} value={identificacion.value}>
                        {identificacion.name}
                    </SelectItem>
                ))}
            </Select>
            <Input
                label='Razón Social'
                name='razonSocial'
                isInvalid={!!formState.errors.razonSocial}
                errorMessage={formState.errors.razonSocial?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={cliente?.razonSocial}
            // value={cliente?.razonSocial}
            />
            <Input
                label='Teléfono'
                name='telefono'
                isInvalid={!!formState.errors.telefono}
                errorMessage={formState.errors.telefono?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={cliente?.telefono}
            />
            <Input
                label='Email'
                name='mail'
                isInvalid={!!formState.errors.mail}
                errorMessage={formState.errors.mail?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={cliente?.mail}
            />
            <Input
                label='Dirección'
                name='direccion'
                isInvalid={!!formState.errors.direccion}
                errorMessage={formState.errors.direccion?.join(', ')}
                autoComplete='off'
                variant='bordered'
                className='my-4'
                defaultValue={cliente?.direccion}
            />
            <div className='flex items-center justify-evenly mt-4 mb-4'>
                <Button color='danger' variant='flat' onClick={onCancelClick}>
                    Cancelar
                </Button>
                <Button color='primary' type='submit'>
                    {cliente ? 'Actualizar' : 'Añadir'}
                </Button>
            </div>
            {formState.errors.authenthication && <div className='bg-red-500 text-white w-auto inline-block text-medium leading-5 py-1 px-3 rounded-md'>{formState.errors.authenthication}</div>}
        </form>
    );
}