import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Generate the schema object from type definition
export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
