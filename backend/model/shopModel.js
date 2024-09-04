// import mongoose from "mongoose";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";


// const shopSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your shop name!"],
//   },
//   description: {
//     type: String,
    
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your shop email!"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please enter your password"],
//     minLength: [6, "Password should be greater than 6 characters"],
//     select: false,
//   },
//   phoneNumber: {
//     type: Number,
//     required: true,
//   },
//   addresses: {
//         type: String,
//         required: true,
//       },

//   role: {
//     type: String,
//     default: "seller",
//   },
 
//   avatar: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },

//   resetPasswordToken: String,
//   resetPasswordTime: Date,
  
// });

// //  Hash password
// shopSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcryptjs.hash(this.password, 10);
// });

// // jwt token
// shopSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: `${process.env.JWT_EXPIRES}d`,
//   });
// };

// // compare password
// shopSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcryptjs.compare(enteredPassword, this.password);
// };



// const shopModel = mongoose.model("Shop", shopSchema);

// export default shopModel;

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  description: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your shop email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: `${process.env.JWT_EXPIRES}d`,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const shopModel = mongoose.model("Shop", shopSchema);

export default shopModel;

