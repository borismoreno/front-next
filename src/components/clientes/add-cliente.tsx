'use client';

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from '../icons/table/plus-icon';
import AddEditClienteForm from './addEditClienteForm';

export default function AddCliente() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                <AddEditClienteForm onCancelClick={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}