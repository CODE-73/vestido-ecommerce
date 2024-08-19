import React from 'react';

const ShippingAndDeliveryPolicies: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-stone-500">
      <h1 className="text-2xl text-black font-semibold mb-6">
        Shipping and Return Policies
      </h1>

      <section className="space-y-4 mb-8">
        <h2 className="text-lg text-black font-semibold">Shipping Policy</h2>
        <p className="text-base">
          At Vestido Nation, we strive to provide fast and reliable shipping for
          all orders. Here is what you can expect from our shipping policy:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Free Shipping: We offer free standard shipping on all orders within
            Kerala.
          </li>
          <li>
            Processing Time: Orders are typically processed and shipped within 7
            business days.
          </li>
          <li>
            Shipping Methods: We partner with trusted carriers to ensure your
            order is delivered safely and efficiently.
          </li>
          <li>
            Tracking Information: Once your order has shipped, you will receive
            a shipping confirmation email with tracking information to monitor
            the delivery status of your package.
          </li>
          <li>
            Expedited Shipping: Expedited shipping options are available for an
            additional fee if you need your order to arrive faster.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg text-black font-semibold">Return Policy</h2>
        <p className="text-base">
          At Vestido Nation, we want you to be completely satisfied with your
          purchase. If for any reason you are not satisfied with your order, you
          may return it within 7 business days of receipt for a full refund or
          exchange, subject to the following conditions:
        </p>

        <h3 className="text-base text-black font-semibold">
          Items Eligible for Return
        </h3>
        <p className="text-base">
          Only unworn, unwashed, and undamaged items with original tags attached
          are eligible for return. Items must be in their original packaging and
          in resalable condition to qualify for a refund or exchange.
        </p>

        <h3 className="text-base text-black font-semibold">
          Initiating a Return
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Online Portal: Provide a dedicated section within your app where
            customers can initiate a return.
          </li>
          <li>
            Customer Support: Offer the option to initiate returns via customer
            service channels by phone (+91 88487 79394) or email
            (support@vestidonation.com).
          </li>
        </ul>

        <h3 className="text-base text-black font-semibold">
          Verification and Approval
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Review: Have a team or automated system review return requests to
            ensure they meet your policy criteria.
          </li>
          <li>
            Approval: Once verified, approve the return request and notify the
            customer.
          </li>
          <li>
            Refund or Exchange: Upon receipt of your returned item(s), we will
            inspect them to ensure they meet our return criteria. If approved,
            we will process a refund to your original method of payment or
            exchange the item for a different size, color, or style, as
            requested.
          </li>
        </ul>

        <h3 className="text-base text-black font-semibold">Return Shipping</h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Label Generation: Provide a prepaid shipping label if feasible, or
            instruct customers on how to return items (e.g., local drop-off
            locations).
          </li>
          <li>
            Packaging: Advise customers on how to securely package items for
            return.
          </li>
          <li>
            Damaged or Defective Items: If you receive a damaged or defective
            item, please contact us immediately to arrange for a replacement or
            refund. We may request photo evidence of the damage or defect for
            quality control purposes.
          </li>
          <li>
            Return Shipping: Customers are responsible for return shipping costs
            unless the return is due to a mistake on our part or a defective
            product. We recommend using a trackable shipping method and insuring
            the package to ensure safe delivery.
          </li>
        </ul>

        <h3 className="text-base text-black font-semibold">
          Processing Returns
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Receipt: Receive returned items and confirm they meet return policy
            conditions.
          </li>
          <li>
            Refund/Exchange: Process refunds promptly or initiate exchanges as
            per the customer’s preference.
          </li>
        </ul>

        <h3 className="text-base text-black font-semibold">
          Customer Communication
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Updates: Keep customers informed via app notifications, emails, or
            SMS about the status of their return.
          </li>
          <li>
            Refund Confirmation: Notify customers once their refund has been
            processed.
          </li>
        </ul>

        <h3 className="text-base text-black font-semibold">
          Feedback Collection
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Gather feedback: Gather feedback from customers who return items to
            understand reasons for returns and identify potential areas for
            improvement.
          </li>
          <li>
            Analyze return data: Analyze return data to identify trends (e.g.,
            common reasons for returns) and implement strategies to reduce
            returns over time.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ShippingAndDeliveryPolicies;
