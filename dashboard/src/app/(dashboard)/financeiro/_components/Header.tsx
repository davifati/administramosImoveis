"use client"

import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { useQueryState } from "nuqs"
import React from "react"

import { DEFAULT_RANGE } from "./dateRanges"

function FormattedDate() {
  const [dateString, setDateString] = React.useState<string>("")

  React.useEffect(() => {
    const date = new Date(new Date().setHours(new Date().getHours() - 1))
    setDateString(
      date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    )
  }, [])

  return (
    <p className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
      Atualizado em {dateString}
    </p>
  )
}

export default function Header() {
  const scrolled = useScroll(10)

  const [, setRange] = useQueryState("range")
  const [, setExpenseStatus] = useQueryState("expense_status")
  const [, setAmountRange] = useQueryState("amount_range")
  const [, setSelectedCountries] = useQueryState("countries")

  const handleResetFilters = () => {
    setRange(DEFAULT_RANGE)
    setExpenseStatus(null)
    setAmountRange(null)
    setSelectedCountries(null)
  }

  return (
    <section
      aria-labelledby="reports-title"
      className={cx(
        "sticky top-16 z-50 -my-6 flex flex-col gap-6 bg-white py-6 md:flex-row md:flex-wrap md:items-center md:justify-between lg:top-0 dark:bg-gray-925",
        scrolled &&
        "border-b border-gray-200 transition-all dark:border-gray-900",
      )}
    >
      <div className="space-y-1">
        <h1
          id="reports-title"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Gestão de Boletos
        </h1>
        <FormattedDate />
      </div>


    </section>
  )
}
