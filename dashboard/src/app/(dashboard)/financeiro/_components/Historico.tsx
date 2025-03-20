
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Historico = () => {
    const [historico, setHistorico] = useState([]);
    const [previsao, setPrevisao] = useState([]);

    useEffect(() => {
        const fetchHistorico = async () => {
            const res = await fetch('/api/historico');  // Rota para buscar histórico
            const data = await res.json();
            setHistorico(data);
            calcularPrevisao(data);
        };

        fetchHistorico();
    }, []);

    const calcularPrevisao = (dados: any) => {
        // Implementação simples de regressão linear para previsão (apenas ilustrativa)
        const previsao = dados.map((item, index) => ({
            data: item.data,
            valorPrevisto: item.valor + (index * 10), // Exemplo simples de previsão
        }));
        setPrevisao(previsao);
    };

    const chartData = {
        labels: historico.map((item) => item.data),
        datasets: [
            {
                label: 'Valores Pagos',
                data: historico.map((item) => item.valor),
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Previsão',
                data: previsao.map((item) => item.valorPrevisto),
                borderColor: 'red',
                fill: false,
                borderDash: [5, 5],
            },
        ],
    };

    return (
        <div className="historico-container">
            <h2>Visão de Histórico</h2>
            <Line data={chartData} />
        </div>
    );
};

export default Historico;
