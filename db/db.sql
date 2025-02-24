
CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contra TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carrito_compras (
    id_carrito SERIAL PRIMARY KEY,
    FKuserId INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    agregado_en TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (FKuserId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);



CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    creado_en TIMESTAMP DEFAULT NOW()
);
