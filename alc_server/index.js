/* eslint-disable no-new */
import express from 'express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import SubscriptionServer from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import OpticsAgent from 'optics-agent';
import cors from 'cors';
import schema from './schema/index';
import models from './models';

const start = async () => {
  // const PORT = 1337;
  const app = express();

  const buildOptions = async (req, res) => ({
    schema: OpticsAgent.instrumentSchema(schema),
    context: {
      models,
      opticsContext: OpticsAgent.context(req),
    },
  });

  app.use(cors());
  app.set('port', (process.env.PORT || 3000));
  app.use(OpticsAgent.middleware());
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

  const server = createServer(app);

  models.sequelize.sync().then(() => (
    server.listen(app.get('port'), () => {
      // SubscriptionServer.create(
      //   { execute, subscribe, schema },
      //   { server, path: '/subscriptions' },
      // );
      console.log(`GraphQL server running on port`, app.get('port'));
    })
  ));
};

start();
