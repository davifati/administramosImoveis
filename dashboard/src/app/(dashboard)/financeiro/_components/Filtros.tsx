
import { useQueryState } from 'next-usequerystate'; // Presumindo que usequerystate está configurado

const Filters = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
    const [range, setRange] = useQueryState('range');
    const [imobiliaria, setImobiliaria] = useQueryState('imobiliaria');
    const [top10, setTop10] = useQueryState('top10');

    const handleFilterChange = () => {
        onFilterChange({ range, imobiliaria, top10 });
    };

    return (
        <div className="filters-container">
            <div className="filter-item">
                <label>Filtro Temporal:</label>
                <input type="month" value={range} onChange={(e) => setRange(e.target.value)} />
            </div>
            <div className="filter-item">
                <label>Imobiliária:</label>
                <select value={imobiliaria} onChange={(e) => setImobiliaria(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="imob1">Imobiliária 1</option>
                    <option value="imob2">Imobiliária 2</option>
                </select>
            </div>
            <div className="filter-item">
                <label>Top 10:</label>
                <input
                    type="checkbox"
                    checked={top10}
                    onChange={(e) => setTop10(e.target.checked)}
                />
            </div>
            <button onClick={handleFilterChange}>Aplicar Filtros</button>
        </div>
    );
};

export default Filters;
