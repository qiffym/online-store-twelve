import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import products from '@/routes/products';
import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

export default function CartEmpty() {
    return (
        <Empty className="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
            <EmptyHeader>
                <EmptyMedia
                    variant="icon"
                    className="animate-pulse rounded-full p-10"
                >
                    <ShoppingCart className="size-10" />
                </EmptyMedia>
                <EmptyTitle>Your cart is empty</EmptyTitle>
                <EmptyDescription>
                    Biscuit oat cake wafer icing ice cream tiramisu pudding
                    cupcake.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button size="lg" asChild>
                    <Link href={products.index()}>
                        Go shopping<span aria-hidden="true"> &rarr;</span>
                    </Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
