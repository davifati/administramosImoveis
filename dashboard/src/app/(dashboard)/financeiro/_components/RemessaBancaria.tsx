// components/RemessaBancaria.tsx

const RemessaBancaria = ({ boletos }) => {
    const gerarRemessa = () => {
        // Lógica para gerar o arquivo de remessa bancária (exemplo simples em texto)
        const remessa = boletos
            .map((boleto) => `${boleto.imobiliaria} | ${boleto.valor} | ${boleto.vencimento}`)
            .join('\n');

        const blob = new Blob([remessa], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'remessa_bancaria.txt';
        link.click();
    };

    return (
        <div className="remessa-container">
            <h2>Geração de Remessa Bancária</h2>
            <button onClick={gerarRemessa}>Gerar Remessa Bancária</button>
        </div>
    );
};

export default RemessaBancaria;
