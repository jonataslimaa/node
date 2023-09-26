const sequelize = require("sequelize");
const connection = require ("./database");

const Produto = connection.define('produto',{
    titulo: {
        type: sequelize.STRING,
        alloqNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        alloqNull: false

    }
});

Produto.sync({force:false} );
module.exports= Produto;