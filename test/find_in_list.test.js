import { default as find_obj_in_list } from "../src/find_obj_in_list.js";

test("Test find obj in list", () => {
  const list = [
    { a: 1, b: 1 },
    { a: 2, b: 2 },
    { a: 3, b: 3 },
  ];
  const obj = find_obj_in_list(list, "a", 2);
  expect(obj).toEqual({ a: 2, b: 2 });
});
