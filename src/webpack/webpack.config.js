import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseConfig = {
  entry: './src/maskfy.ts',
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }] },
  optimization: { minimize: true, minimizer: [new TerserPlugin()] },
  mode: 'production',
};

export default [
  {
    ...baseConfig,
    output: {
      filename: 'cjs/index.js',
      path: path.resolve(__dirname, '../../dist'),
      library: { type: 'commonjs2' },
    },
    target: 'node',
  },
  {
    ...baseConfig,
    output: {
      filename: 'esm/index.js',
      path: path.resolve(__dirname, '../../dist'),
      library: { type: 'module' },
    },
    experiments: {
      outputModule: true,
    },
    target: 'es2020',
  },
  {
    ...baseConfig,
    output: {
      filename: 'amd/index.js',
      path: path.resolve(__dirname, '../../dist'),
      library: { type: 'amd' },
    },
    target: 'web',
  },
  {
    ...baseConfig,
    output: {
      filename: 'vanilla/index.js',
      path: path.resolve(__dirname, '../../dist'),
    },
    target: 'web',
  },
];
