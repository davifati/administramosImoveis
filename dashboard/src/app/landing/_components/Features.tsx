'use client';
import { motion } from 'framer-motion';
import { PlaystoreButton } from './PlayStore';
import { AppStore } from './AppStore';


export const FeatureSection = () => {
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
                "✔️ Exporte em planilhas Excel",
                "✔️ API de integração com CRM ",
            ],
            imageSrc: "/img/img-monitoramento.png",
        },
        {
            title: "Automação de Extração de Boletos",
            subtitle: "Reduza custos operacionais e tenha mais controle",
            topics: [
                "✔️ Reduza tarefas manuais",
                "✔️ Aumente a eficiência do processo",
                "✔️ Melhore a consistência e precisão",
            ],
            imageSrc: "/img/img-monitoramento.png",
        },
    ];

    return (
        <div className="space-y-12"> {/* Diminuindo a margem entre as seções */}
            {featureData.map((item, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between px-6 py-12 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
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
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
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

            <div className="flex items-center justify-between px-6 py-12">
                {/* Lado esquerdo: Imagem com efeito hover */}
                <div className="w-1/3 relative group order-1 lg:order-1">
                    <motion.div
                        className="w-full h-full overflow-hidden rounded-lg shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <img
                            src="/img/img-alerta2.png"
                            alt="Propius APP"
                            className="object-cover w-full h-full"
                        />
                    </motion.div>
                </div>

                {/* Lado direito: Texto e tópicos */}
                <div className="w-1/2 space-y-6 order-2 lg:order-2">
                    <h2 className="text-3xl font-semibold text-gray-800">Propius App</h2>
                    <p className="text-lg text-gray-600">
                        Através de um app intuitivo,<br />acompanhe todos os débitos dos imóveis.
                    </p>
                    <ul className="space-y-3">
                        <li className="text-gray-600">✓ Emissão de boletos</li>
                        <li className="text-gray-600">✓ Gerar remessa bancária</li>
                        <li className="text-gray-600">✓ Notificações e alertas automatizados</li>
                    </ul>

                    <div className="flex gap-4 mt-6">
                        < PlaystoreButton />
                        < AppStore />
                    </div>



                </div>
            </div>

        </div>
    );
};
