const db = require('../config/db');

class User {
    static async findAll() {
    const [rows] = await db.query(`SELECT id, nombre, email, creado_en FROM usuarios`);
    return rows;
  }


    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    static async create({ nombre, email, contraseña }) {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
            [nombre, email, contraseña]
        );
        return result.insertId;
    }
}

module.exports = User;
