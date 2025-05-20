import { Config } from '../types';
import baseConfig from './baseConfig';
import targetConfig from '../../data/config.json';
import { processEnvSpecificConfig } from './helper';
import { extractHostWithPort } from '../utils/urls';

const prodEnv = process.env.NODE_ENV === 'production'

const nodeEnv = prodEnv ? 'prod' : 'dev';

const config: Config = { ...baseConfig };

processEnvSpecificConfig(targetConfig, nodeEnv, config);

if (config.server.root === '/') {
  config.server.root = '';
}

const host = prodEnv ? extractHostWithPort(config.url) : `localhost:${config.server.port}`;
if (!host) {
  console.log("The process config:\n" + JSON.stringify(config, null, 2));
  throw new Error("`config.url` is invalid.")
}

config.server.host = host;

config.server.url = prodEnv ? config.url : `http://${config.server.host}`;

export default config;
