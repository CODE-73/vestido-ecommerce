import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-stone-500">
      <h1 className="text-2xl text-black font-semibold mb-6">Contact Us</h1>

      <p className="mb-6">
        Thank you for your interest in reaching out to us. We value your
        feedback, inquiries, and suggestions. Please feel free to contact us
        using the information below:
      </p>

      <section className="mb-8">
        <h2 className="text-lg text-black font-semibold mb-4">
          Customer Support
        </h2>
        <p className="mb-4">
          For assistance with orders, product inquiries, returns, or any other
          customer-related concerns, our dedicated customer support team is here
          to help.
        </p>
        <ul className="space-y-2">
          <li>
            Email:{' '}
            <a
              href="mailto:support@vestidonation.com"
              className="text-blue-600 hover:underline"
            >
              support@vestidonation.com
            </a>
          </li>
          <li>
            Phone:{' '}
            <a
              href="tel:+918848779394"
              className="text-blue-600 hover:underline"
            >
              +91 88487 79394
            </a>
          </li>
          <li>Hours: Monday to Saturday, 9:00 AM to 6:00 PM (IST)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg text-black font-semibold mb-4">
          Business Inquiries
        </h2>
        <p className="mb-4">
          For partnership opportunities, wholesale inquiries, collaborations, or
          any other business-related matters, please contact our business
          development team.
        </p>
        <ul className="space-y-2">
          <li>
            Email:{' '}
            <a
              href="mailto:ceo@vestidonation.com"
              className="text-blue-600 hover:underline"
            >
              ceo@vestidonation.com
            </a>
          </li>
          <li>
            Phone:{' '}
            <a
              href="tel:+919020042199"
              className="text-blue-600 hover:underline"
            >
              +91 90200 42199
            </a>
          </li>
          <li>Hours: Monday to Saturday, 9:00 AM to 6:00 PM (IST)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg text-black font-semibold mb-4">Visit Us</h2>
        <p className="mb-4">
          If you&apos;d like to visit our office or warehouse, here&apos;s our
          address:
        </p>
        <address className="not-italic">
          Bistida Ventures (OPC) Pvt Ltd / Vestido
          <br />
          63-2491 Bhima Complex, 4th Floor, Intercity Arcade
          <br />
          Jaffer Khan Colony Rd, Mavoor Road
          <br />
          Kozhikode, Kerala, India, 673004
        </address>
      </section>

      <section>
        <h2 className="text-lg text-black font-semibold mb-4">Feedback Form</h2>
        <p className="mb-4">
          You can also use the form below to send us a message directly. Simply
          fill out the required fields, and we&apos;ll get back to you as soon
          as possible.
        </p>
        <form action="YOUR_FORM_ENDPOINT" method="post" className="space-y-4">
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Message:</label>
            <textarea
              name="message"
              className="border rounded p-2 w-full"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
