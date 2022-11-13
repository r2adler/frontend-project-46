import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = buildTree(obj1[key], obj2[key]);
      return { key, type: 'nested', children };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        value1: obj1[key],
        value2: obj2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
};

export default buildTree;
