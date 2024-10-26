import { type updateSettings } from './service';
import { UpdateSettingsSchemaType } from './zod';

export type UpdateSettingsArgs = UpdateSettingsSchemaType;
export type UpdateSettingsResult = Awaited<ReturnType<typeof updateSettings>>;
