import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/splink_vis_utils.js",
      format: "umd",
      name: "splink_vis_utils",
    },
    {
      file: "dist/splink_vis_utils.min.js",
      format: "umd",
      name: "splink_vis_utils",
      plugins: [terser()],
    },
  ],
  plugins: [json()],
};
