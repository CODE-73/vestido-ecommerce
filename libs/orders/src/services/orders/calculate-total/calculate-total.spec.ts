import { getCouponByCode } from '@vestido-ecommerce/coupons';

import { calculateShippingCharges } from '../../shipping/get-shipping-charge';
import { calculateTotal } from './service';

// Mock dependencies
jest.mock('@vestido-ecommerce/coupons');
jest.mock('../../shipping/get-shipping-charge');

describe('calculateTotal Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default shipping mock
    (calculateShippingCharges as jest.Mock).mockResolvedValue({
      shippingCost: 49,
    });
  });

  it('should calculate total correctly without tax and coupon', async () => {
    const testData = {
      orderItems: [
        {
          itemId: '3f8d6bc5-1643-4028-bc67-0df63d8c2807',
          price: 1350,
          qty: 2,
          taxRate: 0,
          taxInclusive: false,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
    };

    const result = await calculateTotal(testData);

    expect(result).toEqual({
      shippingCharges: 49,
      itemsPrice: 4599, // (1350 * 2) + (1899 * 1)
      totalTax: 0,
      discount: 0,
      grandTotal: 4648,
      invalidCoupon: false,
      itemsWithTax: [
        {
          itemId: '3f8d6bc5-1643-4028-bc67-0df63d8c2807',
          price: 1350,
          qty: 2,
          taxRate: 0,
          taxInclusive: false,
          taxAmount: 0,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
          taxAmount: 0,
        },
      ],
    });
  });

  it('should calculate total with one tax inclusive item and one not', async () => {
    const testData = {
      orderItems: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
    };

    const result = await calculateTotal(testData);

    expect(result).toEqual({
      shippingCharges: 49,
      itemsPrice: 3897,
      totalTax: 99.9,
      discount: 0,
      grandTotal: 3946,
      invalidCoupon: false,
      itemsWithTax: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
          taxAmount: 49.95,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
          taxAmount: 0,
        },
      ],
    });
  });

  it('should calculate total with two tax inclusive item', async () => {
    const testData = {
      orderItems: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
        },
        {
          itemId: '77aa6d4a-408c-435d-bab6-185085b51cb3',
          price: 1000,
          qty: 1,
          taxRate: 10,
          taxInclusive: true,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
    };

    const result = await calculateTotal(testData);

    expect(result).toEqual({
      shippingCharges: 49,
      itemsPrice: 2998,
      totalTax: 199.9,
      discount: 0,
      grandTotal: 3047,
      invalidCoupon: false,
      itemsWithTax: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
          taxAmount: 49.95,
        },
        {
          itemId: '77aa6d4a-408c-435d-bab6-185085b51cb3',
          price: 1000,
          qty: 1,
          taxRate: 10,
          taxInclusive: true,
          taxAmount: 100,
        },
      ],
    });
  });

  it('should apply fixed amount coupon discount correctly', async () => {
    const testData = {
      orderItems: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
      couponCode: 'WINTER2024',
    };

    (getCouponByCode as jest.Mock).mockResolvedValue({
      discountType: 'AMOUNT',
      discountAmount: 200,
    });

    const result = await calculateTotal(testData);

    expect(result).toEqual({
      shippingCharges: 49,
      itemsPrice: 1998,
      totalTax: 99.9,
      discount: 200,
      invalidCoupon: false,
      grandTotal: 1847,
      itemsWithTax: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
          taxAmount: 49.95,
        },
      ],
    });
  });

  it('should apply percentage coupon discount correctly', async () => {
    const testData = {
      orderItems: [
        {
          itemId: 'e2d3a2c8-262e-4d95-bfd4-b20ab1c1d125',
          price: 1100,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
      couponCode: 'SUMMER2024',
    };

    (getCouponByCode as jest.Mock).mockResolvedValue({
      discountType: 'PERCENTAGE',
      discountPercent: 10,
    });

    const result = await calculateTotal(testData);

    expect(result).toEqual({
      shippingCharges: 49,
      itemsPrice: 2999,
      totalTax: 0,
      discount: 299.9,
      invalidCoupon: false,
      grandTotal: 2748.1,
      itemsWithTax: [
        {
          itemId: 'e2d3a2c8-262e-4d95-bfd4-b20ab1c1d125',
          price: 1100,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
          taxAmount: 0,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
          taxAmount: 0,
        },
      ],
    });
  });

  it('should apply percentage coupon discount correctly with items having tax', async () => {
    const testData = {
      orderItems: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
        },
        {
          itemId: '77aa6d4a-408c-435d-bab6-185085b51cb3',
          price: 1000,
          qty: 1,
          taxRate: 10,
          taxInclusive: true,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
      couponCode: 'SUMMER2024',
    };

    (getCouponByCode as jest.Mock).mockResolvedValue({
      discountType: 'PERCENTAGE',
      discountPercent: 10,
    });

    const result = await calculateTotal(testData);

    expect(result).toEqual({
      shippingCharges: 49,
      itemsPrice: 2998,
      totalTax: 199.9,
      discount: 279.81,
      invalidCoupon: false,
      grandTotal: 2767.19,
      itemsWithTax: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
          taxAmount: 49.95,
        },
        {
          itemId: '77aa6d4a-408c-435d-bab6-185085b51cb3',
          price: 1000,
          qty: 1,
          taxRate: 10,
          taxInclusive: true,
          taxAmount: 100,
        },
      ],
    });
  });

  it('should return invalidCoupon: true for invalid coupon code', async () => {
    const testData = {
      orderItems: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '12c0f035-16c0-4710-af25-397acaf90846',
      couponCode: 'LALALA',
    };

    (getCouponByCode as jest.Mock).mockResolvedValue(null);

    const result = await calculateTotal(testData);

    expect(result.invalidCoupon).toEqual(true);
    expect(result.discount).toEqual(0);
  });

  it('should handle zero shipping cost', async () => {
    (calculateShippingCharges as jest.Mock).mockResolvedValue({
      shippingCost: null,
    });

    const testData = {
      orderItems: [
        {
          itemId: '717f22a5-6f32-48fb-ab78-5d9833b11ece',
          price: 999,
          qty: 2,
          taxRate: 5,
          taxInclusive: true,
        },
        {
          itemId: '0b645497-83d0-4144-9dcc-bc77f599f66c',
          price: 1899,
          qty: 1,
          taxRate: 0,
          taxInclusive: false,
        },
      ],
      paymentType: 'ONLINE' as const,
      addressId: '4cf4e4ee-5805-4609-9424-b8a917539d3a',
    };

    const result = await calculateTotal(testData);

    expect(result.shippingCharges).toBe(0);
    expect(result.grandTotal).toBe(3897);
  });
});
