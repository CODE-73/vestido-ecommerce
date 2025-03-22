const ContactUs = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Contact Us</h1>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">📞 Phone</h2>
        <p className="text-white">+91 88487 79394</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">🏢 Address</h2>
        <p className="text-white">
          63-2491, Bhima Complex, 4th Floor,
          <br />
          Intercity Arcade, Jaffer Khan Colony Rd,
          <br />
          Mavoor Road, Kozhikode, Kerala, India, 673004
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">⏰ Timings</h2>
        <p className="text-white">9:30 AM – 6:30 PM, Monday to Saturday</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">✉️ For Inquiries/Issues</h2>
        <p>
          <a
            href="mailto:support@vestidonation.com"
            className="text-blue-600 underline"
          >
            support@vestidonation.com
          </a>
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">💼 For Job Opportunities</h2>
        <p>
          <a
            href="mailto:hr@vestidonation.com"
            className="text-blue-600 underline"
          >
            hr@vestidonation.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
