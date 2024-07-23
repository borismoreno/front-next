'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
    const { pending } = useFormStatus();

    return <Button type='submit' className='bg-blue-500 text-white disabled:bg-red-400' disabled={pending}>{pending ? 'Ingresando...' : 'Ingresar'}</Button>
}