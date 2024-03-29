module.exports = {
    // HOST: "",
    HOST: "",
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: "inventario",
    dialect: "postgres",
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
