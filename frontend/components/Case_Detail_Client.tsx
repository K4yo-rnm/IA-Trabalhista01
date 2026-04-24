"use client"

import Card from "./Cards";
import { useState } from "react";
import { useEffect } from "react";
import { getDocuments } from "@/services/api";
import { uploadDocument, generateDraft } from "@/services/api";
import { Document } from "@/types/document";
import { Case } from "@/types/case";

type DraftResponse = {
    case_id: number;
    draft: string;
};

type Props = {
    caseData: Case;
}

export default function CaseDetailClietn({ caseData }: Props) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [documentData, setDocumentData] = useState<Document | null>(null);
    const [draftData, setDraftData] = useState<DraftResponse | null>(null);
    const [message, setMessage] = useState("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [loadingDraft, setLoadingDraft] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        async function fetchDocs() {
            try {
                const data = await getDocuments(caseData.id);
                setDocuments(data);
            } catch {
                setMessage("Erro ao carregar documentos");
            }
        }

        fetchDocs();
    }, [caseData.id]);

    async function handleUpload(){
        if (!selectedFile) {
            setMessage("Selecione um Arquivo PDF!");
            return;
        }

        try {
            setLoadingUpload(true);
            setMessage("");
            
            const result = await uploadDocument(caseData.id, selectedFile);
            setDocumentData(result);
            setMessage("Documento Enviado com sucesso!");
        } catch {
            setMessage("Erro ao enviar documento!");
        } finally {
            setLoadingUpload(false);
        }
    }

    async function handleGenerateDraft() {
        try {
            setLoadingUpload(true);
            setMessage("");

            const result = await generateDraft(caseData.id);
            setDraftData(result);
            setMessage("Constestação Gerada com SUcesso");
        } catch {
            setMessage("Erro ao criar Contestação");
        } finally {
            setLoadingUpload(false);
        }
    }

    return (
        <div className="space-y-6 mt-8">

            <Card title="Documentos do Caso">
                {documents.length === 0 ? (
                    <p className="text-sm text-gray-900">Nenhum documento enviado.</p>
                ) : (
                    <div className="space-y-3">
                    {documents.map((doc) => (
                        <div
                        key={doc.id}
                        className="border rounded-lg p-3 flex justify-between items-center " 
                        >
                        <div>
                            <p className="font-medium text-gray-900">{doc.file_name}</p>
                            <p className="text-xs text-gray-900">
                            {new Date(doc.created_at).toLocaleString("pt-BR")}
                            </p>
                        </div>

                        <button
                            onClick={async () => {
                            try {
                                setLoadingDraft(true);
                                const result = await generateDraft(caseData.id);
                                setDraftData(result);
                            } catch {
                                setMessage("Erro ao gerar contestação");
                            } finally {
                                setLoadingDraft(false);
                            }
                            }}
                            className="bg-blue-600 hover:hover:bg-blue-900 text-white px-3 py-1 rounded-lg text-sm"
                        >
                            Usar
                        </button>
                        </div>
                    ))}
                    </div>
                )}
            </Card>

            {/* UPLOAD */}
            <Card title="Upload da Petição">
            <div className="space-y-3 text-gray-950">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                        }
                    }}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-500 cursor-pointer"
                />

                {selectedFile && (
                <p className="text-sm text-gray-900">
                    Arquivo: {selectedFile.name}
                </p>
                )}

                <button
                onClick={handleUpload}
                disabled={loadingUpload}
                className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                {loadingUpload ? "Enviando..." : "Enviar PDF"}
                </button>

                {message && <p className="text-sm">{message}</p>}
            </div>
            </Card>

            {/* DOCUMENTO */}
            {documentData && (
            <Card title="Documento Enviado">
                <div className="text-gray-950 p-4 rounded-lg">
                    <p><strong>Arquivo:</strong> {documentData.file_name}</p>
                        <p><strong>Tipo:</strong> {documentData.file_type}</p>
                </div>
            </Card>
            )}

            {/* TEXTO EXTRAÍDO */}
            {documentData && (
            <Card title="Texto Extraído">
                <div className="text-gray-950 p-4 rounded-lg whitespace-pre-wrap text-sm">
                {documentData.extracted_text || "Nenhum texto encontrado"}
                </div>
            </Card>
            )}

            {/* ANÁLISE */}
            {documentData?.analysis && (
            <Card title="Análise Jurídica">
                <div className="space-y-2 text-sm text-gray-950">
                <p><strong>Reclamante:</strong> {documentData.analysis.reclamante || "Não identificado"}</p>
                <p><strong>Reclamada:</strong> {documentData.analysis.reclamada || "Não identificada"}</p>
                <p><strong>Salário:</strong> {documentData.analysis.salario || "Não identificado"}</p>

                <div>
                    <strong>Pedidos:</strong>
                    <ul className="list-disc ml-5 mt-1">
                    {documentData.analysis.pedidos.length ? (
                        documentData.analysis.pedidos.map((p, i) => (
                        <li key={i}>{p}</li>
                        ))
                    ) : (
                        <li>Nenhum pedido identificado</li>
                    )}
                    </ul>
                </div>

                <p><strong>Resumo:</strong> {documentData.analysis.resumo}</p>
                </div>

                <button
                onClick={handleGenerateDraft}
                disabled={loadingDraft}
                className="mt-4 bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                {loadingDraft ? "Gerando..." : "Gerar Contestação"}
                </button>
            </Card>
            )}

            {/* CONTESTAÇÃO */}
            {draftData && (
            <Card title="Contestação Gerada">
                <div className="bg-gray-50 text-gray-900 p-4 rounded-lg whitespace-pre-wrap text-sm">
                {draftData.draft}
                </div>

                <button
                onClick={() => navigator.clipboard.writeText(draftData.draft)}
                className="mt-4 bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
                >
                Copiar Contestação
                </button>
            </Card>
            )}
        </div>
    );
}


