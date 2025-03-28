import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// This example requires the copy-and-paste Tremor Select component, install here: https://tremor.so/docs/inputs/select
// This example requires the copy-and-paste Tremor Tooltip component, install here: https://tremor.so/docs/ui/tooltip

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/Select';
import { Tooltip } from '@/components/Tooltip';

export function cx(...args) {
    return twMerge(clsx(...args));
}

export const focusInput = [
    // base
    'focus:ring-2',
    // ring color
    'focus:ring-tremor-brand-muted focus:dark:ring-dark-tremor-brand-muted',
    // border color
    'focus:border-tremor-brand-subtle focus:dark:border-dark-tremor-brand-subtle',
];

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

const data = [
    // array-start
    {
        buttonText: '7D',
        tooltipText: `${formatDate(new Date(new Date().setDate(new Date().getDate() - 7)))} – ${formatDate(new Date())} `,
    },
    {
        buttonText: '30D',
        tooltipText: `${formatDate(new Date(new Date().setDate(new Date().getDate() - 30)))} – ${formatDate(new Date())}`,
    },
    {
        buttonText: '3M',
        tooltipText: `${formatDate(new Date(new Date().setMonth(new Date().getMonth() - 3)))} – ${formatDate(new Date())}`,
    },
    {
        buttonText: '6M',
        tooltipText: `${formatDate(new Date(new Date().setMonth(new Date().getMonth() - 6)))} – ${formatDate(new Date())}`,
    },
    // array-end
];

const dataSelect = [
    // array-start
    {
        value: 'week-to-date',
        label: 'Week to Date',
    },
    {
        value: 'month-to-date',
        label: 'Month to Date',
    },
    {
        value: 'year-to-date',
        label: 'Year to Date',
    },
    // array-end
];

export default function Example() {
    return (
        <>
            <div className="relative">
                <div className="flex h-48 items-start justify-start rounded-tremor-default border border-tremor-border bg-tremor-background p-6 shadow-tremor-input dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-input sm:justify-end">
                    <div className="hidden items-center rounded-tremor-small text-tremor-default font-medium shadow-tremor-input dark:shadow-dark-tremor-input sm:inline-flex">
                        {data.map((item, index) => (
                            <Tooltip
                                side="top"
                                showArrow={true}
                                className="z-50"
                                content={item.tooltipText}
                                triggerAsChild={true}
                                key={index}
                            >
                                <button
                                    type="button"
                                    className={cx(
                                        index === 0 ? 'rounded-l-tremor-small' : '-ml-px',
                                        focusInput,
                                        'border border-tremor-border bg-tremor-background px-4 py-2 text-tremor-content-strong hover:bg-tremor-background-muted hover:text-tremor-content-strong focus:z-10 focus:outline-none dark:border-dark-tremor-border dark:bg-gray-950 dark:text-dark-tremor-content-strong hover:dark:bg-gray-950/50',
                                    )}
                                >
                                    {item.buttonText}
                                </button>
                            </Tooltip>
                        ))}
                        <Select>
                            <SelectTrigger className="-ml-px w-fit rounded-none !rounded-r-tremor-small border-tremor-border shadow-none dark:border-dark-tremor-border">
                                <SelectValue placeholder="XTD" />
                            </SelectTrigger>
                            <SelectContent className="border-tremor-border dark:border-dark-tremor-border">
                                {dataSelect.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="inline-flex items-center rounded-tremor-small text-tremor-default font-medium shadow-tremor-input dark:shadow-dark-tremor-input sm:hidden">
                        {data.slice(0, 2).map((item, index) => (
                            <Tooltip
                                side="top"
                                showArrow={true}
                                className="z-50"
                                sideOffset={8}
                                content={item.tooltipText}
                                triggerAsChild={true}
                                key={index}
                            >
                                <button
                                    key={index}
                                    type="button"
                                    className={cx(
                                        index === 0 ? 'rounded-l-tremor-small' : '-ml-px',
                                        focusInput,
                                        'border border-tremor-border bg-tremor-background px-4 py-2 text-tremor-content-strong hover:bg-tremor-background-muted hover:text-tremor-content-strong focus:z-10 focus:outline-none dark:border-dark-tremor-border dark:bg-gray-950 dark:text-dark-tremor-content-strong hover:dark:bg-gray-950/50',
                                    )}
                                >
                                    {item.buttonText}
                                </button>
                            </Tooltip>
                        ))}
                        <Select>
                            <SelectTrigger className="-ml-px w-fit rounded-none !rounded-r-tremor-small border-tremor-border shadow-none dark:border-dark-tremor-border">
                                <SelectValue placeholder="XTD" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataSelect.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* gradient for demo purpose */}
                <div className="absolute inset-x-0 bottom-0 -mb-1 h-14 rounded-b-tremor-default bg-gradient-to-t from-tremor-background via-tremor-background to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent" />
            </div>
        </>
    );
}
