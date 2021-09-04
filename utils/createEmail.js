const sendEmail = require("./sendEmail");

const createEmail = (emailList) => {
  const requests = emailList.map((item) => sendEmail(item));
  Promise.allSettled(requests);
};

module.exports = createEmail;
