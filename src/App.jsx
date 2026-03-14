import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function LeitorGovernoApp() {
  const [arquivo, setArquivo] = useState(null);
  const [processando, setProcessando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
      setConcluido(false);
    }
  };

  const handleProcessar = async () => {
    if (!arquivo) return;
    setProcessando(true);

    try {
      const data = await arquivo.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
      const linhasExcel = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      const txtOutput = linhasExcel
        .map(linha => linha.join('|'))
        .join('\r\n');

      if (txtOutput.trim().length > 0) {
        const blob = new Blob([txtOutput], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Planilha_Convertida_${new Date().getTime()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setConcluido(true);
      } else {
        alert("O arquivo parece estar vazio.");
      }
    } catch (error) {
      console.error("Erro ao processar a planilha:", error);
      alert("Houve um erro ao processar o arquivo.");
    } finally {
      setProcessando(false);
    }
  };

  return (
    // Fundo escuro moderno
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans text-slate-200">
      
      {/* Container principal com borda sutil e brilho (Glow) */}
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/10 p-10 relative overflow-hidden">
        
        {/* Efeito visual de luz no topo do card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

        {/* Cabeçalho */}
        <div className="text-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 mb-6 border border-indigo-500/20">
            <FileText className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">
            Transforma<span className="text-indigo-500">Excel</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Arraste sua planilha e converta para TXT estruturado instantaneamente.
          </p>
        </div>

        {/* Área de Drag & Drop */}
        <div className="group relative border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-950/50 hover:bg-indigo-500/5 transition-all duration-300 cursor-pointer">
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileSelect}
          />
          
          {arquivo ? (
            <div className="flex flex-col items-center text-indigo-300 z-0">
              <FileSpreadsheet className="w-14 h-14 mb-4 text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <span className="font-semibold text-slate-200 text-center text-lg">{arquivo.name}</span>
              <span className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-wider">
                {(arquivo.size / 1024).toFixed(1)} KB • Pronto para converter
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 z-0 group-hover:text-indigo-300 transition-colors">
              <UploadCloud className="w-14 h-14 mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              <span className="font-semibold text-center text-slate-300">Selecione ou arraste o arquivo</span>
              <span className="text-xs text-slate-500 mt-2">Suporte para .XLSX e .CSV</span>
            </div>
          )}
        </div>

        {/* Feedback de Sucesso */}
        {concluido && (
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Download concluído com sucesso!
          </div>
        )}

        {/* Botão de Ação Moderno */}
        <div className="mt-8">
          <button 
            onClick={handleProcessar}
            disabled={!arquivo || processando}
            className={`w-full font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 ${
              !arquivo || processando 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5'
            }`}
          >
            {processando ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando arquivo...
              </span>
            ) : concluido ? (
              <>
                Processar Outro Arquivo <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Gerar Arquivo TXT <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Rodapé sutil */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600 font-medium">
            Processamento 100% local. Seus dados não são enviados para nenhum servidor.
          </p>
        </div>

      </div>
    </div>
  );
}