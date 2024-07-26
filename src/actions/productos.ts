'use server';

const rootApi = process.env.NEXT_PUBLIC_API_URL;

import { auth } from '@/auth';
import { IGenericResponse } from '@/models/general';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const addProductoSchema = z.object({
    descripcion: z
        .string()
        .trim()
        .min(5, { message: 'Descripción debe tener al menos 5 caracteres.' }),
    codigoPrincipal: z
        .string()
        .trim()
        .min(2, { message: 'Código Principal debe tener al menos 2 caracteres.' }),
    codigoAuxiliar: z
        .string()
        .nullable(),
    tipoProducto: z
        .string()
        .trim()
        .min(1, { message: 'Debe seleccionar el tipo de producto.' }),
    tarifaIva: z
        .string()
        .trim()
        .min(1, { message: 'Debe seleccionar la tarifa IVA.' }),
    valorUnitario: z
        .string()
        .min(1, { message: 'Valor unitario debe ser mayor a cero.' })
        .refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Error"
        })
});

export async function GetProductos(): Promise<any> {
    const session = await auth();

    if (session?.user) {
        const res = await fetch(`${rootApi}/api/producto`, {
            method: 'GET',
            headers: {
                //@ts-ignore
                'Authorization': `Bearer ${session.user.token}`
            },
        });
        if (res.status === 401) return null;
        if (res.status === 200) {
            const productos = await res.json();
            return productos;
        }
        return null;
    }
}

interface AddProductoFormState {
    message: string;
    errors: {
        descripcion?: string[],
        codigoPrincipal?: string[],
        codigoAuxiliar?: string[],
        tipoProducto?: string[],
        tarifaIva?: string[],
        valorUnitario?: string[],
        authenthication?: string[],
    }
    productoId: string | undefined;
}

export async function AddProducto(formState: AddProductoFormState, formData: FormData): Promise<AddProductoFormState> {
    const session = await auth();
    try {
        const result = addProductoSchema.safeParse({
            descripcion: formData.get('descripcion'),
            codigoPrincipal: formData.get('codigoPrincipal'),
            codigoAuxiliar: formData.get('codigoAuxiliar'),
            tipoProducto: formData.get('tipoProducto'),
            tarifaIva: formData.get('tarifaIva'),
            valorUnitario: formData.get('valorUnitario'),
        });

        if (!result.success) {
            return {
                message: 'validation error',
                errors: result.error.flatten().fieldErrors,
                productoId: ''
            };
        }

        const befff = JSON.stringify({
            descripcion: result.data.descripcion,
            codigoPrincipal: result.data.codigoPrincipal,
            codigoAuxiliar: result.data.codigoAuxiliar,
            tipoProducto: result.data.tipoProducto,
            tarifaIva: result.data.tarifaIva,
            valorUnitario: Number(result.data.valorUnitario)
        })

        console.log('before send', befff)
        if (session?.user) {
            const endpoint = `${rootApi}/api/producto${formState.productoId ? `/${formState.productoId}` : ''}`
            const res = await fetch(endpoint, {
                method: `${formState.productoId ? 'PUT' : 'POST'}`,
                body: JSON.stringify({
                    descripcion: result.data.descripcion,
                    codigoPrincipal: result.data.codigoPrincipal,
                    codigoAuxiliar: result.data.codigoAuxiliar,
                    tipoProducto: result.data.tipoProducto,
                    tarifaIva: result.data.tarifaIva,
                    valorUnitario: Number(result.data.valorUnitario)
                }),
                headers: {
                    //@ts-ignore
                    'Authorization': `Bearer ${session.user.token}`,
                    'Content-Type': 'application/json',
                }
            });

            const respuesta = await res.json();
            if (respuesta.success) {
                revalidatePath('/productos');
                return {
                    message: 'success',
                    errors: {},
                    productoId: ''
                }
            }
            if (respuesta.errorMessage) {
                return {
                    message: 'error',
                    errors: { authenthication: [respuesta.errorMessage] },
                    productoId: ''
                }
            }
            if (respuesta.errorMessage) {
                return {
                    message: 'error',
                    errors: { authenthication: [respuesta.errorMessage] },
                    productoId: ''
                }
            }
        }

        return {
            message: 'error',
            errors: {
                authenthication: ['Error al añadir el producto']
            },
            productoId: ''
        }
    } catch (error) {
        throw error;
    }
}

export async function DeleteProducto(productoId: string): Promise<IGenericResponse> {
    const session = await auth();

    if (session?.user) {
        const res = await fetch(`${rootApi}/api/producto/${productoId}`, {
            method: 'DELETE',
            headers: {
                //@ts-ignore
                'Authorization': `Bearer ${session.user.token}`
            },
        });
        if (res.status === 401) return { success: false, message: 'Unauthorized' };
        if (res.status === 200) {
            const user = await res.json() as IGenericResponse;
            revalidatePath('/productos');
            return user;
        }
        return { success: false };
    }
    return { success: false };
}