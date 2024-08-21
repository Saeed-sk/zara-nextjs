'use client'

import InputError from '@/components/default/InputError'
import { useAuth } from '@/hooks/auth'
import { useState, ChangeEvent, FormEvent } from 'react'
import InputText from "@/components/default/inputText";
import { BtnPrimary } from "@/components/default/buttons";
import { ErrorsType } from '@/types';

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [errors, setErrors] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true)
        register({
            remember: false,
            name,
            phone,
            password,
            password_confirmation: passwordConfirmation,
            setErrors
        }).then(()=>{setLoading(false)});
    };

    return (
        <section className={'grid grid-cols-1 md:grid-cols-3 py-10 px-20'}>
            <form className={'md:col-start-3'} onSubmit={submitForm}>

                <div>
                    <InputText
                        id="name"
                        type="text"
                        label="نام"
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                        required
                    />
                    {errors?.name && <InputError messages={errors.name} className="mt-2" />}
                </div>


                {/* Phone Address */}
                <div className="mt-4">
                    <InputText
                        id="phone"
                        type="text"
                        label="شماره تماس"
                        value={phone}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPhone(event.target.value)}
                        required
                    />
                    {errors?.phone && <InputError messages={errors.phone} className="mt-2" />}
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputText
                        id="password"
                        type="password"
                        label="رمز عبور"
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        required
                    />
                    {errors?.password && <InputError messages={errors.password} className="mt-2" />}
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputText
                        id="passwordConfirmation"
                        type="password"
                        label="تکرار رمز عبور"
                        value={passwordConfirmation}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}
                        required
                    />
                    {errors?.password_confirmation && <InputError messages={errors.password_confirmation} className="mt-2" />}
                </div>

                <BtnPrimary disabled={loading} className="w-full justify-center" type="submit">
                    {loading ? "در حال ثبت نام" : "ثبت نام"}
                </BtnPrimary>
            </form>
        </section>
    );
};

export default Page;
