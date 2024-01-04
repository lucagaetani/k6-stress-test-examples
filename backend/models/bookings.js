const { DataTypes } = require("sequelize");
const instanceSequelize = require("../database");

const Bookings = instanceSequelize.define(
  "Bookings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

/*
(async () => {
    await Bookings.sync({ force: true });
})();
*/

module.exports = Bookings;