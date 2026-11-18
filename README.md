🛠️ Loja de Serviços Gerais — Aplicação Web

Aplicação web responsiva desenvolvida para uma loja de serviços gerais, permitindo que clientes acessem de qualquer lugar para realizar cadastros, consultar o catálogo de serviços prestados (elétrica, hidráulica, pintura, etc.) e visualizar ou reservar produtos e ferramentas.

🚀 Funcionalidades Principais

Cadastro e Área do Cliente: Registro de novos clientes com validação de CPF/CNPJ, busca automática de endereço via CEP e gerenciamento de perfil.

Catálogo de Serviços: Exibição detalhada dos serviços oferecidos com filtros por categoria e solicitação de orçamentos online.

Catálogo de Produtos e Ferramentas: Listagem de itens disponíveis para venda ou locação, com controle de disponibilidade e especificações técnicas.

Acesso Multiplataforma: Interface responsiva (HTML5, CSS3 e JavaScript puro) projetada para funcionar perfeitamente em computadores, tablets e smartphones.

🛠️ Tecnologias Utilizadas

Backend: Python 3, Flask, Flask-SQLAlchemy

Frontend: HTML5, CSS3, JavaScript (Vanilla JS / Fetch API)

Banco de Dados: SQLite (desenvolvimento) / PostgreSQL (produção)

Servidor de Produção: Gunicorn

📁 Estrutura de Diretórios

loja-servicos-gerais/
├── app.py                  # Ponto de entrada da aplicação Flask
├── config.py               # Configurações e variáveis de ambiente
├── requirements.txt        # Dependências do projeto
├── database/               # Conexão e modelos do banco de dados
├── routes/                 # Controladores e rotas (Blueprints)
├── services/               # Regras de negócio e integrações externas
├── static/                 # Arquivos estáticos (CSS, JS, Imagens)
├── templates/              # Páginas HTML (Jinja2)
└── tests/                  # Testes automatizados


⚙️ Como Executar o Projeto Localmente

1. Pré-requisitos

Certifique-se de ter o Python 3.10+ e o Git instalados em sua máquina.

2. Clonar o repositório

git clone https://github.com/seu-usuario/loja-servicos-gerais.git
cd loja-servicos-gerais


3. Criar e ativar o ambiente virtual

Windows:

python -m venv venv
venv\Scripts\activate


Linux / macOS:

python3 -m venv venv
source venv/bin/activate


4. Instalar as dependências

pip install -r requirements.txt


5. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com base nas configurações necessárias:

SECRET_KEY=sua_chave_secreta_aqui
FLASK_ENV=development
PORT=5000


6. Iniciar a aplicação

python app.py


Acesse no navegador: http://localhost:5000 (ou utilize o IP da sua máquina na rede local para testar diretamente pelo celular, ex: http://192.168.1.X:5000).

🧪 Executando os Testes

Para rodar a suíte de testes automatizados:

pytest
