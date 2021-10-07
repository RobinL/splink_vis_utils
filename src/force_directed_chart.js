import cloneDeep from "lodash.clonedeep";

import base_spec from "./specs/force_directed.json";
import { default as find_obj_in_list } from "./find_obj_in_list.js";
import { default as replace_in_list_or_push } from "./replace_in_list_or_push.js";

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
    scheme = "redyellowgreen",
    explicit_domain = null
  ) {
    const new_link_scale = {
      name: "link_colour",
      type: "linear",
      domain: { data: "link-data", field: edge_metric_name },
      range: { scheme: scheme },
      reverse: reverse,
    };
    if (explicit_domain != null) {
      new_link_scale.domain = explicit_domain;
    }

    replace_in_list_or_push(
      this.spec.scales,
      "name",
      "link_colour",
      new_link_scale
    );

    let link_mark = find_obj_in_list(this.spec.marks, "name", "edges");

    link_mark.encode.update.stroke = {
      scale: "link_colour",
      field: edge_metric_name,
    };
  }

  set_edge_thickness_metric(edge_metric_name, reverse = false) {
    const new_thickness_scale = {
      name: "link_thickness",
      type: "linear",
      domain: { data: "link-data", field: edge_metric_name },
      range: [0.5, 5],
      reverse: reverse,
    };

    replace_in_list_or_push(
      this.spec.scales,
      "name",
      "link_thickness",
      new_thickness_scale
    );

    let link_mark = find_obj_in_list(this.spec.marks, "name", "edges");

    link_mark.encode.update.strokeWidth = {
      scale: "link_thickness",
      field: edge_metric_name,
    };
  }

  set_edge_length_metric(edge_metric_name, reverse = false) {
    const new_edge_length_scale = {
      name: "edge_length_scale",
      type: "linear",
      domain: { data: "link-data", field: edge_metric_name },
      range: [50, 200],
      reverse: reverse,
    };

    replace_in_list_or_push(
      this.spec.scales,
      "name",
      "edge_length_scale",
      new_edge_length_scale
    );

    const new_force = {
      force: "link",
      id: "datum.__node_id",
      links: "link-data",
      distance: {
        expr: `scale('edge_length_scale',datum.${edge_metric_name})*linkDistance`,
      },
    };

    let link_mark = find_obj_in_list(this.spec.marks, "name", "nodes");
    let force_transform = find_obj_in_list(
      link_mark.transform,
      "type",
      "force"
    );
    replace_in_list_or_push(force_transform.forces, "force", "link", new_force);
  }

  set_node_radius_metric(node_metric_name, reverse = false) {
    const new_node_radius_scale = {
      name: "node_radius_scale",
      type: "linear",
      nice: false,
      reverse: reverse,
      domain: { data: "node-data", field: node_metric_name },
      range: [400, 2000],
    };

    replace_in_list_or_push(
      this.spec.scales,
      "name",
      "node_radius_scale",
      new_node_radius_scale
    );

    let node_mark = find_obj_in_list(this.spec.marks, "name", "nodes");

    node_mark.encode.update.size = {
      scale: "node_radius_scale",
      field: node_metric_name,
      mult: { signal: "nodeRadius" },
    };

    let force_transform = find_obj_in_list(
      node_mark.transform,
      "type",
      "force"
    );
    let force_collide = find_obj_in_list(
      force_transform.forces,
      "force",
      "collide"
    );
    force_collide.radius.expr = `pow(scale('node_radius_scale',datum.datum.${node_metric_name})*nodeRadius,0.5)`;
  }

  set_node_colour_metric(
    node_metric_name,
    reverse = false,
    scheme = "redyellowgreen"
  ) {
    const new_node_colour_scale = {
      name: "node_colour_scale",
      type: "linear",
      nice: false,
      reverse: reverse,
      domain: { data: "node-data", field: node_metric_name },
      range: { scheme: scheme },
    };

    replace_in_list_or_push(
      this.spec.scales,
      "name",
      "node_colour_scale",
      new_node_colour_scale
    );

    let node_mark = find_obj_in_list(this.spec.marks, "name", "nodes");

    node_mark.encode.update.fill = {
      scale: "node_colour_scale",
      field: node_metric_name,
    };
  }

  remove_all_sliders() {
    this.spec.signals.forEach((signal) => {
      delete signal.bind;
    });
  }
}

export { ForceDirectedChart };
