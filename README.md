node-dart-auth
==============
Connect middleware for authenticating with Dartmouth CAS servers.

Usage
-----
Usage, for the moment, is limited to restricting/allowing access to routes based on authentication status. Unauthenticated users are redirected to the Dartmouth WebAuth login page. I plan to add finer-grained control in the future, including splash pages and login links. 

```javascript
var dartAuth = require('dart-auth')
var app = require('express')();

app.use(express.cookieParser('secret'));
app.use(express.session());
app.use(dartAuth({ service: 'localhost:3000' }));

app.listen(3000);
```

Express sessions must be enabled above authentication in the middleware chain.

Options
-------
You must pass a `service` option to the middleware. This is sent to the CAS server as the service name. The module will throw an error if no service is specified.

```javascript
dartAuth({ service: 'localhost:3000' })
```

The module takes an optional `logout_url` option. If the logout url is visited, the session will be destroyed and the user will be logged out of the CAS server. If not specified, `logout_url` defaults to `/logout`.

```javascript
dartAuth({ 
    service: 'localhost:3000', 
    logout_url='/user_logout' 
})
```

Stored Properties
----------------
The middleware stores information for authenticated users on `req.session.auth`.

```javascript
req.session.auth = {
    name : NAME,
    netid : NETID,
    username : USERNAME
};
```

Testing
-------
Unit tests are written in Mocha. You need a valid Dartmouth NetId and password to run the tests:

    make USR=netid PWD='password' test
