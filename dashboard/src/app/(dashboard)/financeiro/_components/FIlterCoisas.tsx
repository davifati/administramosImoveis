import {
    RiAppleFill,
    RiGoogleFill,
    RiMastercardLine,
    RiVisaFill,
} from '@remixicon/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// This example requires the copy-and-paste Tremor Select component, install here: https://tremor.so/docs/inputs/select
// This example requires the copy-and-paste Tremor Date Range Picker component, install here: https://tremor.so/docs/inputs/date-range-picker

import { DateRangePicker } from '@/components/DatePicker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/Select';

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

export const hasErrorInput = [
    // base
    'ring-2',
    // border color
    'border-red-500 dark:border-red-700',
    // ring color
    'ring-red-200 dark:ring-red-700/30',
];

const countries = [
    // array-start
    {
        value: 'switzerland',
        label: 'Switzerland',
    },
    {
        value: 'germany',
        label: 'Germany',
    },
    {
        value: 'austria',
        label: 'Austria',
    },
    {
        value: 'italy',
        label: 'Italy',
    },
    {
        value: 'france',
        label: 'France',
    },
    {
        value: 'denmark',
        label: 'Denmark',
    },
    {
        value: 'spain',
        label: 'Spain',
    },
    {
        value: 'united-states',
        label: 'United States',
    },
    // array-end
];

const status = [
    // array-start
    {
        value: 'completed',
        label: 'Completed',
        color: 'bg-emerald-600 dark:bg-emerald-500',
    },
    {
        value: 'processing',
        label: 'Processing',
        color: 'bg-gray-400 dark:bg-orange-600',
    },
    {
        value: 'failed',
        label: 'Failed',
        color: 'bg-red-500 dark:bg-red-500',
    },
    {
        value: 'refund-requested',
        label: 'Refund requested',
        color: 'bg-violet-500 dark:bg-violet-500',
    },
    // array-end
];

const payment = [
    // array-start
    {
        value: 'all',
        label: 'All',
        disabled: false,
        hasIcon: false,
    },
    {
        value: 'visa-card',
        label: 'Visa card',
        disabled: false,
        icon: RiVisaFill,
        hasIcon: true,
    },
    {
        value: 'master-card',
        label: 'Mastercard',
        disabled: false,
        icon: RiMastercardLine,
        hasIcon: true,
    },
    {
        value: 'apple-pay',
        label: 'Apple pay',
        disabled: false,
        icon: RiAppleFill,
        hasIcon: true,
    },
    {
        value: 'google-pay',
        label: 'Google pay',
        disabled: true,
        icon: RiGoogleFill,
        hasIcon: true,
    },
    // array-end
];

export default function Example() {
    return (
        <>
            <div className="relative">
                <div className="rounded-tremor-default border border-tremor-border bg-tremor-background pb-20 shadow-tremor-input dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-input md:h-52">
                    <div className="grid grid-cols-1 gap-4 border-b border-tremor-border p-6 dark:border-dark-tremor-border sm:grid-cols-2 md:grid-cols-4">
                        <div className="w-full">
                            <label
                                htmlFor="date_1"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Date
                            </label>
                            {/* theme color for <DateRangePicker /> set to blue-500 */}
                            <DateRangePicker
                                defaultValue={{
                                    from: new Date(new Date().setDate(new Date().getDate() - 10)),
                                    to: new Date(),
                                }}
                                id="date_1"
                                name="date_1"
                                className="mt-2 border-tremor-border dark:border-dark-tremor-border"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="country_1"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Country
                            </label>
                            <Select
                                id="country_1"
                                name="country_1"
                                defaultValue="switzerland"
                            >
                                <SelectTrigger className="mt-2 border-tremor-border dark:border-dark-tremor-border sm:w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="border-tremor-border dark:border-dark-tremor-border">
                                    {countries.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="status_1"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Status
                            </label>
                            <Select id="status_1" name="status_1" defaultValue="completed">
                                <SelectTrigger className="mt-2 border-tremor-border dark:border-dark-tremor-border sm:w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="border-tremor-border dark:border-dark-tremor-border">
                                    {status.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                            disabled={item.disabled}
                                        >
                                            <div className="flex items-center gap-x-2.5">
                                                <span
                                                    className={cx(
                                                        item.color,
                                                        'inline-block size-2 shrink-0 rounded-tremor-full',
                                                    )}
                                                    aria-hidden={true}
                                                />
                                                {item.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="payment_1"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Payment method
                            </label>
                            <Select defaultValue="all">
                                <SelectTrigger className="mt-2 border-tremor-border dark:border-dark-tremor-border sm:w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="border-tremor-border dark:border-dark-tremor-border">
                                    {payment.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                            disabled={item.disabled}
                                        >
                                            <div className="flex items-center gap-x-2">
                                                {item.hasIcon ? (
                                                    <item.icon
                                                        className={cx(
                                                            item.disabled
                                                                ? 'text-tremor-content-subtle/50 dark:text-dark-tremor-content-subtle/50'
                                                                : 'text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis',
                                                            'size-4 shrink-0',
                                                        )}
                                                        aria-hidden={true}
                                                    />
                                                ) : null}
                                                {item.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                {/* gradient for demo purpose */}
                <div className="absolute inset-x-0 bottom-0 -mb-1 h-14 rounded-b-tremor-default bg-gradient-to-t from-tremor-background via-tremor-background to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent" />
            </div>
        </>
    );
}
