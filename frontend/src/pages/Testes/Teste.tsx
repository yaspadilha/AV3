import BotaoCadastro from '../../components/BotaoCadastro';
import CardTestes from '../../components/CardTestes';
import Modal from '../../components/Modal';
import './Teste.css';
import { useState, useEffect } from 'react';

interface TesteData {
    id_teste: number;
    tipo: string;
    data_realizacao: string;
    resultado: string;
    funcionario: { nome: string };
    aeronaves: { modelo: string }[];
}

function Teste() {
    const [testes, setTestes] = useState<TesteData[]>([]);
    const [open, setOpen] = useState(false);

    const [tipo, setTipo] = useState("");
    const [resultado, setResultado] = useState("");
    const [dataRealizacao, setDataRealizacao] = useState("");
    const [idFuncionario, setIdFuncionario] = useState("");
    const [codigoAeronave, setCodigoAeronave] = useState("");

    useEffect(() => {
        fetchTestes();
    }, []);

    async function fetchTestes() {
        try {
            const response = await fetch('http://localhost:3000/testes');
            if (response.ok) {
                const data = await response.json();
                setTestes(data);
            }
        } catch (error) {
            console.error("Erro ao buscar testes:", error);
        }
    }

    async function cadastrar() {
        if (!tipo || !resultado || !dataRealizacao || !idFuncionario || !codigoAeronave) {
            alert("Preencha todos os campos!");
            return;
        }

        let tipoFormatado = tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!["eletrico", "hidraulico", "aerodinamico"].includes(tipoFormatado)) {
            alert('Tipo inválido! Use: eletrico, hidraulico ou aerodinamico.');
            return;
        }

        if (!["aprovado", "reprovado"].includes(resultado.toLowerCase())) {
            alert('Resultado inválido! Use: aprovado ou reprovado.');
            return;
        }

        const novoTeste = {
            tipo: tipoFormatado,
            resultado: resultado.toLowerCase(),
            data_realizacao: new Date(dataRealizacao).toISOString(),
            id_funcionario: Number(idFuncionario),
            codigo_aeronave: Number(codigoAeronave)
        };

        try {
            const response = await fetch('http://localhost:3000/testes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoTeste)
            });

            if (response.ok) {
                alert("Teste cadastrado!");
                setOpen(false);
                fetchTestes();
                setTipo("");
                setResultado("");
                setDataRealizacao("");
                setIdFuncionario("");
                setCodigoAeronave("");
            } else {
                const erro = await response.json();
                alert("Erro ao cadastrar: " + (erro.erro || "Verifique IDs."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão.");
        }
    }

    const formatarData = (dataISO: string) => {
        if (!dataISO) return "";
        return new Date(dataISO).toLocaleDateString('pt-BR');
    };

    return (
        <>
            <h1 className='testes-titulo'>Gerenciar testes</h1>

            <BotaoCadastro titulo="Cadastrar teste +" onClick={() => setOpen(!open)} />

            <Modal
                isOpen={open}
                titulo="Cadastrar teste"
                legendaBotao="Cadastrar"
                onConfirm={cadastrar}
                onClose={() => setOpen(false)}
            >
                <div className="inputs">
                    <input
                        className="form-input"
                        placeholder="Tipo (eletrico, hidraulico, aerodinamico)"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    />
                    <input
                        className="form-input"
                        placeholder="Resultado (aprovado ou reprovado)"
                        value={resultado}
                        onChange={e => setResultado(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="date"
                        placeholder="Data de Realização"
                        value={dataRealizacao}
                        onChange={e => setDataRealizacao(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="number"
                        placeholder="ID do Funcionário"
                        value={idFuncionario}
                        onChange={e => setIdFuncionario(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Cód. da Aeronave (ID)"
                        value={codigoAeronave}
                        onChange={e => setCodigoAeronave(e.target.value)}
                    />
                </div>
            </Modal>

            <div className='container-testes'>
                {testes.map((item) => (
                    <CardTestes 
                        key={item.id_teste}
                        aeronave={item.aeronaves.length > 0 ? item.aeronaves[0].modelo : "N/A"} 
                        tipo={item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)} 
                        data={formatarData(item.data_realizacao)} 
                        responsavel={item.funcionario?.nome || "Desc."} 
                        status={item.resultado.charAt(0).toUpperCase() + item.resultado.slice(1)} 
                    />
                ))}
            </div>
        </>
    );
}

export default Teste;