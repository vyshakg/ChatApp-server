import _ from 'lodash';

export default (e) => {
  const result = [];
  if (e.name === 'ValidationError') {
    if (e.isJoi) {
      // eslint-disable-next-line array-callback-return
      Object.values(e.details).map((err) => {
        const obj = _.pick(err, ['path', 'message']);
        result.push({
          path: obj.path[0],
          message: obj.message,
        });
      });
    } else {
      Object.values(e.errors).map(err => result.push(_.pick(err, ['path', 'message'])));
    }
  } else if (e.extensions.code === 'UNAUTHENTICATED') {
    result.push({
      path: 'global',
      message: 'Incorrect email or password. Please try again.',
    });
  }
  return result;
  //   return [{ path: 'name', message: 'something went wrong' }];
};
