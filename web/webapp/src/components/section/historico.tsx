import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricoInadimplencia = () => {
    // Dados fictícios para o gráfico de inadimplência (você pode substituir por dados reais)
    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'], // Meses
        datasets: [
            {
                label: 'Inadimplência (%)',
                data: [10, 20, 15, 30, 25, 35, 40], // Porcentagem de inadimplência
                borderColor: '#FF5733', // Cor da linha do gráfico
                backgroundColor: 'rgba(255, 87, 51, 0.2)', // Cor de fundo da linha
                fill: true,
                tension: 0.4, // Curvatura da linha
                pointBackgroundColor: '#FF5733', // Cor dos pontos da linha
                pointRadius: 5, // Tamanho dos pontos
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Histórico de Inadimplência', // Título do gráfico
                font: { size: 18 },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw}%`; // Formatar tooltip para mostrar a porcentagem
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Meses', // Título do eixo X
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Porcentagem', // Título do eixo Y
                },
                min: 0, // Valor mínimo
                max: 100, // Valor máximo
                ticks: {
                    stepSize: 10, // Incremento do eixo Y
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Histórico de Inadimplência</h2>
            <div className="w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default HistoricoInadimplencia;
