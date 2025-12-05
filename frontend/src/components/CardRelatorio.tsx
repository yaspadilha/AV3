import './components.css';

interface CardRelatorioProps {
    modelo: string,
    codigo: string,
    tipo: string,
    capacidade: string,
    alcance: string,
    etapas?: string,
    pecas?: string,
    testes?: string
}

function CardRelatorio({
    modelo,
    codigo,
    tipo,
    capacidade,
    alcance,
    etapas,
    pecas,
    testes
}: CardRelatorioProps) {
    return (
        <div className="container-card-relatorio">
            <div className='card-relatorio'>
                <h1>{modelo}</h1>
                <div className='card-relatorio-detalhes'>
                    <h2>Detalhes</h2>
                    <p>{codigo}</p>
                    <p>{tipo}</p>
                    <p>{capacidade}</p>
                    <p>{alcance}</p>
                </div>
                <div className='card-relatorio-detalhes'>
                    <h2>Etapas</h2>
                    <p>{etapas}</p>
                </div>
                <div className='card-relatorio-detalhes'>
                    <h2>Peças</h2>
                    <p>{pecas}</p>
                </div>
                <div className='card-relatorio-detalhes'>
                    <h2>Testes</h2>
                    <p>{testes}</p>
                </div>
            </div>
        </div>
    );
}

export default CardRelatorio;