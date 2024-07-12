import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div>
      <h1>Contact Us</h1>

      <p>
        Thank you for your interest in reaching out to us. We value your
        feedback, inquiries, and suggestions. Please feel free to contact us
        using the information below:
      </p>

      <section>
        <h2>Customer Support</h2>
        <p>
          For assistance with orders, product inquiries, returns, or any other
          customer-related concerns, our dedicated customer support team is here
          to help.
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@vestidonation.com">
              support@vestidonation.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:+918848779394">+91 88487 7939</a>
          </li>
          <li>
            <strong>Hours:</strong> Monday to Saturday, 9:00 AM to 6:00 PM (IST)
          </li>
        </ul>
      </section>

      <section>
        <h2>Business Inquiries</h2>
        <p>
          For partnership opportunities, wholesale inquiries, collaborations, or
          any other business-related matters, please contact our business
          development team.
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:ceo@vestidonation.com">ceo@vestidonation.com</a>
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:+919020042199">+91 90200 42199</a>
          </li>
          <li>
            <strong>Hours:</strong> Monday to Saturday, 9:00 AM to 6:00 PM (IST)
          </li>
        </ul>
      </section>

      <section>
        <h2>Visit Us</h2>
        <p>
          If you&apos;d like to visit our office or warehouse, here&apos;s our
          address:
        </p>
        <address>
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
        <h2>Feedback Form</h2>
        <p>
          You can also use the form below to send us a message directly. Simply
          fill out the required fields, and we&apos;ll get back to you as soon
          as possible.
        </p>
        <form action="YOUR_FORM_ENDPOINT" method="post">
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <br />
          <label>
            Message:
            <textarea name="message" required></textarea>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
