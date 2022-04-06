import app from './app'
import './database'

const port = 5000;
app.listen(port);
console.log("Server in port", port)