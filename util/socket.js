import { Server } from 'socket.io';
import APIError from './api-error.js';

let io;

export function init(httpServer) {
  io = new Server(httpServer);
  return io;
}

export function getIO() {
  if (!io) {
    throw APIError.internalServerError('Unable to establish connection');
  }
  return io;
}
