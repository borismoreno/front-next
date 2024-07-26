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
import AddEditProducto from './add-edit-producto';

export default function AddProducto() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button color='primary' onPress={onOpen} endContent={<PlusIcon />}>
                Añadir Producto
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
                                Añadir Producto
                            </ModalHeader>
                            <ModalBody>
                                <AddEditProducto onCancelClick={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}