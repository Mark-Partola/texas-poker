import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./src/app.ts",
  output: {
    file: "./dist/bundle.js",
    format: "umd",
    sourcemap: "inline"
  },
  plugins: [typescript(), resolve({ jsnext: true }), commonjs()]
};
