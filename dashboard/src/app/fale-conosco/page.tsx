"use client"

import { Button } from "@/components/Button"
import { RiWhatsappFill } from "@remixicon/react"
import React from "react"

export default function ContactUs() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
            <div className="flex flex-col items-center text-center sm:max-w-sm w-full">

                {/* Texto de introdução */}
                <p className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">
                    Para dúvidas, entre em contato:
                </p>

                {/* Botão de WhatsApp */}
                <Button asChild variant="secondary" className="mt-2 w-full sm:w-auto">
                    <a href="https://wa.me/15551234567" target="_blank" className="inline-flex items-center gap-2">
                        <RiWhatsappFill className="size-8 shrink-0" aria-hidden="true" />
                        Fale com um especialista
                    </a>
                </Button>

            </div>
        </div>
    )
}
