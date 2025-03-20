// components/UserTable.tsx
"use client"
import { Button } from "@/components/Button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "@/components/Table"
import { departments } from "@/data/data"
import { Plus, Trash2 } from "lucide-react"

// Definindo os dados de usuários de exemplo
const users = [
    {
        initials: "DL",
        name: "David Lima",
        email: "limadavidnascimento@gmail.com",
        dateAdded: "Jan 21, 2024",
        lastActive: "Feb 8, 2024",
        permission: "admin",
        status: "active",
    },
    {
        initials: "G",
        name: "Geraldo",
        email: "geraldo@gmail.com",
        dateAdded: "Apr 18, 2023",
        lastActive: "Dec 20, 2023",
        permission: "Admin",
        status: "active",
    },
]

export default function UserTable() {
    return (
        <div>
            <div className="flex items-center gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full gap-2 sm:w-fit">
                            <Plus className="-ml-1 size-4 shrink-0" aria-hidden="true" />
                            Adicionar
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Adicionar Usuário</DialogTitle>
                            <DialogDescription className="mt-1 text-sm leading-6">
                                Preencha as informações abaixo.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="mt-4 space-y-4">
                            <div>
                                <Label htmlFor="new-user-email" className="font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="new-user-email"
                                    type="email"
                                    name="email"
                                    className="mt-2"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="new-user-permission" className="font-medium">
                                    Perfil
                                </Label>
                                <Select name="permission" defaultValue="Administrador">
                                    <SelectTrigger id="new-user-permission" className="mt-2 w-full">
                                        <SelectValue placeholder="Defina o perfil de acesso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((item) => (
                                            <SelectItem key={item.value} value={item.label}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <DialogFooter className="mt-6">
                                <DialogClose asChild>
                                    <Button className="mt-2 w-full sm:mt-0 sm:w-fit" variant="secondary">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button className="w-full sm:w-fit" variant="primary" type="submit">
                                    Adicionar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <TableRoot className="mt-6" aria-labelledby="users-list-heading">
                <Table className="border-transparent dark:border-transparent">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell className="w-full text-xs font-medium uppercase">Nome</TableHeaderCell>
                            <TableHeaderCell className="text-xs font-medium uppercase">Adicionado em</TableHeaderCell>
                            <TableHeaderCell className="text-xs font-medium uppercase">Ativo em</TableHeaderCell>
                            <TableHeaderCell className="text-xs font-medium uppercase">Perfil</TableHeaderCell>
                            <TableHeaderCell className="text-xs font-medium uppercase">
                                <span className="sr-only">Actions</span>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell className="w-full">
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="inline-flex size-9 items-center justify-center rounded-full bg-gray-50 p-1.5 text-xs font-medium text-gray-700 ring-1 ring-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:ring-gray-700"
                                            aria-hidden="true"
                                        >
                                            {item.initials}
                                        </span>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{item.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-500">{item.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.dateAdded}</TableCell>
                                <TableCell>{item.lastActive}</TableCell>
                                <TableCell>{item.permission}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="p-2.5 text-gray-600 transition-all hover:border hover:border-gray-300 hover:bg-gray-50 hover:text-red-500 dark:text-gray-400 hover:dark:border-gray-800 hover:dark:bg-gray-900 hover:dark:text-red-500"
                                                aria-label={`Delete ${item.name}`}
                                            >
                                                <Trash2 className="size-4 shrink-0" aria-hidden="true" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Por favor, confirme</DialogTitle>
                                                <DialogDescription className="mt-1 text-sm leading-6">
                                                    Você tem certeza de que deseja excluir {item.name}? Essa ação não pode ser desfeita.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="mt-6">
                                                <DialogClose asChild>
                                                    <Button className="mt-2 w-full sm:mt-0 sm:w-fit" variant="secondary">
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button className="w-full sm:w-fit" variant="destructive">
                                                        Excluir
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>
        </div>
    )
}
