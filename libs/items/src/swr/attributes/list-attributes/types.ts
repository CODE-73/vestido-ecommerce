import { VestidoResponse } from '@vestido-ecommerce/auth/client';

import {
  ListAttributeArgs,
  ListAttributesResult,
} from '../../../services/attributes/list-attributes/types';

export type ListAttributeRequest = ListAttributeArgs;

export type ListAttributeResponse = VestidoResponse<ListAttributesResult>;
