'use client'

import { motion } from 'framer-motion';

export const FeatureSection = () => {
    // Dados das seções de features
    const featureData = [
        {
            title: "Gerencie boletos e encargos de forma simples",
            subtitle: "Controle todos os seus boletos e encargos de forma fácil e rápida, diretamente no painel.",
            topics: [
                "✔️ Facilidade no gerenciamento de pagamentos",
                "✔️ Acompanhamento de vencimentos e pagamentos",
                "✔️ Notificações automáticas de vencimento",
            ],
            imageSrc: "/img/img-monitoramento.png",
        },
        {
            title: "Pague tudo de uma vez - Remessa bancária",
            subtitle: "Faça pagamentos de remessas bancárias sem complicação e de maneira centralizada.",
            topics: [
                "✔️ Pagamentos de múltiplos boletos de uma vez",
                "✔️ Integração com bancos",
                "✔️ Mais agilidade no processo",
            ],
            imageSrc: "/img/img-monitoramento.png",
        },
        {
            title: "Automação de bots",
            subtitle: "Deixe os bots automatizados para tarefas repetitivas e ganhe mais tempo.",
            topics: [
                "✔️ Reduza tarefas manuais",
                "✔️ Aumente a eficiência do processo",
                "✔️ Melhore a consistência e precisão",
            ],
            imageSrc: "/img/img-monitoramento.png",
        },
    ];

    return (
        <div className="space-y-16">
            {featureData.map((item, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between px-6 py-24 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
                >
                    {/* Lado esquerdo: Texto e tópicos */}
                    <div
                        className={`w-1/2 space-y-6 ${index % 2 === 0 ? 'order-2 lg:order-1' : ''}`}
                    >
                        <h2 className="text-3xl font-semibold text-gray-800">{item.title}</h2>
                        <p className="text-lg text-gray-600">{item.subtitle}</p>
                        <ul className="space-y-3">
                            {item.topics.map((topic, idx) => (
                                <li key={idx} className="text-gray-600">{topic}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Lado direito: Imagem com efeito hover */}
                    <div
                        className={`w-1/2 relative group ${index % 2 === 0 ? 'order-1 lg:order-2' : ''}`}
                    >
                        <motion.div
                            className="w-full h-full overflow-hidden rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={item.imageSrc}
                                alt={item.title}
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
};


