import './components.css';

interface CardAeronavesProps {
  nome: string;
  tipo: string;
  fornecedor: string;
  status: string;
}

function CardAeronaves({
  nome,
  tipo,
  fornecedor,
  status
}: CardAeronavesProps) {
  return (
    <div className='card-pecas'>
        <h1 className='card-pecas-titulo'>{nome}</h1>
        <h2 className='card-pecas-subtitulo'>Tipo</h2>
        <h3 className='card-pecas-texto'>{tipo}</h3>
        <h2 className='card-pecas-subtitulo'>Fornecedor</h2>
        <h3 className='card-pecas-texto'>{fornecedor}</h3>
        <h3 className='card-pecas-status'>{status}</h3>
    </div>
  );
}

export default CardAeronaves;