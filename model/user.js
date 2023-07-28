const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const category = require("./category");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      allowNull: false,
      required: [true, "Та эцэг/эхийн нэрээ оруулна уу"],
    },
    lastname: {
      type: String,
      allowNull: false,
      required: [true, "Та нэрээ оруулна уу"],
    },
    registrNumber: {
      type: String,
      allowNull: false,
      required: [true, "Та регистрийн дугаараа оруулна уу"],
    },
    time: String,
    phoneNumber: {
      type: Number,
      allowNull: false,
      required: [true, "Та утасны дугаараа оруулна уу"],
    },
    email: {
      type: String,
      required: [true, "Ta email оруулна уу"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email buruu baina"],
    },
    password: {
      type: String,
      allowNull: false,
      required: [true, "Та password оруулна уу"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserSchema.virtual("category", {
  ref: "category",
  localField: "_id",
  foreignField: "UserSchema",
  justOne: false,
});
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.getJsonWebToken = function () {
  const token = JWT.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRESIN }
  );
  return token;
};
UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.generatePasswordChangeToken = function () {
  const resetToken = crypto.randomBytes(20).tostring("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(restToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("Usershema", UserSchema);
