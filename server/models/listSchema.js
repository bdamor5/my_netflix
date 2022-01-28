const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {type: String},
    genre : {type:String},
    content:{type:Array}
    //content:{type:Array} , unlike we did before as ' content : [ {.....} ] array of objects '
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
