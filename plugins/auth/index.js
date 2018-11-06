// plugins
const plugin = {
    name: 'test',
    version: '1.0.0',
    register: function (server, options) {

        server.route({
            method: 'POST',
            path: '/registration',
            handler: function (request, h) {
                return 'ok';
            }
        });
    }
};

module.exports = plugin;