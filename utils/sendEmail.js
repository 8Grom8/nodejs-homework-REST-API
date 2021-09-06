const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  const email = {
    from: "mlcorp@ukr.net",
    to,
    subject,
    html,
  };
  const result = await sgMail.send(email);
  return result;
};
