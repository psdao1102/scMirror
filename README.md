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


Style Notes:
 - Primary color: #002e66
 - Secondary color: #6e0022
 - Accent color: #ffffff
 
 How to test current product
  - Go to /admin
  - create user(remember code)
  - Open differnet browser
  - click join and create account
  - sign in
  - click dashboard
  - go to first browser, go to home page, and enter code
  - go to second browser, refresh dashboard page and the user should show up.
  - clicking open will open an appear.in page with the code
  - clicking connect will open the appear.in page on the first browser