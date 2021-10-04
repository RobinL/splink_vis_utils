import cloneDeep from "lodash.clonedeep";

import base_spec from "./specs/force_directed.json";
import { default as find_obj_in_list } from "./find_obj_in_list.js";

class ForceDirectedChart {
  constructor(nodes_data, links_data) {
    let base_spec_cp = cloneDeep(base_spec);
    this.spec = base_spec_cp;
    this.set_force_directed_node_data(nodes_data);
    this.set_force_directed_edge_data(links_data);
  }

  set_force_directed_node_data(data) {
    let obj = find_obj_in_list(this.spec.data, "name", "node-data");
    obj["values"] = data;
  }

  set_force_directed_edge_data(data) {
    let obj = find_obj_in_list(this.spec.data, "name", "link-data");
    obj["values"] = data;
  }

  set_edge_colour_metric(
    edge_metric_name,
    reverse = false,
    scheme = "redyellowgreen"
  ) {
    let link_scale = find_obj_in_list(this.spec.scales, "name", "link_colour");
    link_scale.domain.field = edge_metric_name;
    link_scale.reverse = reverse;
    link_scale.range.scheme = scheme;

    let link_mark = find_obj_in_list(this.spec.marks, "name", "edges");
    link_mark.encode.update.stroke = {
      scale: "link_colour",
      field: edge_metric_name,
    };
  }

  set_edge_thickness_metric(edge_metric_name) {}

  set_edge_length_metric(edge_metric_name) {
    let a = 1;
  }

  set_node_radius_metric(edge_metric_name) {}

  set_node_colour_metric(edge_metric_name) {}

  spec() {}
}

export { ForceDirectedChart };
