'use client';

import { useState } from 'react';
import {
    RiArrowRightUpLine,
    RiFacebookCircleFill,
    RiGithubFill,
    RiGoogleFill,
    RiLinkedinFill,
    RiNpmjsLine,
    RiPagesLine,
    RiRedditFill,
    RiSearchLine,
    RiTwitterFill,
    RiYoutubeFill,
} from '@remixicon/react';
import {
    AreaChart,
    BarList,
    Card,
    Dialog,
    DialogPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TextInput,
} from '@tremor/react';

const data = [
    {
        date: 'Aug 01',
        'Page views': 7100,
        'Unique visitors': 4434,
    },
    {
        date: 'Aug 02',
        'Page views': 10943,
        'Unique visitors': 6954,
    },
    {
        date: 'Aug 03',
        'Page views': 10889,
        'Unique visitors': 7100,
    },
    {
        date: 'Aug 04',
        'Page views': 10909,
        'Unique visitors': 7909,
    },
    {
        date: 'Aug 05',
        'Page views': 10778,
        'Unique visitors': 7103,
    },
    {
        date: 'Aug 06',
        'Page views': 10900,
        'Unique visitors': 7534,
    },
    {
        date: 'Aug 07',
        'Page views': 10129,
        'Unique visitors': 7412,
    },
    {
        date: 'Aug 08',
        'Page views': 10021,
        'Unique visitors': 7834,
    },
    {
        date: 'Aug 09',
        'Page views': 10279,
        'Unique visitors': 7159,
    },
    {
        date: 'Aug 10',
        'Page views': 10224,
        'Unique visitors': 8260,
    },
    {
        date: 'Aug 11',
        'Page views': 10380,
        'Unique visitors': 4965,
    },
    {
        date: 'Aug 12',
        'Page views': 10414,
        'Unique visitors': 4989,
    },
    {
        date: 'Aug 13',
        'Page views': 6540,
        'Unique visitors': 4839,
    },
    {
        date: 'Aug 14',
        'Page views': 6634,
        'Unique visitors': 4343,
    },
    {
        date: 'Aug 15',
        'Page views': 7124,
        'Unique visitors': 4903,
    },
    {
        date: 'Aug 16',
        'Page views': 7934,
        'Unique visitors': 5273,
    },
    {
        date: 'Aug 17',
        'Page views': 10287,
        'Unique visitors': 6900,
    },
    {
        date: 'Aug 18',
        'Page views': 10323,
        'Unique visitors': 6732,
    },
    {
        date: 'Aug 19',
        'Page views': 10511,
        'Unique visitors': 6523,
    },
    {
        date: 'Aug 20',
        'Page views': 11043,
        'Unique visitors': 7422,
    },
    {
        date: 'Aug 21',
        'Page views': 6700,
        'Unique visitors': 4334,
    },
    {
        date: 'Aug 22',
        'Page views': 6900,
        'Unique visitors': 4943,
    },
    {
        date: 'Aug 23',
        'Page views': 7934,
        'Unique visitors': 7812,
    },
    {
        date: 'Aug 24',
        'Page views': 9021,
        'Unique visitors': 7729,
    },
    {
        date: 'Aug 25',
        'Page views': 9198,
        'Unique visitors': 7178,
    },
    {
        date: 'Aug 26',
        'Page views': 9557,
        'Unique visitors': 7158,
    },
    {
        date: 'Aug 27',
        'Page views': 9959,
        'Unique visitors': 7100,
    },
    {
        date: 'Aug 28',
        'Page views': 10034,
        'Unique visitors': 7934,
    },
    {
        date: 'Aug 29',
        'Page views': 10243,
        'Unique visitors': 7223,
    },
    {
        date: 'Aug 30',
        'Page views': 10078,
        'Unique visitors': 8779,
    },
    {
        date: 'Aug 31',
        'Page views': 11134,
        'Unique visitors': 8190,
    },
    {
        date: 'Sep 01',
        'Page views': 12347,
        'Unique visitors': 4839,
    },
    {
        date: 'Sep 02',
        'Page views': 12593,
        'Unique visitors': 5153,
    },
    {
        date: 'Sep 03',
        'Page views': 12043,
        'Unique visitors': 5234,
    },
    {
        date: 'Sep 04',
        'Page views': 12144,
        'Unique visitors': 5478,
    },
    {
        date: 'Sep 05',
        'Page views': 12489,
        'Unique visitors': 5741,
    },
    {
        date: 'Sep 06',
        'Page views': 12748,
        'Unique visitors': 6743,
    },
    {
        date: 'Sep 07',
        'Page views': 12933,
        'Unique visitors': 7832,
    },
    {
        date: 'Sep 08',
        'Page views': 13028,
        'Unique visitors': 8943,
    },
    {
        date: 'Sep 09',
        'Page views': 13412,
        'Unique visitors': 9932,
    },
    {
        date: 'Sep 10',
        'Page views': 13649,
        'Unique visitors': 10139,
    },
    {
        date: 'Sep 11',
        'Page views': 13748,
        'Unique visitors': 10441,
    },
    {
        date: 'Sep 12',
        'Page views': 13148,
        'Unique visitors': 10933,
    },
    {
        date: 'Sep 13',
        'Page views': 12839,
        'Unique visitors': 10073,
    },
    {
        date: 'Sep 14',
        'Page views': 12428,
        'Unique visitors': 10128,
    },
    {
        date: 'Sep 15',
        'Page views': 12012,
        'Unique visitors': 10412,
    },
    {
        date: 'Sep 16',
        'Page views': 11801,
        'Unique visitors': 9501,
    },
    {
        date: 'Sep 17',
        'Page views': 10102,
        'Unique visitors': 7923,
    },
    {
        date: 'Sep 18',
        'Page views': 12132,
        'Unique visitors': 10212,
    },
    {
        date: 'Sep 19',
        'Page views': 12901,
        'Unique visitors': 10101,
    },
    {
        date: 'Sep 20',
        'Page views': 13132,
        'Unique visitors': 10132,
    },
    {
        date: 'Sep 21',
        'Page views': 14132,
        'Unique visitors': 10212,
    },
    {
        date: 'Sep 22',
        'Page views': 14245,
        'Unique visitors': 12163,
    },
    {
        date: 'Sep 23',
        'Page views': 14328,
        'Unique visitors': 10036,
    },
    {
        date: 'Sep 24',
        'Page views': 14949,
        'Unique visitors': 8985,
    },
    {
        date: 'Sep 25',
        'Page views': 15967,
        'Unique visitors': 9700,
    },
    {
        date: 'Sep 26',
        'Page views': 17349,
        'Unique visitors': 10943,
    },
];

