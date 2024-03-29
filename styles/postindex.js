import _ from 'lodash';
// import users from './users';
import UserPost from './UserPost';

export const contains = ({name, image, path, id, description}, query) => {
  // const {first, last} = userName;
  if (
    description.includes(query) ||
    path.includes(query) ||
    name.includes(query) ||
    nickname.includes(query)
  ) {
    return true;
  }

  return false;
};

export const getUsers = (limit = 250, query = '') => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(UserPost, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(UserPost, user => {
        return contains(UserPost, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default getUsers;
