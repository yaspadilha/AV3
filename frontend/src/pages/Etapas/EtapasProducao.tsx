import './etapas.css';
import CardEtapa from '../../components/CardEtapa';
import Modal from '../../components/Modal';
import BotaoCadastro from '../../components/BotaoCadastro';
import { useState, useEffect } from 'react';

interface EtapaData {
    id_etapa: number;
    nome: string;
    prazo: string;
    status: string;
    codigo: number;
    id_funcionario: number;
    aeronave?: { modelo: string }; 
}

function EtapasProducao() {
    const [etapas, setEtapas] = useState<EtapaData[]>([]);
    const [open, setOpen] = useState(false);

    const [nome, setNome] = useState("");
    const [prazo, setPrazo] = useState("");
    const [status, setStatus] = useState("");
    const [codigoAeronave, setCodigoAeronave] = useState("");
    const [idFuncionario, setIdFuncionario] = useState("");

    useEffect(() => {
        fetchEtapas();
    }, []);

    async function fetchEtapas() {
        try {
            const response = await fetch('http://localhost:3000/etapas');
            if (response.ok) {
                const data = await response.json();
                setEtapas(data);
            }
        } catch (error) {
            console.error("Erro ao buscar etapas:", error);
        }
    }

    async function cadastrar() {
        if (!nome || !prazo || !status || !codigoAeronave || !idFuncionario) {
            alert("Preencha todos os campos!");
            return;
        }

        let statusFormatado = status.toLowerCase().replace(" ", "_"); 
        if (statusFormatado === "em andamento") statusFormatado = "em_andamento";

        if (!["pendente", "em_andamento", "concluida"].includes(statusFormatado)) {
            alert('Status inválido! Use: pendente, em andamento ou concluida.');
            return;
        }

        const novaEtapa = {
            nome,
            prazo: new Date(prazo).toISOString(), 
            status: statusFormatado,
            codigo: Number(codigoAeronave),
            id_funcionario: Number(idFuncionario)
        };

        try {
            const response = await fetch('http://localhost:3000/etapas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaEtapa)
            });

            if (response.ok) {
                alert("Etapa cadastrada!");
                setOpen(false);
                fetchEtapas();
    
                setNome("");
                setPrazo("");
                setStatus("");
                setCodigoAeronave("");
                setIdFuncionario("");
            } else {
                const erro = await response.json();
                alert("Erro ao cadastrar: " + (erro.erro || "Verifique IDs de Aeronave/Funcionário."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão.");
        }
    }

    const formatarData = (dataISO: string) => {
        if(!dataISO) return "";
        return new Date(dataISO).toLocaleDateString('pt-BR');
    };

    return (
        <>
            <h1 className='titulo-etapas'>Gerenciar etapas de produção</h1>
            <BotaoCadastro titulo="Cadastrar etapa +" onClick={() => setOpen(!open)} />

            <Modal
                isOpen={open}
                titulo="Cadastrar etapa"
                legendaBotao="Cadastrar"
                onConfirm={cadastrar}
                onClose={() => setOpen(false)}
            >
                <div className="inputs">
                    <input className="form-input" placeholder="Nome da Etapa" value={nome} onChange={e => setNome(e.target.value)} />
        
                    <input className="form-input" type="date" placeholder="Prazo" value={prazo} onChange={e => setPrazo(e.target.value)} />
                    
                    <input className="form-input" placeholder="Status (pendente, em andamento, concluida)" value={status} onChange={e => setStatus(e.target.value)} />
                    <input className="form-input" type="number" placeholder="Cód. da Aeronave (ID)" value={codigoAeronave} onChange={e => setCodigoAeronave(e.target.value)} />
                    <input className="form-input" type="number" placeholder="ID do Funcionário Responsável" value={idFuncionario} onChange={e => setIdFuncionario(e.target.value)} />
                </div>
            </Modal>

            <div className='aeronaves' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        
                {etapas.map((item) => (
                    <div className='etapas-aeronave' key={item.id_etapa} style={{ margin: '10px' }}>
                        <h1 className='etapas-titulo'>{item.aeronave?.modelo || "Aeronave"}</h1>
                        <h2 className='etapas-subtitulo'>Etapa: {item.nome}</h2>
                        
                        <CardEtapa 
                            nomeEtapa={item.nome} 
                            prazo={formatarData(item.prazo)} 
                            status={item.status.replace("_", " ")} 
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default EtapasProducao;