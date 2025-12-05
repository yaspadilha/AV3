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
            <h1>{modelo}</h1>
            <div className='card-relatorio'>
                <div className='card-relatorio-detalhes'>
                    <h2 className='card-relatorio-titulo'>Detalhes</h2>
                    <p className='card-relatorio-texto'>Código: {codigo}</p>
                    <p className='card-relatorio-texto'>Tipo: {tipo}</p>
                    <p className='card-relatorio-texto'>Capacidade: {capacidade}</p>
                    <p className='card-relatorio-texto'>Alcance: {alcance}</p>
                </div>
                <div className='card-relatorio-detalhes'>
                    <h2 className='card-relatorio-titulo'>Etapas</h2>
                    <p className='card-relatorio-texto'>Etapas: {etapas}</p>
                </div>
                <div className='card-relatorio-detalhes'>
                    <h2 className='card-relatorio-titulo'>Peças</h2>
                    <p className='card-relatorio-texto'>Peças: {pecas}</p>
                </div>
                <div className='card-relatorio-detalhes'>
                    <h2 className='card-relatorio-titulo'>Testes</h2>
                    <p className='card-relatorio-texto'>Testes: {testes}</p>
                </div>
            </div>
        </div>
    );
}

export default CardRelatorio;