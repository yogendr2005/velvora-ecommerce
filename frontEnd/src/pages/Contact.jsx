import { useState } from "react";
import { FaUser, FaEnvelope, FaTag, FaComment } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    toast.success(
      "Your message has been sent successfully!"
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* Header */}

      <div className="contact-header">

        <h1>
          Contact Us
        </h1>

        <p>
          Have a question? We'd love to hear from you.
        </p>

      </div>


      {/* Contact Content */}

      <div className="contact-container">

        {/* Information */}

        <div className="contact-info">

          <h2>
            Get in Touch
          </h2>

          <p>
            Whether you have a question about your
            order, products, shipping, or anything else,
            our team is ready to help.
          </p>

          <div className="contact-info-item">

            <FaEnvelope />

            <div>
              <span>Email</span>
              <strong>
                support@velvora.com
              </strong>
            </div>

          </div>

          <div className="contact-info-item">

            <FaComment />

            <div>
              <span>Support</span>
              <strong>
                We're here to help
              </strong>
            </div>

          </div>

        </div>


        {/* Form */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="contact-field">

            <label>
              Full Name
            </label>

            <div className="contact-input">

              <FaUser />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>

          </div>


          <div className="contact-field">

            <label>
              Email
            </label>

            <div className="contact-input">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>

          </div>


          <div className="contact-field">

            <label>
              Subject
            </label>

            <div className="contact-input">

              <FaTag />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What can we help you with?"
                required
              />

            </div>

          </div>


          <div className="contact-field">

            <label>
              Message
            </label>

            <div className="contact-input contact-textarea">

              <FaComment />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
              />

            </div>

          </div>


          <button
            type="submit"
            className="contact-submit"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
};

export default Contact;