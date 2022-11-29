// Create a new window for the login flow.
function login() {
  identityWindow = window.open('https://identity.deso.org/log-in?accessLevelRequest=' +
    accessLevel, null, 'toolbar=no, width=800, height=1000, top=0, left=0');

}

// Check if the window is closed.
function handleInit(e) {
  if (!init) {
    init = true;

    for (const e of pendingRequests) {
      e.source.postMessage(e, "*");
    }

    pendingRequests = []
    pm_id = e.data.id
    source = e.source
  }
  respond(e.source, e.data.id, {})
}

// Handle a message from the login window.
function handleLogin(payload) {
  user = payload['users'][payload.publicKeyAdded]
  user['publicKey'] = payload.publicKeyAdded;

  if (identityWindow) {
    if (JWT === false) {
      identityWindow.close();
      identityWindow = null;
      resolve(user)
    } else {
      let payload = {
        accessLevel: user.accessLevel,
        accessLevelHmac: user.accessLevelHmac,
        encryptedSeedHex: user.encryptedSeedHex
      };
      source.postMessage({
        id: pm_id,
        service: 'identity',
        method: 'jwt',
        payload: payload
      }, "*");
    }
  }
}


function handleJWT(payload) {
  user['jwt'] = payload['jwt'];
  if (identityWindow) {
    identityWindow.close();
    identityWindow = null;
  }
  resolve(user);
}


function respond(e, t, n) {
  e.postMessage({
    id: t,
    service: "identity"
  }, "*")
}


window.addEventListener('message', message => {
  console.log('Listening: ', message)
  const {data: {id: id, service: service, method: method, payload: payload}} = message;

  if (service !== "identity") {
    console.log("invalid service: ", service);

    return
  };
  if (method === 'initialize') {
    console.log('initialize');
    handleInit(message);
  } else if (method === 'login') {
    console.log('login');
    handleLogin(payload);
  } else if ('jwt' in payload) {
    console.log('jwt');
    handleJWT(payload);
  }
});

let init = false;
let accessLevel = 2;
let JWT = false;
let pm_id = ''
let source = null;
let user = null;
let pendingRequests = [];
let identityWindow = null;
