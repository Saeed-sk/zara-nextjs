import React from "react";

export function LoaderSm() {
    return (
        <section className={"h-6 aspect-square mx-auto"}>
            <div className="flex w-full h-full items-center justify-center gap-0.5 my-2">
                <span className="loader-1 h-full w-1/3 border-2 border-black"></span>
                <span className="loader-2 h-full w-1/3 border-2 border-black"></span>
                <span className="loader-3 h-full w-1/3 border-2 border-black"></span>
            </div>
        </section>
    )
}

export function LoaderMd() {
    return (
        <section className={"h-16 aspect-square mx-auto"}>
            <div className="flex w-full h-full items-center justify-center gap-0.5 my-2">
                <span className="loader-1 h-full w-1/3 border-2 border-black"></span>
                <span className="loader-2 h-full w-1/3 border-2 border-black"></span>
                <span className="loader-3 h-full w-1/3 border-2 border-black"></span>
            </div>
        </section>
    )
}

export function LoaderLg() {
    return (
        <section className={"h-24 aspect-square mx-auto"}>
            <div className="flex w-full h-full items-center justify-center gap-0.5 my-2">
                <span className="loader-1 h-full w-1/3 border-2 border-black"></span>
                <span className="loader-2 h-full w-1/3 border-2 border-black"></span>
                <span className="loader-3 h-full w-1/3 border-2 border-black"></span>
            </div>
        </section>
    )
}