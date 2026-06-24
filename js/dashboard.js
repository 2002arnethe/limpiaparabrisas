async function cargarDashboard() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Cargar nombre del usuario
  const { data: persona } = await supabaseClient
    .from('personas')
    .select('nombre')
    .eq('usuario_id', user.id)
    .single();

  if (persona) {
    document.getElementById('nombre-usuario').textContent = persona.nombre.split(' ')[0];
  }

  // Total oportunidades
  const { count: totalOp } = await supabaseClient
    .from('oportunidades')
    .select('*', { count: 'exact', head: true });

  document.getElementById('total-oportunidades').textContent =
    `${totalOp || 0} oportunidades disponibles`;

  // Total atenciones del usuario
  const { data: personaData } = await supabaseClient
    .from('personas')
    .select('id')
    .eq('usuario_id', user.id)
    .single();

  if (personaData) {
    const { count: totalAt } = await supabaseClient
      .from('atenciones')
      .select('*', { count: 'exact', head: true })
      .eq('persona_id', personaData.id);

    document.getElementById('total-atenciones').textContent =
      `${totalAt || 0} atenciones registradas`;
  }
}

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

cargarDashboard();
