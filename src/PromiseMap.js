/**************************************************
 * Created by nanyuantingfeng on 14/09/2017 11:47.
 **************************************************/
import isPlainObject from 'is-plain-obj';

export default function (map) {

  if (Array.isArray(map)) {
    return Promise.all(map);
  }

  if (!isPlainObject(map)) {
    return Promise.resolve(map);
  }

  const keys = Object.keys(map);
  const promises = keys.map(key => map[key]);

  return Promise.all(promises)
    .then(results => keys.reduce((obj, key, i) => {
      obj[key] = results[i];
      return obj;
    }, {}));
}
