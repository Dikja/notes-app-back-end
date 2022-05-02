const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/notes',
    handler: handler.postExportNotesByHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];
module.exports = routes;
