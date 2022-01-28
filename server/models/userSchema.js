const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default:"Newbie(default)"
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    profilePic: {
      public_id : {
        type:String,
        default:""

      },
      url : {
        type:String,
        default:"https://res.cloudinary.com/bhaveshcloud/image/upload/v1643364059/netflix_clone/DmBraqkXcAA1Yco_v6mhns.jpg"
      }
    }
  },
  {
    timestamps: true,
  }
);

//hashing password
userSchema.pre("save" , async function(next){
  if(this.isModified("password"))
      this.password = await bcrypt.hash(this.password , 10);

    next();
})

//generate token
userSchema.methods.generateToken = function(){
    return jwt.sign({id : this._id},process.env.SECRET)
}

module.exports = mongoose.model("User", userSchema);
