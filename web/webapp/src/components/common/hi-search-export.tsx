import { useState, useEffect } from "react";
import { FaSearch, FaDownload } from 'react-icons/fa'; // Importando ícones do react-icons

export function HiClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [greeting, setCumprimento] = useState('');
    const userName = 'Geraldo';

    useEffect(() => {
        const updateGreeting = () => {
            const hora = new Date().getHours();
            const novoCumprimento = hora >= 5 && hora < 12
                ? 'Bom dia'
                : hora >= 12 && hora < 18
                    ? 'Boa tarde'
                    : 'Boa noite';
            setCumprimento(novoCumprimento);
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert('Por favor, digite algo para pesquisar');
            return;
        }

        setIsSearching(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Pesquisa realizada com sucesso!');
        } catch (error) {
            alert('Erro ao realizar a pesquisa. Tente novamente.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleExportClick = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Dados exportados com sucesso!');
        } catch (error) {
            alert('Erro ao exportar dados. Tente novamente.');
        }
    };

    const userNameGreeting = `${greeting}, ${userName}!`

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="text-2xl font-semibold text-gray-800 animate-fadeIn">
                    {userNameGreeting}
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-80">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Pesquise imóvel ou imobiliária"
                            className="p-2 pl-10 border rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSearching}
                        />
                        <FaSearch className="absolute left-3 top-2 w-5 h-5 text-gray-500" />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-200 ${isSearching ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                            }`}
                    >
                        {isSearching ? 'Buscando...' : 'Buscar'}
                    </button>
                    <button
                        onClick={handleExportClick}
                        disabled={isSearching}
                        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-200 ${isSearching ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                            }`}
                    >
                        <FaDownload className="w-5 h-5 mr-2 inline" />
                        Exportar
                    </button>
                </div>
            </div>
        </div>
    );
}
