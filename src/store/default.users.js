const defaultUsers = () => {
  const Users = [];

  for (var i = 1; i <= 5; i++) {
    const ts = Date.now() - 86400000 * i;

    const item = {
      id: i,
      name: 'user ' + i,
      email: `User${i}@email.com`,
      product: 'Как наладить отнош',
      last_action: 'view_landing_course1',
      flag_lock: 0,
      last_activity_timestamp: ts,
      registration_timestamp: ts
    };

    Users.push(item);
  }

  return Users;
};

const itemUser = () => {
  return {
    name: '',
    email: '',
    product: '',
    last_action: '',
    flag_lock: 0
  };
};

const usersTableHeaders = () => {
  return [{
    text: 'Пользователь',
    align: 'start',
    sortable: false,
    filterable: false,
    value: 'name',
  },
  {
    text: 'Дата регистрации',
    align: 'start',
    sortable: false,
    value: 'registration_timestamp'
  },
  {
    text: 'Последняя активность',
    align: 'start',
    sortable: false,
    filterable: false,
    value: 'last_activity_timestamp'
  },
  {
    text: 'Последнее действие',
    align: 'start',
    sortable: false,
    filterable: false,
    value: 'last_action'
  },
  {
    text: 'Продукт',
    align: 'start',
    sortable: false,
    filterable: false,
    value: 'product'
  },
  {
    text: '',
    value: 'actions',
    sortable: false
  }
  ];
};

export {
  defaultUsers,
  itemUser,
  usersTableHeaders
};
