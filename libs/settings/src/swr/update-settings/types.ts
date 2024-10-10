import { VestidoResponse } from '@vestido-ecommerce/utils';

import { UpdateSettingsSchemaType } from '../../services';
import { GetSettingsResults } from '../../services/get-settings/types';

export type UpdateSettingsResponse = VestidoResponse<GetSettingsResults>;
export type UpdateSettingsRequest = UpdateSettingsSchemaType;
