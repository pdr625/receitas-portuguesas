document.addEventListener('DOMContentLoaded', function() {
  fetch('data/receitas.json')
    .then(response => response.json())
    .then(receitas => {
      const container = document.getElementById('receitas-container');
      const filtroCategoria = document.getElementById('filtro-categoria');
      const barraBusca = document.getElementById('busca');

      // Função para renderizar receitas
      function renderReceitas(receitas) {
        container.innerHTML = receitas.map(receita => `
          <div class="receita">
            <h2>${receita.Nome}</h2>
            <p><strong>Categoria:</strong> ${receita.Categoria}</p>
            <p><strong>Ingredientes:</strong> ${receita.Ingredientes.join(', ')}</p>
            <p><strong>Tempo:</strong> ${receita.Tempo} | <strong>Dificuldade:</strong> ${receita.Dificuldade}</p>
          </div>
        `).join('');
      }

      // Filtros combinados
      function filtrarReceitas() {
        const categoria = filtroCategoria.value;
        const termoBusca = barraBusca.value.toLowerCase();
        
        let filtradas = receitas;
        
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

      // Event listeners
      filtroCategoria.addEventListener('change', filtrarReceitas);
      barraBusca.addEventListener('input', filtrarReceitas);

      // Exibe todas as receitas inicialmente
      renderReceitas(receitas);
    })
    .catch(error => console.error('Erro ao carregar receitas:', error));
});
