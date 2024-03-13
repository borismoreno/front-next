'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

interface ConfirmProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

export default function Confirm({ isOpen, onClose, message, onConfirm }: ConfirmProps) {
    return (
        <div className='flex flex-wrap gap-3'>
            <Modal isOpen={isOpen} placement='top-center'>
                <ModalContent>
                    <>
                        <ModalHeader className='flex flex-col gap-1'>Eliminar Cliente</ModalHeader>
                        <ModalBody>
                            {message}
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' variant='flat' onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color='primary' onPress={onConfirm}>
                                Aceptar
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
}