"use client"
import React from "react"
import UserTable from "./_components/UserTable"

export default function Users() {
  return (
    <section aria-labelledby="members-heading">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <UserTable />
        </div>
      </div>
    </section>
  )
}
