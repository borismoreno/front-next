'use server';

import * as auth from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: 'Email inválido' }),
    password: z
        .string()
        .trim()
        .min(8, { message: 'Password debe tener al menos 8 caracteres' }),
});

interface LoginFormState {
    message: string,
    errors: {
        email?: string[],
        password?: string[],
        credentials?: string[],
        unknown?: string[],
    }
}

export async function Login(formState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    try {
        const result = loginSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        if (!result.success) {
            return {
                message: 'validation error',
                errors: result.error.flatten().fieldErrors,
            };
        }

        await auth.signIn('credentials', formData);

        return {
            message: 'success',
            errors: {}
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'credentials error',
                        errors: {
                            credentials: ['Email o password incorrectos'],
                        },
                    };
                default:
                    return {
                        message: 'unknown error',
                        errors: {
                            unknown: ['unknown error'],
                        },
                    };
            }
        }
        throw error;
    }
}

export async function Logout() {
    await auth.signOut();
}