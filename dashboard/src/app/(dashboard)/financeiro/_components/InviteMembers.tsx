'use client';

import { useState } from 'react';
import { RiArrowDownSLine, RiCloseLine, RiUserAddFill } from '@remixicon/react';
import {
    Card,
    Dialog,
    DialogPanel,
    Divider,
    List,
    ListItem,
    TextInput,
} from '@tremor/react';

const members = [
    {
        name: 'Max Miller',
        email: 'max@company.com',
        initials: 'MM',
        status: 'member',
    },
    {
        name: 'Lena Wave',
        email: 'lena@company.com',
        initials: 'LW',
        status: 'member',
    },
    {
        name: 'Emma Ross',
        email: 'emma@company.com',
        initials: 'ER',
        status: 'member',
    },
];

export default function Example() {
    const [showDemo, setShowDemo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* first card only for demo purpose */}
            <Card className="sm:mx-auto sm:max-w-2xl">
                <div className="absolute right-0 top-0 pr-3 pt-3">
                    <button
                        type="button"
                        className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                        aria-label="Close"
                    >
                        <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
                    </button>
                </div>
                <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Invite members
                </h3>
                <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                    Add new team members to your workspace. Please consider your
                    organization's policies when adding external people.
                </p>
                <form>
                    <div className="mt-6 flex w-full items-center space-x-2">
                        <TextInput
                            id="inviteEmail"
                            icon={RiUserAddFill}
                            className="h-10"
                            placeholder="Add email..."
                            type="email"
                        />
                        <button
                            type="submit"
                            className="h-10 whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                        >
                            Invite
                        </button>
                    </div>
                </form>
                <h4 className="mt-6 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    People with existing access
                </h4>
                <List className="mt-2">
                    {members.map((member) => (
                        <ListItem key={member.name} className="py-2.5">
                            <div className="flex items-center space-x-4">
                                <span
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tremor-full border border-tremor-border bg-tremor-background text-tremor-label text-tremor-content-strong dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong"
                                    aria-hidden={true}
                                >
                                    {member.initials}
                                </span>
                                <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    {member.name}
                                </span>
                            </div>
                            <span className="inline-flex items-center rounded-tremor-small bg-tremor-background px-2 py-1 text-tremor-label font-medium text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:text-dark-tremor-content-emphasis dark:ring-dark-tremor-ring">
                                {member.status}
                            </span>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <Divider className="mt-12">
                <button
                    onClick={() => setShowDemo(!showDemo)}
                    type="button"
                    className="duration-400 group inline-flex items-center justify-center space-x-2 whitespace-nowrap rounded-full bg-tremor-background-subtle px-3.5 py-1.5 text-tremor-default font-medium text-tremor-content focus-visible:ring-1 focus-visible:ring-offset-1 dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content"
                    tabIndex={0}
                >
                    <RiArrowDownSLine
                        aria-hidden={true}
                        className={`-mx-1 size-5 transition-all group-hover:text-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-emphasis ${showDemo ? 'rotate-180' : ''} `}
                    />
                    <span className="transition-all group-hover:text-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-emphasis">
                        {showDemo ? 'Hide Demo' : 'Show Demo'}
                    </span>
                </button>
            </Divider>
            {showDemo ? (
                <>
                    <div className="flex items-center justify-center py-36">
                        <button
                            type="button"
                            className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                            onClick={() => setIsOpen(true)}
                        >
                            Show dialog
                        </button>
                    </div>
                    <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        static={true}
                        className="z-[100]"
                    >
                        <DialogPanel className="sm:max-w-2xl">
                            <div className="absolute right-0 top-0 pr-3 pt-3">
                                <button
                                    type="button"
                                    className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close"
                                >
                                    <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
                                </button>
                            </div>
                            <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Invite members
                            </h3>
                            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                                Add new team members to your workspace. Please consider your
                                organization's policies when adding external people.
                            </p>
                            <form>
                                <div className="mt-6 flex w-full items-center space-x-2">
                                    <TextInput
                                        id="inviteEmail"
                                        icon={RiUserAddFill}
                                        className="h-10"
                                        placeholder="Add email..."
                                        type="email"
                                    />
                                    <button
                                        type="submit"
                                        className="h-10 whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                                    >
                                        Invite
                                    </button>
                                </div>
                            </form>
                            <h4 className="mt-6 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                People with existing access
                            </h4>
                            <List className="mt-2">
                                {members.map((member) => (
                                    <ListItem key={member.name} className="py-2.5">
                                        <div className="flex items-center space-x-4">
                                            <span
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tremor-full border border-tremor-border bg-tremor-background text-tremor-label text-tremor-content-strong dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong"
                                                aria-hidden={true}
                                            >
                                                {member.initials}
                                            </span>
                                            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                {member.name}
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center rounded-tremor-small bg-tremor-background px-2 py-1 text-tremor-label font-medium text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background dark:text-dark-tremor-content-emphasis dark:ring-dark-tremor-ring">
                                            {member.status}
                                        </span>
                                    </ListItem>
                                ))}
                            </List>
                        </DialogPanel>
                    </Dialog>
                </>
            ) : null}
        </>
    );
}
