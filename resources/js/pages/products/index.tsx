import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import ProductBlock from '@/pages/products/partials/product-block';
import { Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface ProductsPayload {
    data: Product[];
    meta: Record<string, string | boolean | number>;
    links: Record<string, string | null>;
}

type PageProps = {
    title: string;
    products: ProductsPayload;
};

export default function Index() {
    const { title, products } = usePage<PageProps>().props;
    const { data, meta, links } = products;

    return (
        <>
            <Head title="index" />
            <div className="px-4 py-6">
                <Heading title={title} />

                <h2 className='font-bold tracking-tight text-2xl'>Trending Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product) => (
                        <ProductBlock product={product} key={product.id} />
                    ))}
                </div>

                {meta.has_pages && (
                    <div className="mt-10 flex items-center justify-center">
                        <Pagination links={links} />
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <AppLayout children={page} />;
