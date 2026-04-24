
const API_URL = "http://127.0.0.1:8000";

export async function getCases() {
    const response = await fetch(`${API_URL}/cases`, {
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar casos");
    }

    return response.json()
}

export async function getCaseById(id: string) {
    const response = await fetch(`${API_URL}/cases/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar caso");
    }

    return response.json();
}

export async function createCase(data: {
    title: string;
    client_name: string;
    process_number: string;
}) {
    const response = await fetch(`${API_URL}/cases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar Caso");
    }

    return response.json();
}

export async function uploadDocument(caseId: number, file: File) {
    const formData = new FormData();
    formData.append("case_id", String(caseId));
    formData.append("file", file);

    const response = await fetch(`${API_URL}/documents/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error ao enviar Documento");
    }

    return response.json();
}

export async function generateDraft(caseId: number) {
    const response = await fetch(`${API_URL}/cases/${caseId}/generate-draft`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Erro ao Gerar Contestação")
    }

    return response.json();
}

export async function getDocuments(caseId: number) {
    const response = await fetch(`${API_URL}/cases/${caseId}/documents`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar documento");
    }

    return response.json();
}