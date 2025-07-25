document.addEventListener('DOMContentLoaded', function() {
  // Elementos DOM
  const container = document.getElementById('receitas-container');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const barraBusca = document.getElementById('busca');
  const btnLimpar = document.getElementById('btn-limpar');
  const mensagemErro = document.getElementById('mensagem-erro');

  // Carrega as receitas
  fetch('data/receitas.json')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar receitas');
      return response.json();
    })
    .then(receitas => {
      // Armazena todas as receitas
      window.todasReceitas = receitas;
      
      // Renderiza inicialmente
      renderReceitas(receitas);
      
      // Event Listeners
      filtroCategoria.addEventListener('change', aplicarFiltros);
      barraBusca.addEventListener('input', aplicarFiltros);
      btnLimpar.addEventListener('click', limparFiltros);
    })
    .catch(error => {
      console.error('Erro:', error);
      mostrarErro();
    });

  // Função para renderizar receitas
  function renderReceitas(receitas) {
    if (receitas.length === 0) {
      mostrarErro();
      return;
    }

    mensagemErro.classList.add('hidden');
    container.innerHTML = receitas.map(receita => `
      <div class="receita">
        <h2>${receita.Nome}</h2>
        <p><strong>Categoria:</strong> ${receita.Categoria}</p>
        <p><strong>Tempo:</strong> ${receita.Tempo}</p>
        <p><strong>Dificuldade:</strong> ${receita.Dificuldade}</p>
        <p><strong>Ingredientes:</strong> ${receita.Ingredientes.join(', ')}</p>
        <p><strong>Região:</strong> ${receita.Regiao}</p>
      </div>
    `).join('');
  }

  // Aplica todos os filtros
  function aplicarFiltros() {
    const categoria = filtroCategoria.value;
    const termoBusca = barraBusca.value.toLowerCase();

    let filtradas = window.todasReceitas;

    // Filtro por categoria
    if (categoria !== 'all') {
      filtradas = filtradas.filter(r => r.Categoria === categoria);
    }

    // Filtro por busca
    if (termoBusca) {
      filtradas = filtradas.filter(r => 
        r.Nome.toLowerCase().includes(termoBusca) || 
        r.Ingredientes.some(i => i.toLowerCase().includes(termoBusca))
    }

    renderReceitas(filtradas);
  }

  // Limpa todos os filtros
  function limparFiltros() {
    filtroCategoria.value = 'all';
    barraBusca.value = '';
    renderReceitas(window.todasReceitas);
  }

  // Mostra mensagem de erro
  function mostrarErro() {
    container.innerHTML = '';
    mensagemErro.classList.remove('hidden');
  }
});
