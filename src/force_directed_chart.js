import cloneDeep from "lodash.clonedeep";

import base_spec from "./specs/force_directed.json";
import { default as find_obj_in_list } from "./find_obj_in_list.js";
import { clone } from "lodash";

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

export function set_edge_colour_metric(
  spec,
  edge_metric_name,
  reverse = false,
  scheme = "redyellowgreen"
) {
  let link_scale = find_obj_in_list(spec.scales, "name", "link_colour");
  link_scale.domain.field = edge_metric_name;
  link_scale.reverse = reverse;
  link_scale.range.scheme = scheme;

  let link_mark = find_obj_in_list(spec.marks, "name", "edges");
  link_mark.encode.update.stroke = {
    scale: "link_colour",
    field: edge_metric_name,
  };

  return spec;
}

function set_edge_thickness_metric(edge_metric_name) {}

function set_edge_length_metric(edge_metric_name) {}

function set_node_radius_metric(edge_metric_name) {}

function set_node_colour_metric(edge_metric_name) {}

export function force_directed_spec(nodes_data, links_data) {
  let base_spec_cp = cloneDeep(base_spec);
  let spec = set_force_directed_node_data(base_spec_cp, nodes_data);
  spec = set_force_directed_edge_data(spec, links_data);
  return spec;
}
