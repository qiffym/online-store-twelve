import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Cart } from '@/types';
import carts from '@/routes/carts';
import { CircleCheckBig, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    cart: Cart;
}
export default function CartBlock({ cart }: Props) {
    function updateQuantity(value: string, cart: Cart) {
        router.put(carts.update(cart), { quantity: Number(value) }, { preserveScroll: true });
    }

    return (
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <img
                    src={cart.variation.product.imageSrc}
                    alt={cart.variation.product.imageAlt}
                    className="h-16 w-16 rounded-md object-cover object-center lg:h-24 lg:w-24"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <a
                                    href={cart.variation.product.href}
                                    className="font-medium text-foreground hover:text-primary"
                                >
                                    {cart.variation.product.name}
                                </a>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-muted-foreground">
                                <span>{cart.variation.attribute_1}</span>
                                <span className="mx-2"></span>
                                <span>{cart.variation.attribute_2}</span>
                            </p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-foreground">
                            {cart.variation.price}
                        </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <Select
                            value={String(cart.quantity)}
                            onValueChange={(val) => updateQuantity(val, cart)}
                        >
                            <SelectTrigger className="w-20 max-w-full">
                                <SelectValue placeholder="Quantity" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                                <SelectGroup>
                                    <SelectLabel className='sr-only'>Quantity, {cart.variation.product.name}</SelectLabel>
                                    {Array.from(
                                        { length: cart.variation.stock },
                                        (_, i) => i + 1,
                                    ).map((quantity) => (
                                        <SelectItem
                                            key={quantity}
                                            value={String(quantity)}
                                        >
                                            {quantity}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="absolute top-0 right-0">
                            <Link
                                href={carts.destroy(cart)}
                                method="delete"
                                as="button"
                                className="-m-2 inline-flex p-2 text-muted-foreground hover:text-primary"
                            >
                                <span className="sr-only">Remove</span>
                                <X className="size-5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-4 flex space-x-2 text-sm text-muted-foreground">
                    {cart.variation.inStock ? (
                        <CircleCheckBig
                            className="size-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                        />
                    ) : (
                        <CircleCheckBig
                            className="size-5 flex-shrink-0 text-orange-500"
                            aria-hidden="true"
                        />
                    )}

                    <span>
                        {cart.variation.inStock ? 'In stock' : 'Low stock'}
                    </span>
                </p>
            </div>
        </li>
    );
}
