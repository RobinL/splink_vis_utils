import base_spec from "./specs/force_directed.json";
import { default as find_obj_in_list } from "./find_obj_in_list.js";

function set_force_directed_node_data(spec, data) {
  let obj = find_obj_in_list(spec.data, "name", "node-data");
  obj["values"] = data;
  return spec;
}

function set_force_directed_edge_data(spec, data) {
  let obj = find_obj_in_list(spec.data, "name", "link-data");
  obj["values"] = data;
  return spec;
}

export function force_directed_spec(nodes_data, links_data) {
  let spec = set_force_directed_node_data(base_spec, nodes_data);
  spec = set_force_directed_edge_data(spec, links_data);
  return spec;
}
