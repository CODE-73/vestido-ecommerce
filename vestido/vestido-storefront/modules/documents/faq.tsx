const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        Vestido Nation Frequently Asked Questions (FAQs)
      </h1>

      <section>
        <h2 className="text-xl font-semibold">ACCOUNT FAQS</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>How do I create an account on Vestido Nation?</strong>
            <br />
            You can create an account by clicking on the Sign Up button on our
            website and entering your email, name, and password.
          </li>
          <li>
            <strong>Do I need an account to place an order?</strong>
            <br />
            No, you can checkout as a guest. However, having an account allows
            you to track orders, save details, and receive exclusive offers.
          </li>
          <li>
            <strong>How do I reset my password?</strong>
            <br />
            Click on the Forgot Password? link on the login page and follow the
            instructions to reset it.
          </li>
          <li>
            <strong>Can I update my personal information?</strong>
            <br />
            Yes, log into your account and update your details under the Profile
            section.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">ORDER FAQS</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>How do I place an order?</strong>
            <br />
            Browse products, add items to the cart, and proceed to checkout.
            Follow the payment instructions to complete your order.
          </li>
          <li>
            <strong>Can I modify or cancel my order?</strong>
            <br />
            You can modify or cancel within 24 hours of placing it. After that,
            modifications may not be possible.
          </li>
          <li>
            <strong>How can I check my order status?</strong>
            <br />
            Log into your account and go to My Orders or use the tracking link
            provided via SMS.
          </li>
          <li>
            <strong>Why was my order canceled automatically?</strong>
            <br />
            Orders may be canceled due to payment failure, incorrect details, or
            stock unavailability. Contact support@vestidonation.com for
            assistance.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">SHIPPING POLICY</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Where do you ship?</strong>
            <br />
            Currently, we ship only within India.
          </li>
          <li>
            <strong>What are the shipping charges?</strong>
            <br />
            Free shipping for all prepaid orders. Free shipping for all orders
            within Kerala. COD orders outside Kerala have a shipping charge of
            ₹49.
          </li>
          <li>
            <strong>How long does delivery take?</strong>
            <br />
            Standard Shipping: 5-8 business days. Express Shipping: Coming soon.
          </li>
          <li>
            <strong>How do I track my order?</strong>
            <br />
            You will receive a tracking link via email or visit our tracking
            page on the website.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">EXCHANGE & RETURNS POLICY</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Can I return or exchange a product?</strong>
            <br />
            Yes, we accept returns and exchanges. Exchanged products will take
            10-15 days for delivery.
          </li>
          <li>
            <strong>How do I request a return or exchange?</strong>
            <br />
            Return and exchange details are already available on our website.
            Please visit the Returns & Exchanges section for more information.
          </li>
          <li>
            <strong>Is there a return shipping fee?</strong>
            <br />
            Yes, a ₹199 shipping charge will be deducted from refunds.
          </li>
          <li>
            <strong>What if I receive a defective or incorrect item?</strong>
            <br />
            Contact us within 48 hours of delivery with images, and we’ll
            arrange a replacement.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">PRIVACY POLICY</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>What personal information do you collect?</strong>
            <br />
            We collect your name, email, phone number, shipping address, and
            payment details to process orders.
          </li>
          <li>
            <strong>Is my personal information secure?</strong>
            <br />
            Yes, we use secure encryption and do not share data with third
            parties.
          </li>
          <li>
            <strong>Can I request the deletion of my personal data?</strong>
            <br />
            Yes, email support@vestidonation.com to request data removal.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">TERMS OF USE</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Can I use Vestido Nation images or content?</strong>
            <br />
            No, all images and content are copyrighted and cannot be used
            without permission.
          </li>
          <li>
            <strong>What happens if I violate the terms?</strong>
            <br />
            We reserve the right to restrict or terminate access to our website
            if terms are violated.
          </li>
          <li>
            <strong>How often do you update the terms?</strong>
            <br />
            We may update our Terms of Use periodically. Please review this
            section regularly.
          </li>
        </ul>
      </section>

      <p className="text-sm text-gray-600">
        For further assistance, contact us at{' '}
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

export default FAQ;
