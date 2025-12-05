import './Pecas.css';
import CardPecas from '../../components/CardPecas';
import BotaoCadastro from '../../components/BotaoCadastro';
import Modal from '../../components/Modal';
import { useState, useEffect } from 'react';

interface PecaData {
    id_peca: number;
    nome: string;
    tipo: string;
    fornecedor: string;
    status: string;
    codigo: number; 
}

function Pecas() {
    const [pecas, setPecas] = useState<PecaData[]>([]);
    const [open, setOpen] = useState(false);

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [status, setStatus] = useState("");
    const [codigoAeronave, setCodigoAeronave] = useState(""); 

    useEffect(() => {
        fetchPecas();
    }, []);

    async function fetchPecas() {
        try {
            const response = await fetch('http://localhost:3000/pecas');
            if (response.ok) {
                const data = await response.json();
                setPecas(data);
            }
        } catch (error) {
            console.error("Erro ao buscar peças:", error);
        }
    }

    async function cadastrar() {
        if (!nome || !tipo || !fornecedor || !status || !codigoAeronave) {
            alert("Preencha todos os campos!");
            return;
        }

        if (!["nacional", "importada"].includes(tipo.toLowerCase())) {
            alert('Tipo inválido! Use: nacional ou importada.');
            return;
        }

        let statusFormatado = status.toLowerCase().replace(" ", "_"); 
        statusFormatado = statusFormatado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (!["em_producao", "em_transporte", "pronta"].includes(statusFormatado)) {
            alert('Status inválido! Use: em_producao, em_transporte ou pronta.');
            return;
        }

        const novaPeca = {
            nome,
            tipo: tipo.toLowerCase(),
            fornecedor,
            status: statusFormatado,
            codigo: Number(codigoAeronave) 
        };

        try {
            const response = await fetch('http://localhost:3000/pecas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaPeca)
            });

            if (response.ok) {
                alert("Peça cadastrada!");
                setOpen(false);
                fetchPecas();
                setNome("");
                setTipo("");
                setFornecedor("");
                setStatus("");
                setCodigoAeronave("");
            } else {
                const erro = await response.json();
                alert("Erro ao cadastrar: " + (erro.erro || "Verifique os dados (Aeronave existe?)."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão.");
        }
    }

    return (
        <>
            <h1 className="pecas-titulo">Peças cadastradas</h1>
            <div className='botoes-pecas'>
                <BotaoCadastro titulo="Cadastrar peça +" onClick={() => setOpen(!open)} />

                <Modal
                    isOpen={open}
                    titulo="Cadastrar peça"
                    legendaBotao="Cadastrar"
                    onConfirm={cadastrar}
                    onClose={() => setOpen(false)}
                >
                    <div className="inputs">
                        <input className="form-input" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                 
                        <input className="form-input" type="number" placeholder="Cód. da Aeronave (ID)" value={codigoAeronave} onChange={e => setCodigoAeronave(e.target.value)} />
                        
                        <input className="form-input" placeholder="Tipo (nacional ou importada)" value={tipo} onChange={e => setTipo(e.target.value)} />
                        <input className="form-input" placeholder="Fornecedor" value={fornecedor} onChange={e => setFornecedor(e.target.value)} />
                        <input className="form-input" placeholder="Status (em_producao, em_transporte, pronta)" value={status} onChange={e => setStatus(e.target.value)} />
                    </div>
                </Modal>
            </div>

            <div className='container-pecas'>
                {pecas.map((item) => (
                    <CardPecas 
                        key={item.id_peca}
                        nome={item.nome} 
                        tipo={item.tipo} 
                        fornecedor={item.fornecedor} 
                        status={item.status.replace("_", " ")} 
                    />
                ))}
            </div>
        </>
    )
}

export default Pecas;