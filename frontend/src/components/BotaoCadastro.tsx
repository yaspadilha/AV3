import './components.css';

type Props = {
    titulo: string;
    onClick?: () => void;
};

function BotaoCadastro({ titulo, onClick }: Props) {
    return (
        <button className="botao-cadastro" onClick={onClick}>{titulo}</button>
    )
}

export default BotaoCadastro;