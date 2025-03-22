import React from 'react';

const ReturnExchangePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        Vestido Nation Return & Exchange Policy
      </h1>
      <p>
        At Vestido Nation, we strive to provide you with high-quality products
        and a seamless shopping experience. If you are not satisfied with your
        purchase, we offer a hassle-free return and exchange policy.
      </p>

      <section>
        <h2 className="text-xl font-semibold">
          Eligibility for Returns & Exchanges
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Items must be returned within 3 days from the date of delivery.
          </li>
          <li>
            The product must be unused, unworn, unwashed, and in its original
            packaging with tags intact.
          </li>
          <li>
            Certain items such as{' '}
            <span className="italic">
              [non-returnable items like intimates, sale items, etc.]
            </span>{' '}
            are not eligible for returns or exchanges.
          </li>
          <li>
            Proof of purchase (order confirmation email or receipt) is required
            for all returns and exchanges.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Exchanges</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            If you wish to exchange an item for a different size, color, or
            style, please initiate the exchange request within 3 days of
            receiving your order.
          </li>
          <li>
            Once we receive your returned item and it passes our quality check,
            the replacement product will be shipped within 10-15 business days.
          </li>
          <li>
            If the requested exchange item is unavailable, we will offer you
            store credit or a refund option.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Returns & Refunds</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            If you opt for a refund instead of an exchange, a shipping charge of
            ₹199 will be deducted from your refund amount.
          </li>
          <li>
            Refunds will be processed to the original payment method within 2
            business days after we receive and inspect the returned item.
          </li>
          <li>
            Refunds for COD (Cash on Delivery) orders will be issued as store
            credit or transferred to your bank account (bank details will be
            required).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Return & Exchange Process</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Initiate Request:</strong> Contact our customer support team
            at{' '}
            <a
              href="mailto:support@vestidonation.com"
              className="text-blue-600 underline"
            >
              support@vestidonation.com
            </a>{' '}
            or visit{' '}
            {/* <a href="/returns-portal" className="text-blue-600 underline"> */}
            our returns portal
            {/* </a>{' '} */}
            to submit your return/exchange request.
          </li>
          <li>
            <strong>Pack the Item:</strong> Ensure the product is in its
            original packaging with tags attached.
          </li>
          <li>
            <strong>Ship the Product:</strong>
            <ul className="list-disc pl-5">
              <li>A return pickup will be arranged in eligible locations.</li>
              <li>
                If pickup service is unavailable, you will need to ship the item
                to our return address.
              </li>
            </ul>
          </li>
          <li>
            <strong>Processing:</strong> Once we receive and inspect your
            returned item, we will process your exchange or refund accordingly.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Damaged or Incorrect Items</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            If you receive a defective, damaged, or incorrect item, please
            contact us within 3 days of delivery.
          </li>
          <li>
            We will arrange a free return and send a replacement at no extra
            cost.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Important Notes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Refunds/exchanges will be declined if the item fails the quality
            check.
          </li>
          <li>Shipping charges are non-refundable.</li>
          <li>
            If a promotional discount was applied to your order, only the amount
            paid will be refunded.
          </li>
        </ul>
      </section>

      <p className="text-sm text-gray-600">
        For further assistance, reach out to us at{' '}
        <a
          href="mailto:support@vestidonation.com"
          className="text-blue-600 underline"
        >
          support@vestidonation.com
        </a>
        .
      </p>
    </div>
  );
};

export default ReturnExchangePolicy;
