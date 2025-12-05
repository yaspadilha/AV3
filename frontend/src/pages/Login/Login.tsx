import { GiPadlock } from "react-icons/gi";
import { useNavigate } from "react-router-dom"; 
import './Login.css';
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        if (!usuario || !senha) {
            alert("Preencha usuário e senha!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, senha })
            });

            if (response.ok) {
                const data = await response.json();
                login(data); 
                navigate("/aeronaves");
            } else {
                alert("Usuário ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className="modal-login">
            <GiPadlock className="modal-login-icone" />
            <h1 className="modal-titulo">Acesso restrito</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label className="form-input-conjunto">
                    <input 
                        className="form-input" 
                        type="text" 
                        placeholder="Usuário" 
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input 
                        className="form-input" 
                        type="password" 
                        placeholder="Senha" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </label>
                <button type="submit" className="login-button" style={{ cursor: 'pointer' }}>
                    <span className="login-button-legenda">Entrar</span>
                </button>
            </form>
        </div>
    )
}

export default Login;