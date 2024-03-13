'use client';

import { useFormState, useFormStatus } from 'react-dom';
import styles from './loginform.module.css';
import { Work_Sans } from 'next/font/google';
import { Input, Button } from '@nextui-org/react';
import * as actions from '@/actions';
import { useState } from 'react';
import { EyeSlashFilledIcon } from './icons/general/EyeSlashFilledIcon';
import { EyeFilledIcon } from './icons/general/EyeFilledIcon';

const workSans = Work_Sans({
    variable: '--font-work-sans',
    subsets: ['latin']
});

export default function LoginForm() {
    const [formState, action] = useFormState(actions.Login, {
        message: '',
        errors: {}
    });
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const { pending } = useFormStatus();
    return (
        <div className={workSans.variable}>
            <div className={styles.container}>
                <form className={styles.subcontainer} action={action}>
                    <div className={styles.imgContainer}></div>
                    <div className={styles.titleContainer}>
                        <div className={styles.labelContainer}>
                            <label className={styles.label}>Factura Agil</label>
                        </div>
                    </div>
                    <div className={styles.subTitleContainer}>
                        <div className={styles.labelContainer}>
                            <label className={styles.labelSubtitle}>Bienvenido</label>
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            name='email'
                            label='Email'
                            labelPlacement='outside'
                            placeholder='user@test.com'
                            isInvalid={!!formState.errors.email}
                            errorMessage={formState.errors.email?.join(', ')}
                            autoComplete='off'
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            name='password'
                            label='Password'
                            labelPlacement='outside'
                            placeholder='Password'
                            autoComplete='off'
                            type={isVisible ? 'text' : 'password'}
                            isInvalid={!!formState.errors.password}
                            errorMessage={formState.errors.password?.join(', ')}
                            endContent={
                                <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                    ) : (
                                        <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                    )}
                                </button>
                            }
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button className={styles.button} type='submit' isDisabled={pending}>Ingresar</Button>
                    </div>
                    {formState.errors.credentials && <div className={styles.error}>{formState.errors.credentials}</div>}
                </form>
            </div>
        </div>
    )
}