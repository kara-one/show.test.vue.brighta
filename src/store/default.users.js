const defaultUsers = () => {
  const Users = [];

  for (var i = 1; i <= 5; i++) {
    const ts = Date.now() - 86400000 * i;

    const item = {
      id: i,
      name: 'user ' + i,
      email: `User${i}@email.com`,
      product: 'very-well',
      last_action: 'Polo',
      flag_lock: 0,
      last_activity_timestamp: ts,
      registration_timestamp: ts
    };

    Users.push(item);
  }

  return Users;
};

export {
  defaultUsers
};
