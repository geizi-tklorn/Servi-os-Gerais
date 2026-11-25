// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. MENU MOBILE INTERATIVO
       ========================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('ativo');
    });

    // Fecha o menu automaticamente ao clicar em um link (no celular)
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('ativo');
        });
    });


    /* ==========================================================
       2. FILTRO DE CATEGORIAS DA LOJA VIRTUAL
       ========================================================== */
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cardsProdutos = document.querySelectorAll('.card-produto');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a classe 'ativo' de todos os botões e adiciona no clicado
            botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
            botao.classList.add('ativo');

            const categoriaSelecionada = botao.getAttribute('data-categoria');

            // Mostra ou esconde os cards conforme a categoria
            cardsProdutos.forEach(card => {
                const categoriaCard = card.getAttribute('data-categoria');
                if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaCard) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================================
       3. CARRINHO DE COMPRAS FUNCIONAL
       ========================================================== */
    let carrinho = [];

    const modalCarrinho = document.getElementById('modal-carrinho');
    const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
    const btnFecharCarrinho = document.getElementById('fechar-carrinho');
    const listaItensCarrinho = document.getElementById('itens-carrinho');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const valorTotalElemento = document.getElementById('valor-total');
    const btnFinalizar = document.getElementById('btn-finalizar');

    // Abrir e fechar janela lateral do carrinho
    btnAbrirCarrinho.addEventListener('click', () => modalCarrinho.classList.add('aberto'));
    btnFecharCarrinho.addEventListener('click', () => modalCarrinho.classList.remove('aberto'));

    // Adicionar produtos/serviços ao carrinho
    document.querySelectorAll('.btn-adicionar').forEach(botao => {
        botao.addEventListener('click', () => {
            const nome = botao.getAttribute('data-nome');
            const preco = parseFloat(botao.getAttribute('data-preco'));

            carrinho.push({ nome, preco });
            atualizarCarrinho();
            modalCarrinho.classList.add('aberto'); // Abre o carrinho para mostrar o item
        });
    });

    // Atualiza a exibição visual e a soma dos valores
    function atualizarCarrinho() {
        listaItensCarrinho.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            listaItensCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio.</li>';
        } else {
            carrinho.forEach((item, index) => {
                total += item.preco;

                const li = document.createElement('li');
                li.classList.add('item-carrinho');
                li.innerHTML = `
                    <div>
                        <strong>${item.nome}</strong><br>
                        <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="btn-remover" data-index="${index}">Remover</button>
                `;
                listaItensCarrinho.appendChild(li);
            });

            // Adiciona evento para remover cada item
            document.querySelectorAll('.btn-remover').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    carrinho.splice(idx, 1);
                    atualizarCarrinho();
                });
            });
        }

        contadorCarrinho.textContent = carrinho.length;
        valorTotalElemento.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Simulação de checkout
    btnFinalizar.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Adicione pelo menos um produto ou serviço antes de finalizar.');
            return;
        }
        alert('Pedido recebido com sucesso! Nossa equipe da TKL Serviços entrará em contato para confirmar o agendamento/entrega.');
        carrinho = [];
        atualizarCarrinho();
        modalCarrinho.classList.remove('aberto');
    });


    /* ==========================================================
       4. SIMULADOR DE ORÇAMENTO RÁPIDO
       ========================================================== */
    const btnCalcular = document.getElementById('btn-calcular');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    btnCalcular.addEventListener('click', () => {
        const valorHora = parseFloat(document.getElementById('tipo-servico').value);
        const horas = parseInt(document.getElementById('horas-estimadas').value);
        const multiplicadorUrgencia = parseFloat(document.getElementById('urgencia').value);

        if (isNaN(horas) || horas < 1) {
            alert('Por favor, informe uma quantidade válida de horas (mínimo 1 hora).');
            return;
        }

        const totalEstimado = valorHora * horas * multiplicadorUrgencia;

        resultadoSimulacao.classList.remove('oculto');
        resultadoSimulacao.innerHTML = `
            <strong>Estimativa de Investimento:</strong> R$ ${totalEstimado.toFixed(2).replace('.', ',')}<br>
            <small>*Valor aproximado para ${horas}h de serviço técnico. Materiais não inclusos.</small>
        `;
    });


    /* ==========================================================
       5. FORMULÁRIO DE CONTATO COM VALIDAÇÃO
       ========================================================== */
    const formContato = document.getElementById('form-contato');
    const feedbackForm = document.getElementById('feedback-form');

    formContato.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação simples
        if (nome.length < 3) {
            exibirMensagem('Por favor, digite seu nome completo.', 'red');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            exibirMensagem('Por favor, insira um e-mail válido.', 'red');
            return;
        }

        if (telefone.length < 8) {
            exibirMensagem('Por favor, informe um telefone válido com DDD.', 'red');
            return;
        }

        if (mensagem.length < 10) {
            exibirMensagem('Descreva com mais detalhes o reparo necessário.', 'red');
            return;
        }

        // Sucesso
        exibirMensagem(`Obrigado, ${nome}! Sua solicitação foi enviada. Responderemos em breve.`, 'green');
        formContato.reset();
    });

    function exibirMensagem(texto, cor) {
        feedbackForm.textContent = texto;
        feedbackForm.style.color = cor;
    }
});