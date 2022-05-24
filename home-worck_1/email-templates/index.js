const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: 'Це повідомлення з ауф логіна',
    templateName: 'welcome'
  },
  [emailActionsEnum.LOGOUT]: {
    subject: 'Щось розлогінилось',
    templateName: 'logout'
  },
}
