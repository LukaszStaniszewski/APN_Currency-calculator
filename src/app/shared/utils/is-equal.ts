export const isEqual = (object1: any, object2: any): boolean => {
  let result = null;

  try {
    result = JSON.stringify(object1) === JSON.stringify(object2);
  } catch (e) {
    console.error(e)
  }

  return result!!
}
