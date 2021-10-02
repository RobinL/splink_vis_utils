export default function find_obj_in_list(list, key, value) {
  return list.find(function (item) {
    if (item[key] === value) {
      return true;
    }
  });
}
