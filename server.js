'use strict';

const Hapi = require('hapi');
const authPlugin = require('./plugins/auth/index');

const user = {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a'
};

// Create a server with a host and port
const server = Hapi.server({
    host:'localhost',
    port:8000
});

const validate = async (request, username, password, h) => {

    console.log('validate');
    debugger;
    return { isValid: true, credentials: { ...user } };

    // if (username === 'help') {
    //     return { response: h.redirect('https://hapijs.com/help') };     // custom response
    // }

    // const user = users[username];
    // if (!user) {
    //     return { credentials: null, isValid: false };
    // }

    // const isValid = await Bcrypt.compare(password, user.password);
    // const credentials = { id: user.id, name: user.name };

    // return { isValid, credentials };
};

// Start the server
async function start() {
    await server.register([
        {
            plugin: require('hapi-auth-basic')
        }
    ]);
    
    // toDo -> implement auth
    server.auth.strategy('simple', 'basic', {
        validate,
        allowEmptyUsername: true
    });
    // toDo -> set default after
    server.auth.default('simple');

    // Routes
    server.route({
        method:'GET',
        config: {
            auth: false,
        },
        path:'/hello',
        handler:function(request,h) {

            return'hello world';
        }
    });

    server.route({
        // auth: 'simple',
        method: 'POST',
        path: '/registration',
        handler: (req, h) => {
            return h.response('You successfully pathh authentification');
        }
    });

    // toDo -> implement db auth with mySql
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();