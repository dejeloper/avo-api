import User from "../../model/v1/User";

export const createUser = (req, res) => {
  console.log("Creando")
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.status(200).json({
        data: users,
        status: true,
        message: "Success",
        count: useruserssFound.length
      });
    } else {
      res.status(404).json({
        data: null,
        status: false,
        message: "Users not found",
        count: 0
      })
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}
