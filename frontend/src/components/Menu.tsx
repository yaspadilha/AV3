import { Link, useNavigate } from 'react-router-dom';
import './components.css';
import { useAuth } from '../contexts/AuthContext';

function Menu() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="menu">
            <Link to="/aeronaves" className="botao-menu">Aeronaves</Link>
            <Link to="/pecas" className="botao-menu">Peças</Link>
            <Link to="/etapas" className="botao-menu">Etapas</Link>
            
            {/* Só exibe este link se for administrador */}
            {user?.nivel_permissao === 'administrador' && (
                <Link to="/funcionarios" className="botao-menu">Funcionários</Link>
            )}

            <Link to="/relatorios" className="botao-menu">Relatórios</Link>
            <Link to="/testes" className="botao-menu">Testes</Link>
            
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', textTransform: 'capitalize' }}>
                    Olá, {user?.nome} ({user?.nivel_permissao})
                </span>
                <button onClick={handleLogout} className="botao-menu" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'red' }}>
                    Sair
                </button>
            </div>
        </div>
    )
}

export default Menu;