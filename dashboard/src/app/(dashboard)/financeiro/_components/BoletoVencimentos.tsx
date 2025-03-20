"use client"

import { useEffect, useState } from 'react';

const BoletoVencimentos = () => {
    const [vencimentos, setVencimentos] = useState([]);
    const [totalPago, setTotalPago] = useState(0);

    // Simulando o fetch de dados com dados mockados
    useEffect(() => {
        // Dados mockados
        const mockVencimentos = [
            { id: 1, imobiliaria: 'Imob 1', vencimento: '2025-03-20', valor: 500.0 },
            { id: 2, imobiliaria: 'Imob 2', vencimento: '2025-03-25', valor: 300.0 },
            { id: 3, imobiliaria: 'Imob 1', vencimento: '2025-04-10', valor: 450.0 },
            { id: 4, imobiliaria: 'Imob 3', vencimento: '2025-04-15', valor: 600.0 },
        ];

        // Simulando o cálculo do total pago
        const total = mockVencimentos.reduce((acc, vencimento) => acc + vencimento.valor, 0);

        // Definindo os dados no estado
        setVencimentos(mockVencimentos);
        setTotalPago(total);
    }, []);

    return (
        <div className="vencimentos-container">
            <h2>Visão de Vencimentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Imobiliária</th>
                        <th>Vencimento</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {vencimentos.map((vencimento) => (
                        <tr key={vencimento.id}>
                            <td>{vencimento.imobiliaria}</td>
                            <td>{new Date(vencimento.vencimento).toLocaleDateString()}</td>
                            <td>{`R$ ${vencimento.valor.toFixed(2)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total">
                <h3>Total a ser Pago:</h3>
                <p>{`R$ ${totalPago.toFixed(2)}`}</p>
            </div>
        </div>
    );
};

export default BoletoVencimentos;
