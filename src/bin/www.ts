#!/usr/bin/env node

import app from '../app';
import * as http from 'http';
import debug from 'debug';
import config from '../config';

var debug_ = debug('quick-start-express-typescript:server');

var port = normalizePort(config.server.port);
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string): number | string | boolean {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: any): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  function bind(): string {
    var addr = server.address();
    if (addr === null) {
      return '';
    }

    if (typeof addr === 'string') {
      return 'pipe ' + addr;
    }

    if ('port' in addr) {
      return 'port ' + addr.port;
    }

    return '';
  }

  debug_('Listening on ' + bind());
}
