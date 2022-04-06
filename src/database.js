import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Dejeloper:Desarrollo01*@cluster0.tk6qs.mongodb.net/avodb?retryWrites=true&w=majority", {
  // mongoose.connect("mongodb://localhost/avodb", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(db => console.log("Db is connected"))
  .catch(error => console.log("Error", error))