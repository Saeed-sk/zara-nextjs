import React, { Suspense } from 'react';
import {LoginCmp} from "@/components/auth/login";

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LoginCmp />
    </Suspense>
);

export default Page;