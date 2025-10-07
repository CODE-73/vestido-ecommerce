import { VestidoResponse } from '@vestido-ecommerce/utils';
import { AddToWishlistArgs, AddToWishlistResult } from 'libs/items/src/services';

export type AddToWishListRequest = AddToWishlistArgs;

export type AddToWishListResponse = VestidoResponse<AddToWishlistResult>