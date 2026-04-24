

import Link from "next/link";
import { getCaseById } from "@/services/api";
import { Case } from "@/types/case";
import CaseDetailClient from "@/components/Case_Detail_Client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const caseData: Case = await getCaseById(id);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-5xl mx-auto space-y-6">
              
            {/* HEADER */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                    {caseData.title}
                    </h1>
                    <p className="text-sm text-gray-900">
                    {caseData.client_name}
                    </p>
                </div>

                <Link
                    href="/"
                    className="bg-gray-900 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm"
                >
                    Voltar
                </Link>
            </div>

            {/* DADOS DO CASO */}
            <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-2 text-gray-950">
                <p><strong>ID:</strong> {caseData.id}</p>
                <p><strong>Processo:</strong> {caseData.process_number}</p>
                <p><strong>Status:</strong> {caseData.status}</p>
            </div>

              <CaseDetailClient caseData={caseData} />
        </div>
    </main>
  );
}