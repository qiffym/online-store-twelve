import Layout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Cart } from '@/types';
import { ReactNode } from 'react';
import CartEmpty from '@/pages/cart/partials/cart-empty';
import Heading from '@/components/heading';
import CartBlock from '@/pages/cart/partials/cart-block';
import OrderSummary from '@/pages/cart/partials/order-summary';

type Props = {
    carts: Cart[]
}
export default function Index({carts}: Props) {
    return (
        <>
            <Head title="Shopping Cart" />
            <div className="px-4 py-6">
                <Heading title='Shopping Cart' />
                {carts.length > 0 ? (
                    <>
                        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <section className="lg:col-span-7" aria-labelledby='cart-heading'>
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your shopping cart
                                </h2>

                                <ul role="list" className="divide-y divide-muted border-b border-t border-muted">
                                    {carts.map((cart, idx) => (
                                        <CartBlock key={idx} cart={cart} />
                                    ))}
                                </ul>
                            </section>

                            <OrderSummary />
                        </div>
                    </>
                ) : (
                    <CartEmpty />
                )}
            </div>

        </>
    )
}

Index.layout = (page: ReactNode) => <Layout children={page} />
