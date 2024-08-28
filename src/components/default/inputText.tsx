import {forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes} from 'react';

export default forwardRef(function InputText(
    {type = 'text', className = '', id, isFocused = false, label, ...props}: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean,label:string },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className={'relative z-0 w-full mb-5'}>
            <input
                {...props}
                type={type}
                id={id}
                placeholder={''}
                className={
                    ' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ' +
                    className
                }
                ref={localRef}
            />
            {label && <label htmlFor={id}
                             className="absolute text-sm text-gray-500 duration-300 transform scale-90 top-3 -z-10 origin-[0] peer-valid:start-0 peer-valid:scale-75  peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-valid:translate-x-1/4 peer-valid:-translate-y-6 ">{label}</label>}
        </div>
    );
});