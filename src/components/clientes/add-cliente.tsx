'use client';

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from '../icons/table/plus-icon';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

export default function AddCliente() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formState, action] = useFormState(actions.AddCliente, {
        message: '',
        errors: {}
    });
    useEffect(() => {
        if (formState.message === 'success' && isOpen) onOpenChange();
    }, [formState])

    return (
        <>
            <Button color='primary' onPress={onOpen} endContent={<PlusIcon />}>
                Añadir Cliente
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement='top-center'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Añadir Cliente
                            </ModalHeader>
                            <ModalBody>
                                <form action={action}>
                                    <Input
                                        label='Número de Identificación'
                                        name='numeroIdentificacion'
                                        isInvalid={!!formState.errors.numeroIdentificacion}
                                        errorMessage={formState.errors.numeroIdentificacion?.join(', ')}
                                        autoComplete='off'
                                        variant='bordered'
                                        className='my-4'
                                    />
                                    <Input
                                        label='Tipo de Identificación'
                                        name='tipoIdentificacion'
                                        isInvalid={!!formState.errors.numeroIdentificacion}
                                        errorMessage={formState.errors.numeroIdentificacion?.join(', ')}
                                        autoComplete='off'
                                        variant='bordered'
                                        className='my-4'
                                    />
                                    <Input
                                        label='Razón Social'
                                        name='razonSocial'
                                        isInvalid={!!formState.errors.razonSocial}
                                        errorMessage={formState.errors.razonSocial?.join(', ')}
                                        autoComplete='off'
                                        variant='bordered'
                                        className='my-4'
                                    />
                                    <Input
                                        label='Teléfono'
                                        name='telefono'
                                        isInvalid={!!formState.errors.telefono}
                                        errorMessage={formState.errors.telefono?.join(', ')}
                                        autoComplete='off'
                                        variant='bordered'
                                        className='my-4'
                                    />
                                    <Input
                                        label='Email'
                                        name='mail'
                                        isInvalid={!!formState.errors.mail}
                                        errorMessage={formState.errors.mail?.join(', ')}
                                        autoComplete='off'
                                        variant='bordered'
                                        className='my-4'
                                    />
                                    <Input
                                        label='Dirección'
                                        name='direccion'
                                        isInvalid={!!formState.errors.direccion}
                                        errorMessage={formState.errors.direccion?.join(', ')}
                                        autoComplete='off'
                                        variant='bordered'
                                        className='my-4'
                                    />
                                    <div className='flex items-center justify-evenly mt-4 mb-4'>
                                        <Button color='danger' variant='flat' onClick={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color='primary' type='submit'>
                                            Añadir
                                        </Button>
                                    </div>
                                    {formState.errors.authenthication && <div className='bg-red-500 text-white w-auto inline-block text-medium leading-5 py-1 px-3 rounded-md'>{formState.errors.authenthication}</div>}
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}