const data1 = [
    {
        name: '/',
        value: 20874,
    },
    {
        name: '/components',
        value: 19188,
    },
    {
        name: '/docs/getting-started/installation',
        value: 17922,
    },
    {
        name: '/docs/visualizations/area-chart',
        value: 10067,
    },
    {
        name: '/docs/visualizations/bar-chart',
        value: 9067,
    },
    {
        name: '/docs/visualizations/line-chart',
        value: 9067,
    },
    {
        name: '/docs/visualizations/donut-chart',
        value: 8066,
    },
    {
        name: '/docs/visualizations/spark-charts',
        value: 6677,
    },
    {
        name: '/docs/visualizations/barlist',
        value: 6604,
    },
    {
        name: '/docs/ui/table',
        value: 6604,
    },
    {
        name: '/docs/ui/button',
        value: 6109,
    },
    {
        name: '/docs/ui/select',
        value: 4237,
    },
    {
        name: '/docs/ui/card',
        value: 1261,
    },
];

const data2 = [
    {
        name: 'google.com',
        value: 9882,
        icon: RiGoogleFill,
    },
    {
        name: 'twitter.com',
        value: 1904,
        icon: RiTwitterFill,
    },
    {
        name: 'github.com',
        value: 1904,
        icon: RiGithubFill,
    },
    {
        name: 'youtube.com',
        value: 1118,
        icon: RiYoutubeFill,
    },
    {
        name: 'reddit.com',
        value: 396,
        icon: RiRedditFill,
    },
    {
        name: 'bing.com',
        value: 302,
        icon: RiSearchLine,
    },
    {
        name: 'duckduckgo.com',
        value: 281,
        icon: RiSearchLine,
    },
    {
        name: 'npmjs.com',
        value: 98,
        icon: RiNpmjsLine,
    },
    {
        name: 'linkedin.com',
        value: 71,
        icon: RiLinkedinFill,
    },
    {
        name: 'news.ycombinator.com',
        value: 60,
        icon: RiPagesLine,
    },
    {
        name: 'facebook.com',
        value: 51,
        icon: RiFacebookCircleFill,
    },
];

