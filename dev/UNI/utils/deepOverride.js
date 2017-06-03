import { clone, mergeDeepRight } from 'ramda';

const deepOverride = (obj1, obj2) => {
  return mergeDeepRight(clone(obj1), clone(obj2))
}

export default deepOverride;