import AdminSchema from "../RegisterSchema/AdminSchema.js";
import user from "../RegisterSchema/UserSchema.js";
import bcrypt from "bcryptjs";

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const checkUser = await user.findOne({ email });
    const checkAdmin = await AdminSchema.findOne({ email });
    const hashPassword = bcrypt.hashSync(password, 10);
    if (!checkUser && !checkAdmin) {
      // await AdminSchema.create({
      //   name,
      //   email,
      //   password : hashPassword
      // })
      const userCreated = await user.create({
        name,
        email,
        password: hashPassword,
      });
      res.status(201).json({
        name: userCreated.name,
        id: userCreated._id,
        email: userCreated.email,
      });
    } else {
      res.status(400).json({ message: "User Already exists" });
    }
  } else {
    res.status(400).json({ message: "Fill all the details" });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const checkUser = await user.findOne({ email });
    const chechAdmin = await AdminSchema.findOne({ email });
    if (checkUser || chechAdmin) {
      const userData = await user.find();

      if (chechAdmin) {
        const checkPassword = await bcrypt.compare(
          password,
          chechAdmin.password
        );
        if (checkPassword) {
          res.status(200).json({
            userData: userData,
            name: chechAdmin.name,
            id: chechAdmin._id,
          });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      } else if (checkUser) {
        const checkPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (checkPassword) {
          res.status(200).json({
            name: checkUser.name,
            id: checkUser._id,
            email: checkUser.email,
          });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        res.status(400).json({ message: "User Not Found" });
      }
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } else {
    res.status(400).json({ message: "Fill all the details" });
  }
};

const Register = {
  SignIn,
  SignUp,
};
export default Register;