const data3 = [
    {
        name: '/components',
        value: 60874,
    },
    {
        name: '/',
        value: 51188,
    },
    {
        name: '/docs/getting-started/installation',
        value: 38922,
    },
    {
        name: '/docs/visualizations/area-chart',
        value: 20067,
    },
    {
        name: '/docs/visualizations/bar-chart',
        value: 19067,
    },
    {
        name: '/docs/visualizations/line-chart',
        value: 18131,
    },
    {
        name: '/docs/visualizations/donut-chart',
        value: 15107,
    },
    {
        name: '/docs/visualizations/spark-charts',
        value: 13103,
    },
    {
        name: '/docs/visualizations/data-bars',
        value: 9701,
    },
    {
        name: '/docs/visualizations/barlist',
        value: 6502,
    },
    {
        name: '/docs/ui/table',
        value: 6401,
    },
    {
        name: '/docs/ui/card',
        value: 5929,
    },
    {
        name: '/docs/ui/button',
        value: 5710,
    },
    {
        name: '/docs/ui/select',
        value: 4109,
    },
];

const data4 = [
    {
        name: 'google.com',
        value: 12892,
        icon: RiGoogleFill,
    },
    {
        name: 'twitter.com',
        value: 2070,
        icon: RiTwitterFill,
    },
    {
        name: 'github.com',
        value: 1296,
        icon: RiGithubFill,
    },
    {
        name: 'youtube.com',
        value: 779,
        icon: RiYoutubeFill,
    },
    {
        name: 'reddit.com',
        value: 621,
        icon: RiRedditFill,
    },
    {
        name: 'bing.com',
        value: 573,
        icon: RiSearchLine,
    },
    {
        name: 'duckduckgo.com',
        value: 381,
        icon: RiSearchLine,
    },
    {
        name: 'npmjs.com',
        value: 302,
        icon: RiNpmjsLine,
    },
    {
        name: 'linkedin.com',
        value: 199,
        icon: RiLinkedinFill,
    },
    {
        name: 'news.ycombinator.com',
        value: 181,
        icon: RiPagesLine,
    },
    {
        name: 'facebook.com',
        value: 170,
        icon: RiFacebookCircleFill,
    },
];

const summary = [
    {
        name: 'Unique visitors',
        type: 'Visitors',
        value: '216.8K',
        categories: [
            {
                name: 'Top pages',
                data: data1,
            },
            {
                name: 'Top sources',
                data: data2,
            },
        ],
    },
    {
        name: 'Page views',
        type: 'Views',
        value: '271K',
        categories: [
            {
                name: 'Top pages',
                data: data3,
            },
            {
                name: 'Top sources',
                data: data4,
            },
        ],
    },
];

