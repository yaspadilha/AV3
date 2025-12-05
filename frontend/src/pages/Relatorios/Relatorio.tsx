import './Relatorio.css';
import CardRelatorio from '../../components/CardRelatorio';
import { useEffect, useState } from 'react';

interface Peca {
    nome: string;
}

interface Etapa {
    nome: string;
    status: string;
}

interface Teste {
    tipo: string;
    resultado: string;
}

interface RelatorioData {
    codigo: number;
    modelo: string;
    tipo_aeronave: string;
    capacidade: number;
    alcance: number;
    pecas: Peca[];
    etapas: Etapa[];
    teste?: Teste | null; 
}

function Relatorio() {
    const [relatorios, setRelatorios] = useState<RelatorioData[]>([]);

    useEffect(() => {
        fetchRelatorios();
    }, []);

    async function fetchRelatorios() {
        try {
            const response = await fetch('http://localhost:3000/relatorios');
            if (response.ok) {
                const data = await response.json();
                setRelatorios(data);
            }
        } catch (error) {
            console.error("Erro ao buscar relatórios:", error);
        }
    }

    const formatarPecas = (listaPecas: Peca[]) => {
        if (!listaPecas || listaPecas.length === 0) return "Nenhuma peça cadastrada.";
        return listaPecas.map(p => p.nome).join(", ");
    };

    const formatarEtapas = (listaEtapas: Etapa[]) => {
        if (!listaEtapas || listaEtapas.length === 0) return "Nenhuma etapa registrada.";
        return listaEtapas.map(e => `${e.nome} (${e.status.replace("_", " ")})`).join(", ");
    };

    const formatarTeste = (teste?: Teste | null) => {
        if (!teste) return "Testes Pendentes";
        const tipo = teste.tipo.charAt(0).toUpperCase() + teste.tipo.slice(1);
        const resultado = teste.resultado.charAt(0).toUpperCase() + teste.resultado.slice(1);
        return `${tipo} - ${resultado}`;
    };

    return (
        <>
            <h1 className='titulo-relatorio'>Relatórios</h1>
            <h2 className='subtitulo-relatorio'>Relatórios de todas as aeronaves cadastradas:</h2>

            <div className='container-relatorios' style={{ gap: '20px' }}>
                {relatorios.map((item) => (
                    <CardRelatorio 
                        key={item.codigo}
                        modelo={item.modelo.charAt(0).toUpperCase() + item.modelo.slice(1)}
                        codigo={String(item.codigo)}
                        tipo={item.tipo_aeronave.charAt(0).toUpperCase() + item.tipo_aeronave.slice(1)}
                        capacidade={`${item.capacidade} passageiros`}
                        alcance={`${item.alcance} km`}
                        pecas={formatarPecas(item.pecas)}
                        etapas={formatarEtapas(item.etapas)}
                        testes={formatarTeste(item.teste)}
                    />
                ))}
            </div>
        </>
    );
}

export default Relatorio;