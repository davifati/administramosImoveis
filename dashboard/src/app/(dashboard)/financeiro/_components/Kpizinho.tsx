export default function Kpizinho() {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-flex items-center space-x-1.5 rounded-tremor-full bg-tremor-background px-2.5 py-1 ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:ring-dark-tremor-ring">
                    <span className="text-tremor-label font-medium text-tremor-content dark:text-dark-tremor-content">
                        In progress
                    </span>
                    <span className="text-tremor-label font-medium text-emerald-700 dark:text-emerald-500">
                        +5.1%
                    </span>
                </span>
                <span className="inline-flex items-center space-x-1.5 rounded-tremor-full bg-tremor-background px-2.5 py-1 ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:ring-dark-tremor-ring">
                    <span className="text-tremor-label font-medium text-tremor-content dark:text-dark-tremor-content">
                        Obsolete
                    </span>
                    <span className="text-tremor-label font-medium text-red-700 dark:text-red-500">
                        -0.6%
                    </span>
                </span>
                <span className="inline-flex items-center space-x-1.5 rounded-tremor-full bg-tremor-background px-2.5 py-1 ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:ring-dark-tremor-ring">
                    <span className="text-tremor-label font-medium text-tremor-content dark:text-dark-tremor-content">
                        Open
                    </span>
                    <span className="text-tremor-label font-medium text-emerald-700 dark:text-emerald-500">
                        +2.7%
                    </span>
                </span>
                <span className="inline-flex items-center space-x-1.5 rounded-tremor-full bg-tremor-background px-2.5 py-1 ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:ring-dark-tremor-ring">
                    <span className="text-tremor-label font-medium text-tremor-content dark:text-dark-tremor-content">
                        Closed
                    </span>
                    <span className="text-tremor-label font-medium text-red-700 dark:text-red-500">
                        -0.6%
                    </span>
                </span>
            </div>
        </>
    );
}
