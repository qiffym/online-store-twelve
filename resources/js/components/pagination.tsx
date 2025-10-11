import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface Props {
    links: Record<string, string | null>;
}

export default function Pagination({ links }: Props) {
    return (
        <div className="flex flex-1 justify-between sm:justify-end">
            <Link
                as="button"
                disabled={!links.prev}
                href={links.prev ?? '#'}
                className={cn(
                    !links?.prev && 'cursor-none opacity-50',
                    'relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0',
                )}
            >
                Previous
            </Link>
            <Link
                as="button"
                disabled={!links.next}
                href={links.next ?? '#'}
                className={cn(
                    'relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0',
                    !links.next && 'cursor-none opacity-50',
                )}
            >
                Next
            </Link>
        </div>
    );
}
