import Sequelize from 'sequelize';

/* Creación de la BD */
const db = new Sequelize('db_jwtbootcamp', process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

/* Conexión a la BD */
const syncDB = async () => {
    try {
        await db.authenticate();
        console.log('Conexión establecida con la Base de Datos');
    } catch(err) {
        console.log('Error al conectar con la Base de Datos', err);
    };
};

syncDB();

export default db;