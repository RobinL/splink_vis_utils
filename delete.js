// import { force_directed_spec } from "./dist/splink_vis_utils.js";
import { force_directed_spec } from "./src/index.js";

// svu = require("./dist/splink_vis_utils.js");
let nodes_data = [{ node_id: 1 }, { node_id: 2 }];
let edges_data = [{ src: 1, dst: 2 }];

let a = force_directed_spec(nodes_data, edges_data);
let b = a;
