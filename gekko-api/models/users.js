const Sequelize = require("sequelize");

/*
 * Field Mapping
 * https://stackoverflow.com/questions/17963516/is-there-no-option-to-map-the-column-name-in-sequelize-model
 * 
 * Validation
 * https://sequelize.org/master/manual/validations-and-constraints.html#validators
 *
 * Options Parameter
 * https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-init
 *
 * How to use milliseconds in sequelize standard createdAt field?
 * https://stackoverflow.com/questions/47752672/how-to-use-milliseconds-in-sequelize-standard-createdat-field/47753587#47753587
 *
 * id: null when creating a new item in sequelize
 * https://stackoverflow.com/questions/36074800/id-null-when-creating-a-new-item-in-sequelize
 *
 * 保存版！「sequelize」モデルの使い方実例・全59件
 * https://blog.capilano-fw.com/?p=5582
 */

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            field: "id",
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            field: "name"
        },
        email: {
            type: DataTypes.STRING,
            field: "email"
        },
        password: {
            type: DataTypes.STRING,
            field: "password"
        },
        createdAt: {
            type: DataTypes.DATE(3),
            field: "created_at",
            defaultValue: Sequelize.fn("NOW", 3)
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            field: "updated_at",
            defaultValue: Sequelize.fn("NOW", 3)
        }
    }, {
        tableName: "tb_users",
        underscored: true,
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};