import BotaoCadastro from '../../components/BotaoCadastro';
import Modal from '../../components/Modal';
import './Funcionario.css';
import { useState, useEffect } from "react";

interface FuncionarioData {
    id_funcionario: number;
    nome: string;
    nome_usuario: string;
    nivel_permissao: string;
}

function Funcionario() {
    const [funcionarios, setFuncionarios] = useState<FuncionarioData[]>([]);
    const [open, setOpen] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [funcao, setFuncao] = useState("");

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    async function fetchFuncionarios() {
        try {
            const response = await fetch('http://localhost:3000/funcionarios');
            if (response.ok) {
                const data = await response.json();
                setFuncionarios(data);
            }
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
        }
    }

    async function cadastrar() {
        if (!nome || !email || !endereco || !telefone || !senha || !funcao) {
            alert("Preencha todos os campos!");
            return;
        }

        if (!["administrador", "operador", "engenheiro"].includes(funcao.toLowerCase())) {
            alert('Função inválida! Use: administrador, operador ou engenheiro.');
            return;
        }

        const novoFuncionario = {
            nome,
            nome_usuario: email, 
            endereco,
            telefone,
            senha,
            nivel_permissao: funcao.toLowerCase()
        };

        try {
            const response = await fetch('http://localhost:3000/funcionarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoFuncionario)
            });

            if (response.ok) {
                alert("Funcionário cadastrado!");
                setOpen(false);
                fetchFuncionarios();
 
                setNome("");
                setEmail("");
                setEndereco("");
                setTelefone("");
                setSenha("");
                setFuncao("");
            } else {
                const erro = await response.json();
                alert("Erro ao cadastrar: " + (erro.erro || "Erro desconhecido."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão.");
        }
    }

    return (
        <>
            <h1 className='funcionario-titulo'>Gerenciar funcionários</h1>
            <BotaoCadastro titulo="Cadastrar funcionário +" onClick={() => setOpen(!open)} />
            
            <Modal
                isOpen={open}
                titulo="Cadastrar funcionário"
                legendaBotao="Cadastrar"
                onConfirm={cadastrar}
                onClose={() => setOpen(false)}
            >
                <div className="inputs">
                    <input className="form-input" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    <input className="form-input" placeholder="Email (Nome de Usuário)" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="form-input" placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
                    <input className="form-input" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
                    <input className="form-input" type="password" placeholder="Senha provisória" value={senha} onChange={e => setSenha(e.target.value)} />
                    <input className="form-input" placeholder="Função (administrador, operador ou engenheiro)" value={funcao} onChange={e => setFuncao(e.target.value)} />
                </div>
            </Modal>

            <div className='crud-funcionarios'>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Função</th>
                            <th>Email (Usuário)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((func) => (
                            <tr key={func.id_funcionario}>
                                <td>{func.nome}</td>
                                <td style={{ textTransform: 'capitalize' }}>{func.nivel_permissao}</td>
                                <td>{func.nome_usuario}</td>
                                <td>Ativo</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Funcionario;