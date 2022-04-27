const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserByHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersByUsernameHandler,
  },
];
module.exports = routes;
