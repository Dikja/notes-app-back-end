require('dotenv').config();

const Hapi = require('@hapi/hapi');
const authentications = require('./api/authentications');
const notes = require('./api/notes');
const users = require('./api/users');
const AuthenticationsService = require('./services/postgras/AuthenticationsService');
const NotesService = require('./services/postgras/NotesService');
const UsersService = require('./services/postgras/UsersService');
const NotesValidator = require('./validator/notes');
const UsersValidator = require('./validator/users');
const AuthenticationsValidator = require('./validator/authentication');
const TokenManager = require('./api/tokenize/TokenManajer');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const authenticationService = new AuthenticationsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
