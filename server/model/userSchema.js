const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  profileUrl: { type: String },
  date: {
    type: Date,
    required: true,
  },
  myClasses: [
    {
      myClass: [
        {
          myClassName: {
            type: String,
            required: true,
          },
          myClassCode: {
            type: String,
            required: true,
          },
          myClassDesc: {
            type: String,
          },
        },
      ],
    },
  ],
  sharedClasses: [
    {
      sharedClass: [
        {
          public_classYear: {
            type: Number,
            required: true,
          },

          public_classBranch: {
            type: String,
          },
          public_classSubject: {
            type: String,
            required: true,
          },
          public_classFileType: {
            type: String,
            required: true,
          },
          sharedClassCode: {
            type: String,
            required: true,
          },
          sharedClassDesc: {
            type: String,
          },
          public_classUrl: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const user = mongoose.model("USER", userSchema);

module.exports = user;
