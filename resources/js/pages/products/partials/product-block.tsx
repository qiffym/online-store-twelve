import { Product } from '@/types';

interface Props {
    product: Product;
}

export default function ProductBlock({ product }: Props) {
    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 lg:aspect-none min-h-80 w-full overflow-hidden rounded-md bg-muted group-hover:opacity-75 lg:h-80">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-foreground">
                        <a href={product.href}>
                            <span
                                aria-hidden="true"
                                className="absolute inset-0"
                            />
                            {product.name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {product.category?.name}
                    </p>
                </div>

                <p className="text-sm font-medium text-foreground">
                    {product.price}
                </p>
            </div>
        </div>
    );
}
