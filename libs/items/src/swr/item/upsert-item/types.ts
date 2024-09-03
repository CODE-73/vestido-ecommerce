import { ItemDetails, ItemUpsertSchemaType } from '../../../services';

export type ItemUpsertRequest = ItemUpsertSchemaType;

export type ItemUpsertResponse = {
  data: ItemDetails;
};
