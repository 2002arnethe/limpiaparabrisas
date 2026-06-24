document.getElementById('registro-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre   = document.getElementById('nombre').value.trim();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const edad     = parseInt(document.getElementById('edad').value);
  const zona     = document.getElementById('zona').value.trim();
  const errorMsg   = document.getElementById('error-msg');
  const successMsg = document.getElementById('success-msg');

  errorMsg.classList.add('hidden');
  successMsg.classList.add('hidden');

  // 1. Crear usuario en Supabase Auth
  const { data, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    errorMsg.textContent = 'Error al crear la cuenta: ' + error.message;
    errorMsg.classList.remove('hidden');
    return;
  }

  const userId = data.user.id;

  // 2. Guardar en tabla usuarios
  await supabaseClient.from('usuarios').insert({
    id: userId,
    email: email,
    rol: 'limpiaparabrisas'
  });

  // 3. Guardar en tabla personas
  const { error: errorPersona } = await supabaseClient.from('personas').insert({
    usuario_id: userId,
    nombre: nombre,
    edad: edad,
    zona: zona
  });

  if (errorPersona) {
    errorMsg.textContent = 'Error al guardar el perfil. Intenta de nuevo.';
    errorMsg.classList.remove('hidden');
    return;
  }

  successMsg.textContent = '¡Cuenta creada exitosamente! Redirigiendo...';
  successMsg.classList.remove('hidden');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
});
