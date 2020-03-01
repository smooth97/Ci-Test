const userList = [
  { id: "1", name: "유승진A", engName: "smooth" },
  { id: "2", name: "유승진B", engName: "smooth" },
  { id: "3", name: "유승진C", engName: "smooth" }
];

const getUsers = ctx => {
  ctx.body = userList;
};

const getUser = ctx => {
  const { id } = ctx.params;

  ctx.body = userList.filter(user => user.id === id);
};

module.exports = {
  getUsers,
  getUser
};
