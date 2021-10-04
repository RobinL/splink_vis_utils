export default function replace_in_list_or_push(list, key, value, obj) {
  const foundIndex = list.findIndex(function (item) {
    if (item[key] === value) {
      return true;
    }
  });

  if (foundIndex == -1) {
    list.push(obj);
  } else {
    list[foundIndex] = obj;
  }
}
