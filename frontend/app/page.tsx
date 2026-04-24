
import Link from "next/link"
import { getCases } from "@/services/api";
import { Case } from "@/types/case";

export default async function HomePage() {
  const cases: Case[] = await getCases();

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb4">IA Trabalhista</h1>
          <p className="mb-6 text-gray-600">Lista de casos cadastrados</p>
        </div>

        <Link
          href="/new-case"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Novo Caso
        </Link>
      </div>
      
      <div className="space-y-4">
        {cases.map((item) => (
          <Link
            key={item.id}
            href={`cases/${item.id}`}
            className="block border rounded-xl p-4 shadow-sm hover:bg-gray-500"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p><strong>Cliente:</strong> {item.client_name}</p>
            <p><strong>Processo:</strong> {item.process_number}</p>
            <p><strong>Status:</strong> {item.status}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
