const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  // Menambahkan catatan
  async postNoteHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);

      const { title = 'untitled', body, tags } = request.payload;

      const noteId = await this._service.addNote({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'Error',
        message: 'Maaf, Terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Menampilkan semua catatan
  async getNotesHandler() {
    const notes = await this._service.getNotes();

    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  // Menampilkan Catatan berdasarkan ID

  async getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const note = await this._service.getNoteById(id);

      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(404);
        return response;
      }
      const response = h.response({
        status: 'Error',
        message: 'Maaf, Terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // memperbarui Catatan
  async putNoteByIdHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);

      const { id } = request.params;

      await this._service.editNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(400);
        return response;
      }
      const response = h.response({
        status: 'Error',
        message: 'Maaf, Terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Menghapus Catatan
  async deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(404);
        return response;
      }
      const response = h.response({
        status: 'Error',
        message: 'Maaf, Terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
module.exports = NotesHandler;
