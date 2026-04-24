"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCase } from "@/services/api";

export default function NewCasePage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [processNumber, setProcessNumber] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        
        try {
            await createCase({
                title,
                client_name: clientName,
                process_number: processNumber,
            });

            setMessage("Caso criado com sucesso!")

            setTitle("");
            setClientName("")
            setProcessNumber("")

            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch {
            setMessage("Error ao criar caso");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Novo Caso</h1>

            <form onSubmit={handleSubmit} className="space-y-4 border rounded-xl">
                <div>
                    <label className="block mb-1 font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Ex: Reclamação Trabalhista Jõao"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Cliente</label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Ex: Empresa x"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Número do Processo</label>
                    <input
                        type="text"
                        value={processNumber}
                        onChange={(e) => setProcessNumber(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Ex: 0001234-56.2026.5.01.0001"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Salvando..." : "Criar caso"}
                </button>

                {message && (
                    <p className="text-sm mt-2">{message}</p>
                )}
            </form>
        </main>
    )
}