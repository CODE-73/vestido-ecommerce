const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Vestido Nation Shipping Policy</h1>
      <p>
        Thank you for shopping with Vestido Nation! We are committed to
        delivering your orders promptly and ensuring a seamless shopping
        experience. Please review our detailed shipping policy below.
      </p>

      <section>
        <h2 className="text-xl font-semibold">Shipping Destinations</h2>
        <p>We currently ship only within India.</p>
        <p>
          If your location is not listed, please contact our customer support
          team for assistance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Order Processing Time</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Orders are processed within 1-3 business days (excluding weekends
            and public holidays) after payment confirmation.
          </li>
          <li>
            Orders placed after the cut-off time will be processed the next
            business day.
          </li>
          <li>
            During high-demand periods (such as sales or holidays), processing
            may take longer.
          </li>
          <li>
            Once your order is shipped, you will receive an email with tracking
            details.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Shipping Methods & Estimated Delivery Time
        </h2>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-900">
              <th className="border border-gray-300 p-2">Shipping Method</th>
              <th className="border border-gray-300 p-2">
                Estimated Delivery Time
              </th>
              <th className="border border-gray-300 p-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Standard Shipping</td>
              <td className="border border-gray-300 p-2">5-8 business days</td>
              <td className="border border-gray-300 p-2">No Cost</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Express Shipping</td>
              <td className="border border-gray-300 p-2">Coming Soon</td>
              <td className="border border-gray-300 p-2">N/A</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-600">
          Delivery times may vary based on location and other unforeseen
          circumstances.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Shipping Fees & Free Shipping Policy
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Shipping fees are calculated at checkout based on your location and
            selected shipping method.
          </li>
          <li>Free shipping is available for all prepaid orders.</li>
          <li>
            For Cash on Delivery (COD) orders outside Kerala, a shipping charge
            of ₹49 will apply.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Order Tracking</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Our tracking page is already available on our website.</li>
          <li>
            Once your order has been shipped, you will receive a tracking number
            via SMS.
          </li>
          <li>
            You can track your order using the tracking link provided in the
            SMS.
          </li>
          <li>
            If you experience issues with tracking, please contact our support
            team.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Delivery Issues: Lost, Stolen, or Delayed Shipments
        </h2>
        <p>
          If your order is significantly delayed, lost, or marked as delivered
          but not received, please contact our support team immediately.
        </p>
        <p>
          We will coordinate with the shipping provider to resolve the issue.
        </p>
        <p>
          <strong>Note:</strong> Vestido Nation is not responsible for stolen
          packages after delivery confirmation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Address Changes & Order Modifications
        </h2>
        <p>
          If you need to change your shipping address after placing an order,
          please contact us within 24 hours at{' '}
          <a
            href="mailto:order@vestidonation.com"
            className="text-blue-600 underline"
          >
            order@vestidonation.com
          </a>
          .
        </p>
        <p>
          Once the order has been processed, we cannot guarantee modifications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Return Due to Failed Delivery</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            If an order is returned due to an incorrect address or failure to
            collect, the customer will be responsible for reshipping costs.
          </li>
          <li>
            Refunds will be processed minus shipping and handling charges.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Returns & Exchanges</h2>
        <p>
          Please refer to our{' '}
          {/* <a href="/returns-exchanges" className="text-blue-600 underline"> */}
          Return & Exchange Policy
          {/* </a>{' '} */}
          for details on returning or exchanging products.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        For any further questions, feel free to contact us at{' '}
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

export default ShippingPolicy;
