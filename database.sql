-- =====================================================
-- SCRIPT SQL — Plataforma de Apoyo Limpiaparabrisas
-- Ejecutar en: Supabase → SQL Editor
-- =====================================================

-- Tabla de usuarios
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL DEFAULT 'limpiaparabrisas',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de personas (limpiaparabrisas)
CREATE TABLE personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  edad INTEGER CHECK (edad >= 5 AND edad <= 99),
  zona VARCHAR(255),
  foto_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de oportunidades de apoyo
CREATE TABLE oportunidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  organizacion VARCHAR(255) NOT NULL,
  contacto VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de atenciones
CREATE TABLE atenciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  oportunidad_id UUID REFERENCES oportunidades(id),
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DATOS DE PRUEBA
-- =====================================================

INSERT INTO oportunidades (titulo, descripcion, organizacion, contacto) VALUES
('Capacitación laboral gratuita', 'Talleres de carpintería y electricidad para personas en situación vulnerable.', 'ONG Manos Unidas', '987654321'),
('Apoyo alimentario semanal', 'Entrega de canasta básica todos los viernes en el local central.', 'Municipalidad de Lima', '01-4321234'),
('Atención médica gratuita', 'Consultas médicas generales sin costo, con medicamentos incluidos.', 'Cruz Roja Peruana', 'salud@cruzroja.pe'),
('Apoyo escolar para hijos', 'Refuerzo escolar gratuito para hijos de personas en situación vulnerable.', 'ONG Futuro Brillante', '956789012');
