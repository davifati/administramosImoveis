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

export default function Users() {
  return (
    <section aria-labelledby="members-heading">
      <form>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div>
            <h2
              id="members-heading"
              className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50"
            >
              Usuários
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Administre usuários e controle suas permissões de acesso.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h3
                id="users-list-heading"
                className="text-sm font-medium text-gray-900 dark:text-gray-50"
              >

              </h3>
              <div className="flex items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full gap-2 sm:w-fit">
                      <Plus
                        className="-ml-1 size-4 shrink-0"
                        aria-hidden="true"
                      />
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
                        <Label
                          htmlFor="new-user-permission"
                          className="font-medium"
                        >
                          Perfil
                        </Label>
                        <Select name="permission" defaultValue="Administrador">
                          <SelectTrigger
                            id="new-user-permission"
                            className="mt-2 w-full"
                          >
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
                          <Button
                            className="mt-2 w-full sm:mt-0 sm:w-fit"
                            variant="secondary"
                          >
                            Cancelar
                          </Button>
                        </DialogClose>
                        <Button
                          className="w-full sm:w-fit"
                          variant="primary"
                          type="submit"
                        >
                          Adicionar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TableRoot className="mt-6" aria-labelledby="users-list-heading">
              <Table className="border-transparent dark:border-transparent">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell className="w-full text-xs font-medium uppercase">
                      Nome
                    </TableHeaderCell>
                    <TableHeaderCell className="text-xs font-medium uppercase">
                      Adicionado em
                    </TableHeaderCell>
                    <TableHeaderCell className="text-xs font-medium uppercase">
                      Ativo em
                    </TableHeaderCell>
                    <TableHeaderCell className="text-xs font-medium uppercase">
                      Perfil
                    </TableHeaderCell>
                    <TableHeaderCell className="text-xs font-medium uppercase">
                      <span className="sr-only">Actions</span>
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="w-full">
                        {item.status === "pending" ? (
                          <div className="flex items-center gap-4">
                            <span
                              className="inline-flex size-9 items-center justify-center rounded-full border border-dashed border-gray-300 p-1.5 text-xs font-medium text-gray-700 dark:border-gray-700 dark:text-gray-50"
                              aria-hidden="true"
                            >
                              {item.initials}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                  {item.name}
                                </div>
                                <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-400/10 dark:text-gray-300">
                                  pending
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {item.email}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <span
                              className="inline-flex size-9 items-center justify-center rounded-full bg-gray-50 p-1.5 text-xs font-medium text-gray-700 ring-1 ring-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:ring-gray-700"
                              aria-hidden="true"
                            >
                              {item.initials}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {item.email}
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{item.dateAdded}</TableCell>
                      <TableCell>{item.lastActive}</TableCell>
                      <TableCell>
                        {item.status === "pending" ? (
                          <Button
                            variant="secondary"
                            className="justify-center sm:w-36 dark:border dark:border-gray-800 dark:bg-[#090E1A] hover:dark:bg-gray-950/50"
                          >
                            Resend
                          </Button>
                        ) : (
                          <Select defaultValue={item.permission}>
                            <SelectTrigger
                              className="sm:w-36"
                              aria-label={`Change permission for ${item.name}`}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.label}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="p-2.5 text-gray-600 transition-all hover:border hover:border-gray-300 hover:bg-gray-50 hover:text-red-500 dark:text-gray-400 hover:dark:border-gray-800 hover:dark:bg-gray-900 hover:dark:text-red-500"
                              aria-label={`Delete ${item.name}`}
                            >
                              <Trash2
                                className="size-4 shrink-0"
                                aria-hidden="true"
                              />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Please confirm</DialogTitle>
                              <DialogDescription className="mt-1 text-sm leading-6">
                                Are you sure you want to delete {item.name}?
                                This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-6">
                              <DialogClose asChild>
                                <Button
                                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                                  variant="secondary"
                                >
                                  Cancel
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  className="w-full sm:w-fit"
                                  variant="destructive"
                                >
                                  Delete
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
        </div>
      </form>
    </section>
  )
}
