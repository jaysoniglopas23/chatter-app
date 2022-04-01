import React, {Component} from 'react';

import io from 'socket.io-client';

class Socket extends Component {
  static url = 'http://18.181.88.243:8080';

  static options = {
    reconnection: false,
    timeout: 15000,
    autoConnect: true,
    forceNew: false,
    transports: ['websocket'],
  };

  static ws = null;

  static reconnect = null;

  static connect(_callback, _maintenance) {
    ws = io.connect(this.url, this.options);

    ws.on('connect', function () {
      global.socket = ws;

      _callback();
    });

    setTimeout(function () {
      _maintenance();
    }, 10000);
  }
}

module.exports = Socket;
