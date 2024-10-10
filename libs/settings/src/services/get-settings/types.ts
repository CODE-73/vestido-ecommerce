import { getSettings } from './service';

export type GetSettingsResults = Awaited<ReturnType<typeof getSettings>>;
