export const roleModerator = (user) => {
  return user && user.roles.indexOf('moderator') !== -1;
};

export const roleAdmin = (user) => {
  return user && user.roles.indexOf('admin') !== -1;
};