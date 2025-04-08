export function valueFormatter(number: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short',
    });
    return formatter.format(number);
}
