import './components.css';

interface CardTestesProps {
    aeronave : string,
    tipo: string;
    data: string;
    status: string;
    responsavel : string;
}

function CardTestes({
    aeronave,
    tipo,
    data,
    responsavel,
    status
}: CardTestesProps) {
    return (
        <div className='card-testes'>
            <h1 className='card-testes-titulo'>{aeronave}</h1>
            <h2 className='card-testes-texto'><strong>Tipo de teste: </strong>{tipo}</h2>
            <h2 className='card-testes-texto'><strong>Realizado em: </strong> {data}</h2>
            <h2 className='card-testes-texto'><strong>Funcionário responsável: </strong> {responsavel}</h2>
            <h2 className='card-testes-status'>{status}</h2>
        </div>
    );
}

export default CardTestes;