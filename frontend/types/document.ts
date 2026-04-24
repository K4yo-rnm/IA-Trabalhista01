export type Document = {
    id: number;
    case_id: number;
    file_name: string;
    file_type: string | null;
    file_path: string;
    extracted_text: string | null;
    analysis: {
        reclamante: string | null;
        reclamada: string | null;
        salario: string | null;
        pedidos: string[];
        resumo: string;
    } | null
    created_at: string;
}