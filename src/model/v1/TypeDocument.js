import { Schema, model } from "mongoose";

const typeDocumentSchema = new Schema({
  name: String
}, {
  versionKey: false
})

export default model('TypeDocument', typeDocumentSchema);