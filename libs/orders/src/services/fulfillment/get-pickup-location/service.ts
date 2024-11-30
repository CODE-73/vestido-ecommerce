import { getShiprocketPickupLocation } from '@vestido-ecommerce/shiprocket';

export async function getPickupLoc() {
  const response = await getShiprocketPickupLocation();

  const pickupLocations = response.data.shipping_address.map(
    (address: { pickup_location: string }) => address.pickup_location,
  );

  return pickupLocations;
}
