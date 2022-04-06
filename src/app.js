import express from "express"
import morgan from "morgan"
import pkg from '../package.json'

import * as initialSetup from './libs/initialSetup'

import productsRoutes from './routes/v1/products.routes'
import authRoutes from './routes/v1/auth.routes'
import usersRoutes from './routes/v1/users.routes'

const app = express();
initialSetup.createRoles();
initialSetup.createStatesUsers();
initialSetup.createTypesDocuments();

app.set("pkg", pkg);

app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
    author: app.get("pkg").author,
  });
})

app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', usersRoutes)

export default app;