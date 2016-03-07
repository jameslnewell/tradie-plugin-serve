import debug from 'debug';
import factory from 'spa-server';

const dbg = debug('tradie-plugin-serve');

/**
 * A plugin that adds file serving to Tradie
 * @param {tradie} tradie
 * @param {object} config
 */
export default function(tradie, config) {
  tradie.once('command.started', cmd => {

    if (!cmd.args.watch) {
      return;
    }

    switch (cmd.name) {

      case 'build':
      case 'bundle':
      case 'bundle-scripts':
      case 'bundle-styles':

        //configure the defaults
        const dir = config.public || tradie.config.scripts.dest;
        const host = config.host || undefined;
        const port = config.port || 5000;

        //configure the server
        const server = factory.create({
          path: dir,
          verbose: false,
          host,
          port,
          fallback: '/index.html'
        });
        //TODO: use express-http-proxy or http-proxy-middleware to proxy requests to an API and avoid CORS

        //start the server when we start watching
        server.start(() => debug('Server started')); //TODO: handle errors

        //stop the server when we stop watching
        tradie.once('command.finished', () => {
          server.stop(() => debug('Server stopped')); //TODO: handle errors
        });

        break;

      default:
        break;

    }

  });
};
