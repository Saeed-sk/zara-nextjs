'use client'
import Link from 'next/link'
import {useAuth} from '@/hooks/auth'
import {FormEvent, useEffect, useState} from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import InputText from "@/components/default/inputText";
import {BtnPrimary} from "@/components/default/buttons";
import {ErrorInputText} from '@/components/default/ErrorInputText'
import {useRouter, useSearchParams} from "next/navigation";

const Login = () => {
    const router = useRouter();
    const {login} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });
    const searchParams = useSearchParams();
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [shouldRemember, setShouldRemember] = useState<boolean>(true);
    const [errors, setErrors] = useState<any>({});
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const resetParam = searchParams.get("reset");

        if (resetParam && resetParam.length > 0 && errors.length === 0) {
            setStatus(atob(resetParam));
        } else {
            setStatus('');
        }
    }, [searchParams, errors.length]);

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        login({
            phone,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus
        }).then(() => setLoading(false));

    };

    return (
        <div className="w-full h-full">
            <AuthSessionStatus className="mb-4" status={status}/>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center p-12 md:p-0">
                <form className="md:p-20 lg:p-36" onSubmit={submitForm}>
                    <div>
                        <InputText
                            id="phone"
                            type="text"
                            label={"شماره تماس"}
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                            required
                        />
                        {errors?.phone && <ErrorInputText messages={errors.phone} className="mt-2"/>}
                    </div>

                    <div className="mt-4">
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                            label="رمز عبور"
                        />
                        {errors?.password && <ErrorInputText messages={errors.password} className="mt-2"/>}
                    </div>

                    {/* Remember Me Checkbox */}
                    {/* <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />
                            <span className="mr-1 text-sm text-gray-600">
                                مرا به خاطر بسپار
                            </span>
                        </label>
                    </div> */}

                    <div className="flex flex-col justify-end w-full gap-10 mt-10">
                        <BtnPrimary disabled={loading} type="submit" className="ml-3 w-full justify-center">
                            {loading ? "در حال ورود..." : "ورود"}
                        </BtnPrimary>
                    </div>
                </form>
                <div className="flex flex-col gap-10 mt-6 md:p-20 lg:p-36">
                    <h4 className="w-full">به اکانت نیاز دارید ؟</h4>
                    <Link href="/register">
                        <BtnPrimary className="w-full justify-center">
                            ثبت نام
                        </BtnPrimary>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
