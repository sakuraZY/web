const {
  urlType,
  systemName,
  loginPath,
  subSystemName,
  needTicketUrlType,
  ticketExpiry,
  personalId,
  enterpriseId,
  personalQueryId,
} = require('../../public/geo.config.json');

export default {
  urlType,
  systemName,
  subSystemName,
  loginPath: localStorage.getItem('loginPath') || loginPath || '/login',
  needTicketUrlType,
  ticketExpiry,
  personalId,
  enterpriseId,
  personalQueryId,
};
