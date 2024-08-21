import React, {ReactNode, SetStateAction} from "react";

export interface RectFcChildren {
    children: ReactNode;
}

export interface BannerProps {
    id: number;
    category_id: string;
    src: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryProps {
    id: number;
    banners: BannerProps[]
    template: "custom" | "default";
    title: string;
    slug: string;
    parent_id: number | null;
    image: string | null;
    created_at: string;
    updated_at: string;
    children: CategoryProps[];
}

export interface ColorType {
    id: number;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
    pivot: {
        product_id: number;
        color_id: number;
    };
}

export interface SizeType {
    id: number;
    size: string;
    created_at: string;
    updated_at: string;
    pivot: {
        product_id: number;
        size_id: number;
    };
}

export interface ImageType {
    id: number;
    src: string;
    product_id: number;
    created_at: string;
    updated_at: string;
}

export interface AttributeType {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    pivot: {
        product_id: number;
        attribute_id: number;
    };
}

export interface PaginationType {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
}

export interface ProductType {
    id: number;
    template: "single" | "collection";
    title: string;
    parent_id: number | null;
    description: string;
    maintenance: string;
    slug: string;
    discount: string;
    price: string;
    created_at: string;
    updated_at: string;
    pivot: {
        category_id: number;
        product_id: number;
    };
    attributes: AttributeType[];
    colors: ColorType[];
    sizes: SizeType[];
    images: ImageType[];
    children: ProductType[]
}

export interface UserType {
    id: number;
    name: string;
    phone: string;
    phone_verified_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface LoginProps {
    email: string;
    password: string;
    setErrors: (errors: Record<string, string[]>) => void;
    setStatus: (status: string | null) => void;
}

export interface RegisterProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: Record<string, string[]>) => void;
}

export interface AuthProps {
    middleware?: "guest" | "auth";
    redirectIfAuthenticated?: string;
}