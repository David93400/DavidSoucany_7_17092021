const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      pseudo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Ce pseudo est déjà pris',
        },
        validate: {
          len: {
            args: 3,
            msg: 'Votre Pseudo doit faire au minimum 3 caractères',
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Cet email est déjà utilisé',
        },
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        notNull : {
          msg: 'Un mot de passe est requis'
        },
        notEmpty : {
          msg: 'Merci de fournir un mot de passe'
        },
        len: {
          args: [8-32],
          msg:'Votre mot de passe doit contenir entre 8 et 32 caractères'
        }
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
