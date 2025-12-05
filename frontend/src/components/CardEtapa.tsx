import './components.css';

interface CardEtapaProps {
  nomeEtapa: string;
  prazo: string;
  status: string;
}

function CardEtapa({
  nomeEtapa,
  prazo,
  status
}: CardEtapaProps) {
  return (
    <div className='card-etapa'>
        <h1 className='card-etapa-titulo'>{nomeEtapa}</h1>
        <h2 className='card-etapa-prazo'>{prazo}</h2>
        <h2 className='card-etapa-status'>{status}</h2>
    </div>
  );
}

export default CardEtapa;