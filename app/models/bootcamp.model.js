import { Sequelize, DataTypes as dt } from 'sequelize';
import db from '../config/db.config.js';

const Bootcamp = db.define('Bootcamp', {
    id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement :true,
        allowNull: false,
        unique: true
    },
    title: {
        type:dt.STRING(255),
        allowNull:false,
        validate: {
            len: {
                args: [3, 255],
                msg: 'Título debe tener un mínimo de 3 caracteres'
            }
        }
    },
    cue: {
        type: dt.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    description: {
        type: dt.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: dt.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
        validate: {
            noUpdate(value) {
                if (this.changed('createdAt')) {
                    throw new Error('No se puede actualizar el campo createdAt');
                }
            }
        }
    },
    updatedAt: {
        type: dt.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
});

export default Bootcamp;