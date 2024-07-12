import React from 'react';

const CancellationAndReturnPolicies: React.FC = () => {
  return (
    <div>
      <h1>Shipping and Return Policies</h1>

      <section>
        <h2>Shipping Policy</h2>
        <p>
          At Vestido Nation, we strive to provide fast and reliable shipping for
          all orders. Here is what you can expect from our shipping policy:
        </p>
        <ul>
          <li>
            <strong>Free Shipping:</strong> We offer free standard shipping on
            all orders within Kerala.
          </li>
          <li>
            <strong>Processing Time:</strong> Orders are typically processed and
            shipped within 7 business days.
          </li>
          <li>
            <strong>Shipping Methods:</strong> We partner with trusted carriers
            to ensure your order is delivered safely and efficiently.
          </li>
          <li>
            <strong>Tracking Information:</strong> Once your order has shipped,
            you will receive a shipping confirmation email with tracking
            information to monitor the delivery status of your package.
          </li>
          <li>
            <strong>Expedited Shipping:</strong> Expedited shipping options are
            available for an additional fee if you need your order to arrive
            faster.
          </li>
        </ul>
      </section>

      <section>
        <h2>Return Policy</h2>
        <p>
          At Vestido Nation, we want you to be completely satisfied with your
          purchase. If for any reason you are not satisfied with your order, you
          may return it within 7 business days of receipt for a full refund or
          exchange, subject to the following conditions:
        </p>
        <h3>Items Eligible for Return</h3>
        <p>
          Only unworn, unwashed, and undamaged items with original tags attached
          are eligible for return. Items must be in their original packaging and
          in resalable condition to qualify for a refund or exchange.
        </p>

        <h3>Initiating a Return</h3>
        <ul>
          <li>
            <strong>Online Portal:</strong> Provide a dedicated section within
            your app where customers can initiate a return.
          </li>
          <li>
            <strong>Customer Support:</strong> Offer the option to initiate
            returns via customer service channels phone (+918848779394), email
            (Support@vestidonation.com).
          </li>
        </ul>

        <h3>Verification and Approval</h3>
        <ul>
          <li>
            <strong>Review:</strong> Have a team or automated system review
            return requests to ensure they meet your policy criteria.
          </li>
          <li>
            <strong>Approval:</strong> Once verified, approve the return request
            and notify the customer.
          </li>
          <li>
            <strong>Refund or Exchange:</strong> Upon receipt of your returned
            item(s), we will inspect them to ensure they meet our return
            criteria. If approved, we will process a refund to your original
            method of payment or exchange the item for a different size, color,
            or style, as requested.
          </li>
        </ul>

        <h3>Return Shipping</h3>
        <ul>
          <li>
            <strong>Label Generation:</strong> Provide a prepaid shipping label
            if feasible, or instruct customers on how to return items (e.g.,
            local drop-off locations).
          </li>
          <li>
            <strong>Packaging:</strong> Advise customers on how to securely
            package items for return.
          </li>
          <li>
            <strong>Damaged or Defective Items:</strong> If you receive a
            damaged or defective item, please contact us immediately to arrange
            for a replacement or refund. We may request photo evidence of the
            damage or defect for quality control purposes.
          </li>
          <li>
            <strong>Return Shipping:</strong> Customers are responsible for
            return shipping costs unless the return is due to a mistake on our
            part or a defective product. We recommend using a trackable shipping
            method and insuring the package to ensure safe delivery.
          </li>
        </ul>

        <h3>Processing Returns</h3>
        <ul>
          <li>
            <strong>Receipt:</strong> Receive returned items and confirm they
            meet return policy conditions.
          </li>
          <li>
            <strong>Refund/Exchange:</strong> Process refunds promptly or
            initiate exchanges as per the customer’s preference.
          </li>
        </ul>

        <h3>Customer Communication</h3>
        <ul>
          <li>
            <strong>Updates:</strong> Keep customers informed via app
            notifications, emails, or SMS about the status of their return.
          </li>
          <li>
            <strong>Refund Confirmation:</strong> Notify customers once their
            refund has been processed.
          </li>
        </ul>

        <h3>Feedback Collection</h3>
        <ul>
          <li>
            <strong>Gather feedback:</strong> Gather feedback from customers who
            return items to understand reasons for returns and identify
            potential areas for improvement.
          </li>
          <li>
            <strong>Analyze return data:</strong> Analyze return data to
            identify trends (e.g., common reasons for returns) and implement
            strategies to reduce returns over time.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CancellationAndReturnPolicies;
