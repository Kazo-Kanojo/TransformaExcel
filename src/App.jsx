import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, ArrowRight, CheckCircle2 } from 'lucide-react';
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
      
      // Lê o Excel exatamente como ele é (matriz de linhas e colunas)
      // defval: '' garante que células em branco não desalinhem as colunas
      const linhasExcel = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      // =========================================================
      // A LÓGICA DE LINHA A LINHA:
      // 1. O map() passa por cada linha e junta os dados com "|"
      // 2. O join('\r\n') junta todas as linhas dando um "Enter" entre elas
      // =========================================================
      const txtOutput = linhasExcel
        .map(linha => linha.join('|')) // Ex: ColA|ColB|ColC
        .join('\r\n');                  // Pula para a linha de baixo

      // Gerando e forçando o Download do arquivo TXT
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Conversor Excel para TXT
          </h1>
          <p className="text-sm text-gray-500">
            Converte mantendo a estrutura exata (Linha = Linha)
          </p>
        </div>

        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer relative">
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
          />
          
          {arquivo ? (
            <div className="flex flex-col items-center text-blue-600">
              <FileSpreadsheet className="w-12 h-12 mb-3" />
              <span className="font-semibold text-center">{arquivo.name}</span>
              <span className="text-xs text-blue-400 mt-1">
                {(arquivo.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <UploadCloud className="w-12 h-12 mb-3 text-blue-500" />
              <span className="font-medium text-center">Clique ou arraste a planilha aqui</span>
              <span className="text-xs text-gray-400 mt-1">Suporta .XLSX e .CSV</span>
            </div>
          )}
        </div>

        {concluido && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center text-green-700 text-sm">
            Sucesso! O arquivo TXT estruturado foi baixado.
          </div>
        )}

        <div className="mt-6">
          <button 
            onClick={handleProcessar}
            disabled={!arquivo || processando}
            className={`w-full font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-all ${
              !arquivo || processando 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30'
            }`}
          >
            {processando ? (
              <span className="animate-pulse">Processando dados...</span>
            ) : concluido ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Processar Novo Arquivo
              </>
            ) : (
              <>
                Gerar TXT <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}