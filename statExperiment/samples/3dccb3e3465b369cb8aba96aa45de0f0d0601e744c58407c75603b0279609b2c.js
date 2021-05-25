'use strict';
(function () {
    var socketIoWrapper = function (host) {
        var params = {
            'gcUniqId': window.gcUniqId,
            'accountId': window.accountId,
            'accountUserId': window.accountUserId,
            'gcSessionId': window.gcSessionId,
        };

        var socket = io.connect(host, {
            transports: ['websocket'],
            query: $.param(params)
        });

        var channels = {};

        this.pageKey = encodeURI(location.pathname.replace(/\//gm, '_').replace(/_$/gm, ''));

        this.getSocket = function () {
            return socket;
        };

        this.getChannels = function () {
            return channels;
        };

        this.subscribeChannel = function(channel, handler) {
            if (!channels[channel]) {
                socket.emit('join', {
                    channel: channel
                });

                channels[channel] = {handler: handler};
            }
        };

        this.unsubscribeChannel = function (channel) {
            if (channels[channel]) {
                socket.emit('leave', {channel: channel});

                delete channels[channel];
            }
        };

        socket.on('message', function (data) {

            var json = data.json;
            var channel = json.channel;

            if (undefined !== channels[channel]) {
                channels[channel].handler(JSON.stringify(data), json);
            }
        });

        socket.on('reconnect', function () {
            for (var i in channels) {
                socket.emit('join', {
                    channel: i
                });
            }
        });
    };

    window.accountUserWebSocketConnection = new socketIoWrapper(window.webSocketHost);
})();