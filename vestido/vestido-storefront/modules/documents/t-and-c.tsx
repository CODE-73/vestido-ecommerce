import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-1 md:px-4 py-8 text-xs md:text-base">
      <h1 className="hidden md:block text-2xl  text-white font-semibold mb-6">
        Terms and Conditions
      </h1>

      <p className=" text-xs md:text-base mb-4">
        Welcome to Vestido Nation. These Terms and Conditions govern your use of
        our website and services, so please read them carefully. By accessing or
        using our website, you agree to abide by these terms and conditions:
      </p>

      <ul className="space-y-4 list-disc pl-5">
        <li>
          Website Use: You may use our website for personal, non-commercial
          purposes only. You agree not to use our website for any unlawful or
          prohibited activities.
        </li>
        <li>
          Intellectual Property:All content on our website, including text,
          graphics, logos, images, and software, is the property of Vestido
          Nation and is protected by copyright and other intellectual property
          laws. You may not reproduce, distribute, or modify any content without
          our prior written consent.
        </li>
        <li>
          Product Descriptions: We make every effort to ensure that the
          information on our website is accurate and up to date. However, we do
          not guarantee the accuracy, completeness, or reliability of product
          descriptions, prices, or availability.
        </li>
        <li>
          Purchases:When you make a purchase on our website, you agree to
          provide accurate and complete information, including billing and
          shipping details. You also agree to pay the full amount for any
          purchases made using your account.
        </li>
        <li>
          Shipping and Delivery:We strive to ship orders in a timely manner and
          provide accurate delivery estimates. However, we cannot guarantee
          delivery dates or times, and we are not responsible for any delays or
          issues caused by shipping carriers.
        </li>
        <li>
          Returns and Exchanges: Please refer to our Shipping and Return Policy
          for information on returns, exchanges, and refunds.
        </li>
        <li>
          Limitation of Liability: To the fullest extent permitted by law,
          Vestido Nation shall not be liable for any indirect, incidental,
          special, or consequential damages arising out of or in connection with
          your use of our website or services.
        </li>
        <li>
          Indemnification: You agree to indemnify and hold harmless Vestido
          Nation and its affiliates, officers, directors, employees, and agents
          from any claims, losses, damages, liabilities, or expenses arising out
          of your use of our website or services.
        </li>
        <li>
          Governing Law: These Terms and Conditions shall be governed by and
          construed in accordance with the laws of Your Jurisdiction. Any
          disputes arising under these terms and conditions shall be subject to
          the exclusive jurisdiction of the courts in Your Jurisdiction.
        </li>
        <li>
          Changes to Terms: We reserve the right to update or modify these Terms
          and Conditions at any time without prior notice. By continuing to use
          our website after any changes, you agree to be bound by the updated
          terms and conditions.
        </li>
      </ul>

      <p className="text-xs md:text-base mt-4">
        If you have any questions or concerns about these Terms and Conditions,
        please contact us at&nbsp;
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

export default TermsAndConditions;
