import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  name: String,
  visible: Boolean
}, {
  versionKey: false
})

export default model('Role', roleSchema);