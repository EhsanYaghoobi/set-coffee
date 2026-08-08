const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

export default model;
