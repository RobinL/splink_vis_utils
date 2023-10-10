import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import license from "rollup-plugin-license";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/splink_vis_utils.js",
      format: "umd",
      name: "splink_vis_utils",
    },
  ],
  plugins: [json(), nodeResolve(), commonjs(), license({
    thirdParty: {
      output: {
        file: "dist/dependencies-licenses.txt", // File where the licenses will be written
        encoding: "utf-8", // The encoding of the output file
      },
      includePrivate: true, // Include private packages if any

    },
    banner: {
      commentStyle: "regular",
      content: {
        // Include the generated dependencies-licenses.txt file in the banner
        file: "dist/dependencies-licenses.txt",
        encoding: "utf-8",
      },
    },
  }),],
};
