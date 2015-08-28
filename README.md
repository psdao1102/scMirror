# Screen Companion

Code stuff:
 - revealing module pattern
 - camelCase unless creating ClassObject
 - Grunt workflow
 - routes.js


User
 - role (companion or operator)
 - state (offline, away, online, beforeConnected, connected, afterConnected)
 - callUrl
 - machineIP

Client
 - id, code, rate, notes, isCompanion
 - state (offline, away, online, beforeConnected, connected, afterConnected)
 - callUrl


Functionality for Client:

1. Entire website wrapped in Client.code
 - use localStorage, not cookies
 - if you have entered, shows client info on screen
    - fine print: ability to log in as companion or operator
 - else, Google-ish home page where all you can do is enter client code

2. Launch button
 - creates appear.in room and sets Client.callUrl
 - changes Client.state to 'beforeConnected'
 - says "dialing..." and listens to Client.state
 - when it detects Client.state === 'connected', opens Client.callUrl in new window
 - when it detects Client.state === 'offline||away||online', closes call window


Functionality for User:

1. Sign up, log in, log out.
 - already built!!

2. Dashboard
 - set online/away status
 - if User.machineIP, click to open virtual desktop
 - if User.callUrl, click link to join call


Operator needs:
 - see live, editable table of clients segmented into beforeConnected, afterConnected, connected
 - ability to see similar table for users