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

/** @type {import('webpack').Configuration[]} */
export default [
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
      filename: 'cjs/index.js',
      path: path.resolve(__dirname, '../../dist'),
      library: { name: 'Maskfy', type: 'commonjs2', umdNamedDefine: true },
      globalObject: 'this',
    },
    target: 'node',
  },
  {
    ...baseConfig,
    output: {
      filename: 'amd/index.js',
      path: path.resolve(__dirname, '../../dist'),
      library: { name: 'Maskfy', type: 'umd2', umdNamedDefine: true },
      globalObject: 'this',
    },
    target: 'web',
  },
];
