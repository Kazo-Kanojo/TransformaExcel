# 📊 TransformaExcel

Um conversor web rápido e seguro que transforma planilhas (Excel/CSV) em arquivos de texto plano (`.txt`) com separação por *pipes* (`|`), mantendo a estrutura exata das linhas. Ideal para integrações com sistemas governamentais (como o SPED Fiscal) ou qualquer sistema legado que exija arquivos de texto estruturados.

## ✨ Funcionalidades

- **Processamento 100% Client-Side:** Os dados nunca saem do computador do usuário. O arquivo é lido e convertido diretamente no navegador, garantindo total privacidade e segurança.
- **Mapeamento Exato:** A linha 1 do Excel vira a linha 1 do TXT. Células em branco são preservadas como separadores vazios (`||`), evitando o desalinhamento dos dados.
- **Colunas Dinâmicas:** Não importa se a planilha tem 3 ou 50 colunas, o sistema se adapta automaticamente.
- **Interface Moderna:** Drag & Drop intuitivo com feedback visual de carregamento e sucesso.

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/) + [Vite](https://vitejs.dev/):** Para uma interface rápida e um ambiente de desenvolvimento ágil.
- **[Tailwind CSS (v4)](https://tailwindcss.com/):** Estilização moderna e responsiva.
- **[SheetJS (xlsx)](https://sheetjs.com/):** O motor por trás da leitura veloz de planilhas no navegador.
- **[Lucide React](https://lucide.dev/):** Ícones limpos e elegantes.
- **[Vercel](https://vercel.com/):** Hospedagem e CI/CD.

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Kazo-Kanojo/TransformaExcel.git](https://github.com/Kazo-Kanojo/TransformaExcel.git)
   
   cd TransformaExcel

   npm install --legacy-peer-deps

   npm run dev


### 📖 Como usar
-Acesse a aplicação web.

Clique na área pontilhada ou arraste um arquivo .xlsx, .xls ou .csv para dentro dela.

Clique no botão Gerar TXT.

O arquivo será processado quase instantaneamente e baixado no seu computador com a estrutura de separação por |.