import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '#',
    },
];
export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="px-4 py-6">
                <Heading
                    title="Welcome to Online Store Twelve"
                    description="Your one-stop shop for all your needs!"
                />
            </div>
        </>
    );
}

Home.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
