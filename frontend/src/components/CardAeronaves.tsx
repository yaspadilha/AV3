import './components.css';
import { PiAirplaneTiltFill } from "react-icons/pi";

interface CardAeronavesProps {
  modelo: string;
  codigo: string;
  status: string;
  tipo: string;
  capacidade: string;
  alcance: string;
}

function CardAeronaves({
  modelo,
  codigo,
  status,
  tipo,
  capacidade,
  alcance,
}: CardAeronavesProps) {
  return (
    <div className='card-aeronaves'>
      <div className='card-aeronaves-topo'>
        <div className='card-aeronaves-titulo'>
          <PiAirplaneTiltFill className='card-aeronaves-icone' />
          <h1 className='aeronave-modelo'>{modelo}</h1>
        </div>
        <h2 className='aeronave-status'>{status}</h2>
      </div>

      <div className="descricao">
        <ul className='lista'>
          <li>
            <strong>Código</strong>
            <span>{codigo}</span>
          </li>
          <li>
            <strong>Tipo</strong>
            <span>{tipo}</span>
          </li>
          <li>
            <strong>Capacidade</strong>
            <span>{capacidade}</span>
          </li>
          <li>
            <strong>Alcance</strong>
            <span>{alcance}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CardAeronaves;