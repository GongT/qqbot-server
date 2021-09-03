import { resolve } from 'path';

export const PLUGIN_ROOT = process.env.PLUGIN_ROOT || resolve(__dirname, '../../plugins/lib');
