-- Tabela Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(255)
);

-- Tabela Colaboradores
CREATE TABLE colaboradores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    foto VARCHAR(255)
);

-- Tabela Atividades
CREATE TABLE atividades (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) CHECK (tipo IN ('Bicicleta', 'Caminhada', 'Transporte público')) NOT NULL,
    distancia_km NUMERIC(5,2) NOT NULL,
    duracao_min INT NOT NULL,
    co2_evitado NUMERIC(5,2) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Curtidas (Likes)
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    atividade_id INT NOT NULL REFERENCES atividades(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE(atividade_id, usuario_id)
);

-- Tabela Comentários
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    atividade_id INT NOT NULL REFERENCES atividades(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);x