/**************************************************
 * Created by nanyuantingfeng on 14/09/2017 11:51.
 **************************************************/
import PromiseMap from '../src/PromiseMap';

test('{}', async () => {
  return PromiseMap({key1: Promise.resolve(false)})
    .then((actual) => {
      let expected = {key1: false};
      expect(actual).toEqual(expected);
    });
});

test('[]', async () => {
  return PromiseMap([Promise.resolve(true)])
    .then((actual) => {
      let expected = [true];
      expect(actual).toEqual(expected);
    });
});

test('non-promise values in array', async () => {

  return PromiseMap([false])
    .then((actual) => {
      let expected = [false];
      expect(actual).toEqual(expected);
    });
});

test('non-promise values in object', async () => {
  return PromiseMap({key: false})
    .then((actual) => {
      let expected = {key: false};
      expect(actual).toEqual(expected);
    });
});

test('no array or object', async () => {
  return PromiseMap(1234)
    .then((actual) => {
      let expected = 1234;
      expect(actual).toEqual(expected);
    });
});
