import { VestidoResponse } from '@vestido-ecommerce/auth/client';

import { type ListAttributesResponse as _ListAttributesResponse } from '../../../services/attributes/list-attributes/types';

export type AttributeListResponse = VestidoResponse<_ListAttributesResponse>;
