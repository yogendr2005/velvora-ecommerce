import {
  FaBox,
  FaTruck,
  FaUndo,
  FaQuestionCircle,
  FaEnvelope,
} from "react-icons/fa";

import { useState } from "react";

const Support = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(
      openQuestion === index ? null : index
    );
  };

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from your profile after placing an order.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You can request a return for eligible products according to our return policy.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping time depends on your location and the product you ordered.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team using the contact option below.",
    },
  ];

  return (
    <div className="support-page">

      {/* Header */}

      <div className="support-header">

        <h1>
          Need Help?
        </h1>

        <p>
          We're here to help you with your Velvora
          shopping experience.
        </p>

      </div>


      {/* Support Options */}

      <div className="support-options">

        <div className="support-card">

          <FaBox />

          <h3>
            Orders & Tracking
          </h3>

          <p>
            Check your order status and tracking
            information.
          </p>

        </div>


        <div className="support-card">

          <FaTruck />

          <h3>
            Shipping
          </h3>

          <p>
            Learn more about shipping and delivery
            information.
          </p>

        </div>


        <div className="support-card">

          <FaUndo />

          <h3>
            Returns & Refunds
          </h3>

          <p>
            Get help with returns, refunds and
            exchanges.
          </p>

        </div>

      </div>


      {/* FAQ */}

      <div className="faq-section">

        <div className="faq-header">

          <FaQuestionCircle />

          <h2>
            Frequently Asked Questions
          </h2>

        </div>


        <div className="faq-list">

          {faqs.map((faq, index) => (

            <div
              className="faq-item"
              key={index}
            >

              <button
                className="faq-question"
                onClick={() =>
                  toggleQuestion(index)
                }
              >

                <span>
                  {faq.question}
                </span>

                <span>
                  {openQuestion === index
                    ? "−"
                    : "+"}
                </span>

              </button>


              {openQuestion === index && (

                <div className="faq-answer">

                  <p>
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>


      {/* Contact */}

      <div className="support-contact">

        <FaEnvelope />

        <h2>
          Still need help?
        </h2>

        <p>
          Our support team is here to help you.
        </p>

        <button>
          Contact Support
        </button>

      </div>

    </div>
  );
};

export default Support;