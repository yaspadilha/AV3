import CardAeronaves from "../../components/CardAeronaves";
import BotaoCadastro from "../../components/BotaoCadastro";
import Modal from "../../components/Modal";
import './Aeronave.css';
import { useState, useEffect } from "react";

interface AeronaveData {
    codigo: number;
    modelo: string;
    tipo_aeronave: string;
    capacidade: number;
    alcance: number;
}

function Aeronave() {
    const [aeronaves, setAeronaves] = useState<AeronaveData[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const [modelo, setModelo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [tipo, setTipo] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [alcance, setAlcance] = useState("");

    useEffect(() => {
        carregarAeronaves();
    }, []);

    async function carregarAeronaves() {
        try {
            const response = await fetch('http://localhost:3000/aeronaves');
            if (response.ok) {
                const data = await response.json();
                setAeronaves(data);
            }
        } catch (error) {
            console.error("Erro ao buscar aeronaves:", error);
        }
    }

    async function cadastrar() {
        if (!modelo || !tipo || !capacidade || !alcance) {
            alert("Preencha todos os campos antes de cadastrar!");
            return;
        }

        const tipoFormatado = tipo.toLowerCase();
        if (tipoFormatado !== "comercial" && tipoFormatado !== "militar") {
            alert('O campo "Tipo" só pode ser "Comercial" ou "Militar".');
            return;
        }

        const novaAeronave = {
            modelo: modelo.toLowerCase(), 
            tipo_aeronave: tipoFormatado, 
            capacidade: Number(capacidade),
            alcance: Number(alcance)
        };

        try {
            const response = await fetch('http://localhost:3000/aeronaves', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaAeronave)
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                setOpen(false);
                carregarAeronaves(); 
                setModelo("");
                setCodigo("");
                setTipo("");
                setCapacidade("");
                setAlcance("");
            } else {
                const erro = await response.json();
                alert("Erro ao cadastrar: " + (erro.erro || "Verifique os dados."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="container-aeronaves">
            <div className="topo-aeronaves">
                <h1 className="aeronaves-titulo">Aeronaves cadastradas</h1>
                <BotaoCadastro titulo="Cadastrar aeronave +" onClick={() => setOpen(!open)} />
            </div>

            <Modal
                isOpen={open}
                titulo="Cadastrar nova aeronave"
                legendaBotao="Cadastrar"
                onConfirm={cadastrar}
                onClose={() => setOpen(false)}
            >
                <div className="inputs">
                    <input className="form-input" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} />
                    <input className="form-input" placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
                    <input className="form-input" placeholder="Tipo (Comercial/Militar)" value={tipo} onChange={e => setTipo(e.target.value)} />
                    <input className="form-input" placeholder="Capacidade" value={capacidade} onChange={e => setCapacidade(e.target.value)} />
                    <input className="form-input" placeholder="Alcance" value={alcance} onChange={e => setAlcance(e.target.value)} />
                </div>
            </Modal>

            <div className="tabela-aeronaves">
                {aeronaves.map((item) => (
                    <CardAeronaves 
                        key={item.codigo}
                        modelo={item.modelo.charAt(0).toUpperCase() + item.modelo.slice(1)} 
                        codigo={String(item.codigo)}
                        status="Ativo" 
                        tipo={item.tipo_aeronave.charAt(0).toUpperCase() + item.tipo_aeronave.slice(1)}
                        capacidade={`${item.capacidade} passageiros`}
                        alcance={`${item.alcance} km`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Aeronave;