import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  typeDocument: {
    ref: 'TypeDocument',
    type: Schema.Types.ObjectId
  },
  numberDocument: Number,
  stateUser: {
    ref: 'stateUser',
    type: Schema.Types.ObjectId
  },
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId
  }],
  changePass: Boolean,
  logIn: Boolean,
  userCreatedAt: String,
  userupdatedAt: String
}, {
  timestamps: true,
  versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}


export default model('User', userSchema)