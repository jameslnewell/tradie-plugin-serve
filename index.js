import debug from 'debug';
import factory from 'spa-server';

const dbg = debug('tradie-plugin-serve');

/**
 * A plugin that adds file serving to tradie
 * @param {object} options
 */
export default (options = {}) => tradie => {
  const {host, port = 5000} = options;

  //only run the server while we're watching
  if (!tradie.watch) {
    return;
  }

  //only run the server while we're building
  if (tradie.command !== 'build') {
    return;
  }

  //configure the server
  const server = factory.create({
    path: tradie.dest,
    verbose: false,
    host,
    port,
    fallback: '/index.html'
  });
  //TODO: use express-http-proxy or http-proxy-middleware to proxy requests to an API and avoid CORS

  //start the server when we start watching
  server.start(() => dbg(`Started server at http://${host ? host : 'localhost'}:${port}`)); //TODO:
  // handle
  // errors

  //stop the server when we stop watching
  tradie.once('command.finished', () => {
    server.stop(() => dbg(`Stopped server at http://${host ? host : 'localhost'}:${port}`)); //TODO: handle errors
  });

};