const valueFormatter = (number) =>
    `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    };

    const [modal, setModal] = useState({
        open: false,
        index: 0,
    });
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = summary[selectedIndex].categories[
        modal.index
    ].data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Web analytics
            </h3>
            <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Analyze and understand your web traffic.
            </p>
            <TabGroup defaultIndex={0} onIndexChange={handleIndexChange}>
                <Card className="mt-8 overflow-hidden p-0">
                    <TabList className="space-x-0 bg-tremor-background-muted dark:bg-dark-tremor-background-muted">
                        {summary.map((tab) => (
                            <>
                                <Tab
                                    key={tab.name}
                                    className="py-4 pl-5 pr-12 text-left ui-selected:bg-tremor-brand-inverted ui-focus-visible:ring-2 ui-focus-visible:ring-blue-400 ui-focus-visible:ring-offset-2 dark:ui-selected:bg-dark-tremor-background-muted"
                                >
                                    <span className="block text-tremor-content dark:text-dark-tremor-content">
                                        {tab.name}
                                    </span>
                                    <span className="mt-1 block text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        {tab.value}
                                    </span>
                                </Tab>
                                <div
                                    className="border-r border-tremor-border dark:border-dark-tremor-border"
                                    aria-hidden={true}
                                />
                            </>
                        ))}
                    </TabList>
                    <TabPanels>
                        {summary.map((tab) => (
                            <TabPanel key={tab.name} className="p-6">
                                <>
                                    <AreaChart
                                        data={data}
                                        index="date"
                                        categories={[tab.name]}
                                        valueFormatter={valueFormatter}
                                        showGradient={false}
                                        showLegend={false}
                                        yAxisWidth={45}
                                        className="hidden h-96 sm:block"
                                    />
                                    <AreaChart
                                        data={data}
                                        index="date"
                                        categories={[tab.name]}
                                        valueFormatter={valueFormatter}
                                        showGradient={false}
                                        showLegend={false}
                                        showYAxis={false}
                                        startEndOnly={true}
                                        className="h-72 sm:hidden"
                                    />
                                </>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Card>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {summary[selectedIndex].categories.map((category, idx) => (
                        <Card key={category.name}>
                            <div className="flex items-center justify-between">
                                <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    {category.name}
                                </p>
                                <span className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                    {summary[selectedIndex].type}
                                </span>
                            </div>
                            <BarList
                                data={category.data.slice(0, 5)}
                                valueFormatter={valueFormatter}
                                className="mt-4"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-tremor-default bg-gradient-to-t from-tremor-background to-transparent py-7 dark:from-dark-tremor-background">
                                <button
                                    className="flex items-center justify-center gap-x-1.5 rounded-tremor-full border border-tremor-border bg-tremor-background px-2.5 py-1.5 text-tremor-label font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                    onClick={() =>
                                        setModal({
                                            open: true,
                                            index: idx,
                                        })
                                    }
                                >
                                    Show more
                                    <RiArrowRightUpLine
                                        className="-mr-px size-4 shrink-0"
                                        aria-hidden={true}
                                    />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
                <Dialog
                    open={modal.open}
                    onClose={() => {
                        setModal((prev) => ({
                            ...prev,
                            open: false,
                        }));
                        setSearchQuery('');
                    }}
                    static={true}
                    className="z-[100]"
                >
                    <DialogPanel className="p-0">
                        <div className="px-6 pb-4 pt-6">
                            <TextInput
                                icon={RiSearchLine}
                                placeholder="Search..."
                                className="rounded-tremor-small"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                            <div className="flex items-center justify-between pt-4">
                                <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Pages
                                </p>
                                <span className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                                    {summary[selectedIndex].type}
                                </span>
                            </div>
                        </div>
                        <div className="h-96 overflow-y-scroll px-6">
                            {filteredItems.length > 0 ? (
                                <BarList data={filteredItems} valueFormatter={valueFormatter} />
                            ) : (
                                <p className="flex h-full items-center justify-center text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    No results.
                                </p>
                            )}
                        </div>
                        <div className="mt-4 border-t border-tremor-border bg-tremor-background-muted p-6 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
                            <button
                                className="flex w-full items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
                                onClick={() => {
                                    setSearchQuery('');
                                    setModal((prev) => ({
                                        ...prev,
                                        open: false,
                                    }));
                                }}
                            >
                                Go back
                            </button>
                        </div>
                    </DialogPanel>
                </Dialog>
            </TabGroup>
        </>
    );
}
