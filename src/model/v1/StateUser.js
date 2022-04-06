import { Schema, model } from "mongoose";

const stateUserSchema = new Schema({
  name: String
}, {
  versionKey: false
})

export default model('StateUser', stateUserSchema);