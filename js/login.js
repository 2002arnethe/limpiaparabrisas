document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('error-msg');

  errorMsg.classList.add('hidden');

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    errorMsg.textContent = 'Correo o contraseña incorrectos. Intenta de nuevo.';
    errorMsg.classList.remove('hidden');
    return;
  }

  // Redirigir según el rol del usuario
  const { data: persona } = await supabaseClient
    .from('personas')
    .select('*')
    .eq('usuario_id', data.user.id)
    .single();

  const { data: usuarioData } = await supabaseClient
    .from('usuarios')
    .select('rol')
    .eq('id', data.user.id)
    .single();

  const rol = usuarioData?.rol || 'limpiaparabrisas';

  if (rol === 'ong' || rol === 'admin') {
    window.location.href = 'panel-ong.html';
  } else {
    window.location.href = 'dashboard.html';
  }
});
