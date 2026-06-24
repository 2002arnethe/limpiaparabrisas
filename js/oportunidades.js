async function cargarOportunidades() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const { data: oportunidades, error } = await supabaseClient
    .from('oportunidades')
    .select('*')
    .order('created_at', { ascending: false });

  const lista = document.getElementById('lista-oportunidades');

  if (error || !oportunidades || oportunidades.length === 0) {
    lista.innerHTML = '<p class="loading-text">No hay oportunidades disponibles por el momento.</p>';
    return;
  }

  lista.innerHTML = oportunidades.map(op => `
    <div class="oportunidad-card">
      <span class="badge">${op.organizacion}</span>
      <h3>${op.titulo}</h3>
      <p>${op.descripcion}</p>
      <p><strong>Contacto:</strong> ${op.contacto}</p>
    </div>
  `).join('');
}

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

cargarOportunidades();
