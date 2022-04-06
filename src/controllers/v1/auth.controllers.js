import User from '../../model/v1/User'
import Role from '../../model/v1/Role'
import TypeDocument from '../../model/v1/TypeDocument'
import StateUser from '../../model/v1/StateUser'
import jwt from 'jsonwebtoken'
import config from '../../config';

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Search User with username
    const userFound = await User.findOne({ username })
      .populate({ path: 'typeDocument', model: TypeDocument })
      .populate({ path: 'roles', model: Role })
      .populate({ path: 'stateUser', model: StateUser });

    if (!userFound) {
      return res.status(404).json({
        data: null,
        status: false,
        message: "User not found",
        count: 0
      })
    }

    // Compare and Match Password
    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) {
      return res.status(400).json({
        data: null,
        status: false,
        message: "Invalid Password",
        count: 0
      })
    }

    // Create Token with id from saved user 
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 864000 // 24 horas
    })

    res.status(200).json({
      data: {
        token, // Send Token
        user: {
          username: userFound.username,
          name: userFound.name,
          roles: userFound.roles
            // .filter(role => role.visible == true)
            .map(role => role.name)
        }
      },
      status: true,
      message: "Success",
      count: 1
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}

export const signup = async (req, res) => {
  try {
    const {
      username, password, name, typeDocument, numberDocument, stateUser, roles, userCreatedAt, userupdatedAt
    } = req.body;
    // Object (newUser) from Model (User)
    const newUser = new User({
      username,
      password: await User.encryptPassword(password),
      name,
      numberDocument,
      changePass: false,
      logIn: false
    });

    //Validate userCreatedAt and userupdatedAt -> Default from Config 
    if (userCreatedAt)
      newUser.userCreatedAt = userCreatedAt;
    else
      newUser.userCreatedAt = config.USERCREATEDEFAULT;

    if (userupdatedAt)
      newUser.userupdatedAt = userupdatedAt;
    else
      newUser.userupdatedAt = config.USERCREATEDEFAULT;

    // Validate Types Documents -> Default from Config
    if (typeDocument) {
      const foundTypeDocument = await TypeDocument.find({ name: { $in: typeDocument } });
      if (foundTypeDocument) {
        newUser.typeDocument = foundTypeDocument.map(typeDocumentArr => typeDocumentArr._id);
      } else {
        const typeDocumentDefault = await TypeDocument.findOne({ name: config.TYPEDOCUMENTDEFAULT });
        newUser.typeDocument = [typeDocumentDefault._id];
      }
    } else {
      const typeDocumentDefault = await TypeDocument.findOne({ name: config.TYPEDOCUMENTDEFAULT });
      newUser.typeDocument = [typeDocumentDefault._id];
    }

    // Validate Roles -> Default from Config
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      if (foundRoles) {
        newUser.roles = foundRoles.map(roleArr => roleArr._id);
      } else {
        const roleDefault = await Role.findOne({ name: config.ROLEDEFAULT });
        newUser.roles = [roleDefault._id];
      }
    } else {
      const roleDefault = await Role.findOne({ name: config.ROLEDEFAULT });
      newUser.roles = [roleDefault._id];
    }

    // Validate state's User -> Default from Config
    if (stateUser) {
      const foundStateUser = await StateUser.find({ name: { $in: stateUser } });
      if (foundStateUser) {
        newUser.stateUser = foundStateUser.map(stateUserArr => stateUserArr._id);
      } else {
        const stateUserDefault = await StateUser.findOne({ name: config.STATEUSERDEFAULT });
        newUser.stateUser = [stateUserDefault._id];
      }
    } else {
      const stateUserDefault = await StateUser.findOne({ name: config.STATEUSERDEFAULT });
      newUser.stateUser = [stateUserDefault._id];
    }

    // Save User in database
    const savedUser = await newUser.save();
    // Create Token with id from saved user 
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 864000 // 24 horas
    })

    res.status(200).json({
      data: {
        token,
        savedUser
      },
      status: true,
      message: "Success",
      count: 1
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
} 
