import { getConfig } from '../knexfile';
import knex from 'knex';

const wknex = knex(getConfig());

export default wknex;
