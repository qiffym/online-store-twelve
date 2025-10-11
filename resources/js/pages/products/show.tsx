import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, Product, Variation } from '@/types';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { type ReactElement, useEffect, useMemo, useState } from 'react';
import products from '@/routes/products';

interface Props {
    product: Product;
}

export default function Show({ product }: Props) {
    const variationMap = useMemo(
        () => (product.variations ?? {}) as Record<string, Variation[]>,
        [product.variations],
    );

    const optionsAttr1 = useMemo(
        () => Object.keys(variationMap),
        [variationMap],
    );

    const [selectedAttr1, setSelectedAttr1] = useState<string>(
        optionsAttr1[0] ?? '',
    );

    const optionsAttr2 = useMemo<Variation[]>(
        () => (selectedAttr1 ? (variationMap[selectedAttr1] ?? []) : []),
        [variationMap, selectedAttr1],
    );

    const [selectedVariation, setSelectedVariation] = useState<
        Variation | undefined
    >(optionsAttr2[0]);

    // Reset attribute 2 when attribute 1 changes
    useEffect(() => {
        setSelectedVariation(optionsAttr2[0]);
    }, [optionsAttr2]);

    return (
        <>
            <Head title={product.name} />
            <div className="px-4 py-6">

                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <div className="aspect-h-1 aspect-w-1 w-full">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                    </div>

                    <div className="mt-10 px-3 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {product.name}
                        </h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product Information</h2>
                            <p className="text-3xl tracking-tight">
                                {product.price}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div
                                className="text-base leading-relaxed text-muted-foreground"
                                dangerouslySetInnerHTML={{
                                    __html: String(product.description),
                                }}
                            />
                        </div>

                        <div className="mt-6">
                            <div className="rounded-lg bg-card p-4 text-card-foreground shadow">
                                <Field>
                                    <Label className="sr-only">
                                        Attributes
                                    </Label>

                                    {/* Row 1: Attribute 1 */}
                                    {optionsAttr1.length > 0 && (
                                        <RadioGroup
                                            value={selectedAttr1}
                                            onChange={setSelectedAttr1}
                                            className="mt-1"
                                        >
                                            <div className="flex flex-wrap gap-3">
                                                {optionsAttr1.map((attr1) => (
                                                    <Radio
                                                        key={attr1}
                                                        value={attr1}
                                                        className={cn(
                                                            'inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-xs font-medium uppercase focus:outline-none',
                                                            'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
                                                            'data-[active]:ring-2 data-[active]:ring-ring data-[active]:ring-offset-2 data-[active]:ring-offset-background',
                                                            'data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-primary-foreground hover:data-[checked]:bg-primary/90',
                                                        )}
                                                    >
                                                        <span>{attr1}</span>
                                                    </Radio>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    )}

                                    {/* Row 2: Attribute 2 */}
                                    {optionsAttr2.length > 0 && (
                                        <RadioGroup
                                            value={selectedVariation}
                                            onChange={setSelectedVariation}
                                            className="mt-3"
                                        >
                                            <div className="flex flex-wrap gap-3">
                                                {optionsAttr2.map(
                                                    (variation) => (
                                                        <Radio
                                                            key={variation.id}
                                                            value={variation}
                                                            disabled={
                                                                !variation.inStock
                                                            }
                                                            className={cn(
                                                                'inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-xs font-medium uppercase focus:outline-none',
                                                                'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
                                                                'data-[active]:ring-2 data-[active]:ring-ring data-[active]:ring-offset-2 data-[active]:ring-offset-background',
                                                                'data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-primary-foreground hover:data-[checked]:bg-primary/90',
                                                                'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
                                                            )}
                                                        >
                                                            <span>
                                                                {variation.attribute_2 ??
                                                                    String(
                                                                        variation.id,
                                                                    )}
                                                            </span>
                                                        </Radio>
                                                    ),
                                                )}
                                            </div>
                                        </RadioGroup>
                                    )}
                                </Field>
                            </div>

                            <div className="mt-10 flex sm:flex-col">
                                <button
                                    type="submit"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-border bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-full"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: ReactElement<Props>) => {
    const { product } = page.props;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: products.index().url },
        { title: product.name, href: '#' },
    ];

    return <AppLayout breadcrumbs={breadcrumbs} children={page} />
};
