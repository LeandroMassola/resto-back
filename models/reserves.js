const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Reservation = sequelize.define('Reservation', {
    reservationId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    completeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    commentarys: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
})

sequelize.sync()
    .then(() => console.log('Modelo de Reserva sincronizado con MySQL'))
    .catch(error => console.error('Error al sincronizar el modelo:', error));

    module.exports = Reservation