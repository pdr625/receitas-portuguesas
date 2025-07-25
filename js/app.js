// Carrega os dados do JSON (caminho absoluto para GitHub Pages)
fetch('https://pdr625.github.io/receitas-portuguesas/data/receitas.json')
  .then(response => response.json())
  .then(receitas => {
    // Função para renderizar receitas
    function renderReceitas(receitasFiltradas) {
      const container = document.getElementById('receitas-container');
      container.innerHTML = receitasFiltradas.map(receita => `
        <div class="receita">
          <h2>${receita.Nome}</h2>
          <p><strong>Ingredientes:</strong> ${receita.Ingredientes.join(', ')}</p>
          <p><strong>Tempo:</strong> ${receita.Tempo} | <strong>Dificuldade:</strong> ${receita.Dificuldade}</p>
        </div>
      `).join('');
    }

    // Filtro inicial (mostra todas)
    renderReceitas(receitas);

    // Filtro por categoria
    document.getElementById('filtro-categoria').addEventListener('change', function() {
      const categoria = this.value;
      const receitasFiltradas = categoria === 'all' 
        ? receitas 
        : receitas.filter(r => r.Categoria === categoria);
      renderReceitas(receitasFiltradas);
    });
  })
  .catch(error => console.error('Erro ao carregar receitas:', error));
