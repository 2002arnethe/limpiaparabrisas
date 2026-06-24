async function cargarHistorial() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const { data: persona } = await supabaseClient
    .from('personas')
    .select('id')
    .eq('usuario_id', user.id)
    .single();

  const lista = document.getElementById('lista-historial');

  if (!persona) {
    lista.innerHTML = '<p class="loading-text">No se encontró tu perfil.</p>';
    return;
  }

  const { data: atenciones, error } = await supabaseClient
    .from('atenciones')
    .select('*, oportunidades(titulo, organizacion)')
    .eq('persona_id', persona.id)
    .order('fecha', { ascending: false });

  if (error || !atenciones || atenciones.length === 0) {
    lista.innerHTML = '<p class="loading-text">Aún no tienes atenciones registradas.</p>';
    return;
  }

  lista.innerHTML = atenciones.map(at => `
    <div class="atencion-card">
      <span class="badge">${at.oportunidades?.organizacion || 'Organización'}</span>
      <h3>${at.oportunidades?.titulo || 'Atención'}</h3>
      <p><strong>Fecha:</strong> ${new Date(at.fecha).toLocaleDateString('es-PE')}</p>
      ${at.observaciones ? `<p><strong>Observaciones:</strong> ${at.observaciones}</p>` : ''}
    </div>
  `).join('');
}

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

cargarHistorial();
