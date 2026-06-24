let todasLasPersonas = [];

async function cargarPersonas() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const { data: personas, error } = await supabaseClient
    .from('personas')
    .select('*')
    .order('created_at', { ascending: false });

  const contenedor = document.getElementById('lista-personas');

  if (error || !personas || personas.length === 0) {
    contenedor.innerHTML = '<p class="loading-text">No hay personas registradas aún.</p>';
    return;
  }

  todasLasPersonas = personas;
  renderizarTabla(personas);
}

function renderizarTabla(personas) {
  const contenedor = document.getElementById('lista-personas');

  if (personas.length === 0) {
    contenedor.innerHTML = '<p class="loading-text">No se encontraron resultados.</p>';
    return;
  }

  contenedor.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Zona de trabajo</th>
          <th>Fecha de registro</th>
        </tr>
      </thead>
      <tbody>
        ${personas.map(p => `
          <tr>
            <td>${p.nombre}</td>
            <td>${p.edad} años</td>
            <td>${p.zona}</td>
            <td>${new Date(p.created_at).toLocaleDateString('es-PE')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Búsqueda en tiempo real
document.getElementById('buscador').addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase();
  const filtradas = todasLasPersonas.filter(p =>
    p.nombre.toLowerCase().includes(termino) ||
    p.zona.toLowerCase().includes(termino)
  );
  renderizarTabla(filtradas);
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

cargarPersonas();
