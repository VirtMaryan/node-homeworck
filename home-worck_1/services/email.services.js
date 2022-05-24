const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');

const { SYSTEM_MAIL, SYSTEM_MAIL_PASSWORD, FRONTEND_URL } = require('../config/config');
const templateInfoObject = require('../email-templates');
const { ApiError } = require('../error');

const sendMail = async (userMail, emailAction, locals = {}) => {
  const templateRenderer = new EmailTemplate({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  });

  const templateInfo = templateInfoObject[emailAction];

  if (!templateInfo) {
    throw new ApiError('wrong email action')
  }

  Object.assign(locals, { frontendURL: FRONTEND_URL });

  const html = await templateRenderer.render(templateInfo.templateName, locals);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SYSTEM_MAIL,
      pass: SYSTEM_MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: SYSTEM_MAIL,
    to: userMail,
    subject: templateInfo.subject,
    html
  })
};

module.exports = {
  sendMail
}
