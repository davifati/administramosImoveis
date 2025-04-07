
export const imobiliarias = [
    { nome: 'APSA', id: '1' },
    { nome: 'BCF', id: '2' },
    { nome: 'ABRJ', id: '3' },
    { nome: 'Protel', id: '4' },
    { nome: 'Imobiliária XYZ', id: '5' },
    // Adicionar mais imobiliárias conforme necessário
];

const statusTypes = {
    ok: "Ok",
    falha: "Falha",
    manutencao: "Manutenção Programada",
    inatividade: "Inatividade"
};

const status = Object.values(statusTypes);

// Gera um status com base na distribuição de probabilidades
export const generateRandomStatus = () => {
    const rand = Math.random();
    if (rand < 0.8) return statusTypes.inatividade; // 80% de probabilidade para "inatividade"
    if (rand < 0.9) return statusTypes.ok; // 10% para "ok"
    return statusTypes.manutencao; // Restante (10%) para "manutenção"
};
