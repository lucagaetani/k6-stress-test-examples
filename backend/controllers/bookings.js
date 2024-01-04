const Bookings = require("../models/bookings");
const instanceSequelize = require("../database");
const { Transaction } = require("sequelize");

const insertBookings = async (req, res, next) => {
  const transaction = await instanceSequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
  });

  try {
    const { email } = req.body;
    console.log(email);

    const insertEmail = await Bookings.create({ email }, { transaction });

    if (!insertEmail) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Can not insert booking, insert operation failed",
      });
    }

    await transaction.commit();

    return res.status(200).send({
      success: true,
      message: "Booking inserted successfully"
    });

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Can not insert booking, insert operation failed",
      error: error.message,
    });
  }
};

exports.insertBookings = insertBookings;
