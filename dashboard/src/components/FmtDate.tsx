import React from "react"


export function FormattedDate() {
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