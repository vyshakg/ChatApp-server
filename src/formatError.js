import _ from 'lodash';

export default (e) => {
  const result = [];
  console.log(e);
  Object.values(e).map(x => result.push(_.pick(x, ['path', 'message'])));
  console.log(result);
  return result;

  //   return [{ path: 'name', message: 'something went wrong' }];
};
