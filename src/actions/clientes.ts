'use server';

const rootApi = process.env.NEXT_PUBLIC_API_URL;

import { auth } from '@/auth';
import { IGenericResponse } from '@/models/general';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const addClienteSchema = z.object({
    numeroIdentificacion: z
        .string()
        .trim()
        .min(5, { message: 'Número de identificación debe tener al menos 5 caracteres.' }),
    tipoIdentificacion: z
        .string()
        .trim()
        .min(2, { message: 'Tipo de identificación debe tener al menos 2 caracteres.' }),
    razonSocial: z
        .string()
        .trim()
        .min(10, { message: 'Razón Social debe tener al menos 10 caracteres.' }),
    telefono: z
        .string()
        .trim()
        .min(6, { message: 'Teléfono debe tener al menos 6 caracteres.' }),
    mail: z
        .string()
        .trim()
        .email({ message: 'Email inválido' }),
    direccion: z
        .string()
        .trim()
        .min(10, { message: 'Dirección debe tener al menos 10 caracteres.' }),
});

interface AddClienteFormState {
    message: string;
    errors: {
        numeroIdentificacion?: string[],
        tipoIdentificacion?: string[],
        razonSocial?: string[],
        telefono?: string[],
        mail?: string[],
        direccion?: string[],
        authenthication?: string[],
    }
}

export async function AddCliente(formState: AddClienteFormState, formData: FormData): Promise<AddClienteFormState> {
    const session = await auth();
    try {
        const result = addClienteSchema.safeParse({
            numeroIdentificacion: formData.get('numeroIdentificacion'),
            tipoIdentificacion: formData.get('tipoIdentificacion'),
            razonSocial: formData.get('razonSocial'),
            telefono: formData.get('telefono'),
            mail: formData.get('mail'),
            direccion: formData.get('direccion'),
        });

        if (!result.success) {
            return {
                message: 'validation error',
                errors: result.error.flatten().fieldErrors,
            };
        }

        if (session?.user) {
            const res = await fetch(`${rootApi}/api/cliente`, {
                method: 'POST',
                body: JSON.stringify({
                    razonSocial: result.data.razonSocial,
                    tipoIdentificacion: result.data.tipoIdentificacion,
                    numeroIdentificacion: result.data.numeroIdentificacion,
                    telefono: result.data.telefono,
                    mail: result.data.mail,
                    direccion: result.data.direccion
                }),
                headers: {
                    //@ts-ignore
                    'Authorization': `Bearer ${session.user.token}`,
                    'Content-Type': 'application/json',
                }
            });

            const respuesta = await res.json();
            if (respuesta.success) {
                revalidatePath('/clientes');
                return {
                    message: 'success',
                    errors: {}
                }
            }
            if (respuesta.errorMessage) {
                return {
                    message: 'error',
                    errors: { authenthication: [respuesta.errorMessage] }
                }
            }
        }

        return {
            message: 'error',
            errors: {
                authenthication: ['Error al añadir el cliente']
            }
        }
    } catch (error) {
        throw error;
    }
}

export async function GetClientes(): Promise<any> {
    const session = await auth();

    if (session?.user) {
        const res = await fetch(`${rootApi}/api/cliente`, {
            method: 'GET',
            headers: {
                //@ts-ignore
                'Authorization': `Bearer ${session.user.token}`
            },
        });
        if (res.status === 401) return null;
        if (res.status === 200) {
            const user = await res.json();
            return user;
        }
        return null;
    }
}

export async function DeleteCliente(clienteId: string): Promise<IGenericResponse> {
    const session = await auth();

    if (session?.user) {
        const res = await fetch(`${rootApi}/api/cliente?clienteId=${clienteId}`, {
            method: 'DELETE',
            headers: {
                //@ts-ignore
                'Authorization': `Bearer ${session.user.token}`
            },
        });
        if (res.status === 401) return { success: false, message: 'Unauthorized' };
        if (res.status === 200) {
            const user = await res.json() as IGenericResponse;
            revalidatePath('/clientes');
            return user;
        }
        return { success: false };
    }
    return { success: false };
}