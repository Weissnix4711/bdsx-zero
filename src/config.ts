/* -------------------------------------------------------------------------- */
/*                    Parse configuration from custom.yaml                    */
/* -------------------------------------------------------------------------- */
/* YAML is easier, supports comments, and this script provides any other mods */
/* with easy to use functions to read configuration                           */
/* -------------------------------------------------------------------------- */
/* Exports are the following:                                                 */
/*   rawConfig <-- config in raw (yaml)                                       */
/*   readConfig() <-- function to read (and return) the config                */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import fs from 'fs';
import path from "path";
import { parse } from 'yaml';

/* ---------------------------------- Main ---------------------------------- */

export const rawConfig = fs.readFileSync(path.resolve(__dirname, '.././custom.yaml'), 'utf-8');

export const readConfig = () => {
  try {
    const config = parse(rawConfig);
    return(config);
  } catch(err) {
    throw(err);
  }
}

/* -------------------------------------------------------------------------- */
