async function cargarPerfil() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const { data: persona } = await supabaseClient
    .from('personas')
    .select('*')
    .eq('usuario_id', user.id)
    .single();

  if (persona) {
    document.getElementById('nombre').value = persona.nombre || '';
    document.getElementById('edad').value   = persona.edad || '';
    document.getElementById('zona').value   = persona.zona || '';
  }
}

document.getElementById('perfil-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const { data: { user } } = await supabaseClient.auth.getUser();
  const nombre   = document.getElementById('nombre').value.trim();
  const edad     = parseInt(document.getElementById('edad').value);
  const zona     = document.getElementById('zona').value.trim();
  const errorMsg   = document.getElementById('error-msg');
  const successMsg = document.getElementById('success-msg');

  errorMsg.classList.add('hidden');
  successMsg.classList.add('hidden');

  const { error } = await supabaseClient
    .from('personas')
    .update({ nombre, edad, zona })
    .eq('usuario_id', user.id);

  if (error) {
    errorMsg.textContent = 'Error al guardar los cambios. Intenta de nuevo.';
    errorMsg.classList.remove('hidden');
    return;
  }

  successMsg.textContent = '¡Perfil actualizado correctamente!';
  successMsg.classList.remove('hidden');
  setTimeout(() => successMsg.classList.add('hidden'), 3000);
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

cargarPerfil();
