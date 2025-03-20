// app/users/page.tsx
"use client"
import React from "react"
import UserTable from "./_components/UserTable"

export default function Users() {
  return (
    <section aria-labelledby="members-heading">
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
          <UserTable /> {/* Usando o componente UserTable aqui */}
        </div>
      </div>
    </section>
  )
}
