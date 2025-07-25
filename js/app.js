fetch('data/receitas.json')
  .then(response => response.json())
  .then(receitas => {
    const container = document.getElementById('receitas-container');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const barraBusca = document.getElementById('busca');

    function renderReceitas(receitas) {
      container.innerHTML = receitas.map(receita => `
        <div class="receita">
          <h2>${receita.Nome}</h2>
          <p><strong>Ingredientes:</strong> ${receita.Ingredientes.join(', ')}</p>
          <p><strong>Tempo:</strong> ${receita.Tempo} | <strong>Dificuldade:</strong> ${receita.Dificuldade}</p>
        </div>
      `).join('');
    }

    // Filtros
    filtroCategoria.addEventListener('change', () => {
      const categoria = filtroCategoria.value;
      const termoBusca = barraBusca.value.toLowerCase();
      filtrarReceitas(categoria, termoBusca);
    });

    barraBusca.addEventListener('input', () => {
      const categoria = filtroCategoria.value;
      const termoBusca = barraBusca.value.toLowerCase();
      filtrarReceitas(categoria, termoBusca);
    });

    function filtrarReceitas(categoria, termoBusca) {
      let filtradas = receitas;
      if (categoria !== 'all') filtradas = filtradas.filter(r => r.Categoria === categoria);
      if (termoBusca) {
        filtradas = filtradas.filter(r => 
          r.Nome.toLowerCase().includes(termoBusca) || 
          r.Ingredientes.some(i => i.toLowerCase().includes(termoBusca))
      }
      renderReceitas(filtradas);
    }

    renderReceitas(receitas); // Exibe todas inicialmente
  });
