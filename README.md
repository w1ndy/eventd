# eventd
> A socket.io-based tool that helps you trigger events on clients by POSTing a server.
---

## Mechanism

```
HTTP Clients (curl, Siri Shortcuts, etc.) -- POST -> eventd Server (A) <- WebSocket -> eventd Clients (B)
```

## Usage

1. Change the API key in server.js.
1. Customize the events in the ``EVENTS`` array in client.js.
2. Set up the server by running ``npm install && npm run server`` on Machine A.
3. Set up the client by running ``npm install && HOST=A npm run client`` on Machine B.
4. Invoke events by POSTing the ``8999`` port of Machine A (http://A:8999/invoke/<EVENT_NAME>) with API key (key=<API_KEY>)

## Options

* Ports can be customized with the PORT environment variable.

## To Do
* [ ] Add HTTPS support
* [ ] Authenticating clients on the server

## License
MIT
