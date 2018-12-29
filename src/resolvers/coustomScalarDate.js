import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const myCustomScalarType = new GraphQLScalarType({
  name: 'MyCustomScalar',
  description: 'Description of my custom scalar type',
  serialize(value) {
    const result = value.toISOString();

    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseValue(value) {
    const result = new Date(value);

    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseInt(ast.value, 10) : null;
  },
});

const resolverFunctions = {
  MyCustomScalar: myCustomScalarType,
};
export default resolverFunctions;
