import { CommandRegistry } from '../protocol/commands';
import { EventRegistry } from '../protocol/events';

export const ipcChannel: EventRegistry & CommandRegistry = {} as any;
