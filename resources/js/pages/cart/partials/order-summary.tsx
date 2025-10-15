import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePage } from '@inertiajs/react';

type OrderSummary = {
    orderSummary: {
        subTotal: string;
        tax: string;
        total: string;
    };
};
export default function OrderSummary() {
    const { orderSummary } = usePage<OrderSummary>().props;
    return (
        <Card
            aria-labelledby="summary-heading"
            className="mt-16 lg:col-span-5 lg:mt-0"
        >
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent>
                <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-muted-foreground">
                            Subtotal
                        </dt>
                        <dd className="font-mono text-sm font-medium text-foreground">
                            {orderSummary.subTotal}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                        <dt className="flex text-sm text-muted-foreground">
                            <span>PPN</span>
                            <a href="#">
                                <span className="sr-only">
                                    Learn more about how tax is calculated
                                </span>
                            </a>
                        </dt>
                        <dd className="font-mono text-sm font-medium text-foreground">
                            {orderSummary.tax}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                        <dt className="text-base font-medium">Order Total</dt>
                        <dd className="font-mono text-base font-medium text-foreground">
                            {orderSummary.total}
                        </dd>
                    </div>
                </dl>
            </CardContent>

            <CardFooter>
                <Button type="submit" size='lg' className="w-full" aria-label="Submit">
                    Checkout
                </Button>
            </CardFooter>
        </Card>
    );
}
