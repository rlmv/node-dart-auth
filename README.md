node-dart-auth
==============
Connect middleware for authenticating with Dartmouth CAS servers.

Usage
-----
Usage, for the moment, is limited to restricting/allowing access to routes based on authentication status. Unauthenticated users are redirected to the Dartmouth WebAuth login page. I plan to add finer-grained control in the future, including splash pages and login links. 

    ```javascript
    var dart_auth = require('dart-auth')
    var app = require('express')();

    app.use(express.cookieParser('secret'));
    app.use(express.session());
    app.use(dart-auth({ service: 'localhost:3000' }));

    app.listen(3000);
    ```

Express sessions must be enabled higher up in the middleware chain than authentication.

Testing
-------
Unit tests are written in Mocha. You need a valid Dartmouth NetId and password to run the tests:
    
    USR=netid PWD='password' make test

or
    make USR=netid PWD='password' test
