import { getBoletoAcumuladoAdministradora } from "../_api/boletos";


const boletos = await getBoletoAcumuladoAdministradora()

export const rankingAdministradoras = boletos.reduce((acc, boleto) => {
    if (!acc[boleto.administradora]) {
        acc[boleto.administradora] = { valor: 0, quantidade: 0 };
    }
    acc[boleto.administradora].valor += boleto.valor;
    acc[boleto.administradora].quantidade += 1;
    return acc;
}, {});


export const rankingValores = Object.entries(rankingAdministradoras)
    //@ts-ignore
    .map(([name, data]) => ({ name, value: data.valor }))
    .sort((a, b) => b.value - a.value);

export const rankingQuantidade = Object.entries(rankingAdministradoras)
    //@ts-ignore
    .map(([name, data]) => ({ name, value: data.quantidade }))
    .sort((a, b) => b.value - a.value);


export const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(number)}`;
