import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-stone-500">
      <h1 className="text-2xl font-semibold mb-6">Privacy Policy</h1>
      <p className="mb-6 ">
        At Vestidonation, we are committed to protecting your privacy and
        ensuring the security of your personal information. This Privacy Policy
        outlines how we collect, use, and safeguard your data when you visit our
        website or interact with our services:
      </p>

      <h2 className="text-sm md:text-lg font-semibold mb-4">
        Information We Collect
      </h2>
      <p className=" mb-6">
        We may collect personal information such as your name, email address,
        shipping address, and payment details when you make a purchase or
        register an account on our website. Additionally, we may collect
        non-personal information such as your IP address, browser type, and
        device information for analytics purposes.
      </p>

      <h2 className="text-sm md:text-lg font-semibold mb-4">
        How We Use Your Information
      </h2>
      <p className="mb-6">
        We use the information we collect to process your orders, communicate
        with you about your purchases, personalize your shopping experience, and
        improve our products and services. We may also use your information to
        send you marketing communications and promotional offers, but you can
        opt-out at any time.
      </p>

      <h2 className="text-sm md:text-lg font-semibold mb-4">Data Security</h2>
      <p className="mb-6">
        We implement industry-standard security measures to protect your
        personal information from unauthorized access, alteration, disclosure,
        or destruction. We use SSL encryption to secure data transmitted over
        the internet and restrict access to your information to authorized
        personnel only.
      </p>

      <h2 className="text-sm md:text-lg font-semibold mb-4">
        Third-Party Disclosure
      </h2>
      <p className="mb-6">
        We may share your personal information with third-party service
        providers such as shipping companies and payment processors to fulfill
        your orders. However, we do not sell, trade, or rent your personal
        information to third parties for marketing purposes.
      </p>

      <h2 className="text-sm md:text-lg font-semibold mb-4">Your Rights</h2>
      <p className="mb-6">
        You have the right to access, correct, or delete the personal
        information we hold about you. You may also withdraw your consent for us
        to use your information for marketing purposes at any time. For more
        information or to exercise your rights, please contact us at
        <a
          href="mailto:support@vestidonation.com"
          className="text-blue-600 hover:underline"
        >
          support@vestidonation.com
        </a>
        .
      </p>

      <h2 className="text-sm md:text-lg font-semibold mb-4">
        Updates to this Policy
      </h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. We will notify you of any
        material changes to this policy by posting the updated version on our
        website.
      </p>

      <p className=" text-sm md:text-lg mb-6">
        By using our website or services, you consent to the terms of this
        Privacy Policy. If you have any questions or concerns about our privacy
        practices, please contact us at
        <a
          href="mailto:support@vestidonation.com"
          className="text-blue-600 hover:underline"
        >
          support@vestidonation.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
