/** Generation facke users */
const usersGenerated = () => {
  const Users = [];

  for (var i = 0; i <= 50; i++) {
    const ts = Date.now() - 86400000 * i;

    const item = {
      id: i,
      name: 'user ' + i,
      email: `User${i}@email.com`,
      product: 'Как наладить отношения в семье',
      last_action: 'view_landing_course1',
      flag_lock: 0,
      last_activity_timestamp: ts,
      registration_timestamp: ts
    };

    Users.push(item);
  }

  return Users;
};

/** Abstract class user profile */
const itemUser = () => {
  return {
    name: '',
    email: '',
    product: '',
    last_action: '',
    flag_lock: 0
  };
};

/** Config vuetify table header titles */
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
  usersGenerated,
  itemUser,
  usersTableHeaders
};
