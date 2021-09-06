const { users: service } = require("../../services");
const { sendMail } = require("../../utils");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Alredy register",
      });
    }
const verifyToken = "ghgsdfhjddd";
const { email } = await service.add({ ...req.body, verifyToken });

const { URL } = process.env;
const email = {
  to: email,
  subject: "Verify email",
  html: `<a href="${URL}/api/v1/auth/verify/${verifyToken}" target="_blank">Verify email</a>`,
};
await sendMail(email);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register. Please verify email",
    });
  } catch (error) {}
};

module.exports = signup;
