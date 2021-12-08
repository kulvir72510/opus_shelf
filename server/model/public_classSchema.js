const mongoose = require("mongoose");

const public_classSchema = new mongoose.Schema({
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
  public_classDesc: {
    type: String,
  },
  public_classUrl: {
    type: String,
    required: true,
  },
});

const public_class = mongoose.model("PUBLIC_CLASS", public_classSchema);
module.exports = public_class;
