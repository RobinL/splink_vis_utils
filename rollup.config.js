import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/splink_vis_utils.js",
      format: "umd",
      name: "splink_vis_utils",
    },
  ],
  plugins: [json(), nodeResolve(), commonjs()],
};
