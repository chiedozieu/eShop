import React, { useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/style";
import Footer from "../components/layout/Footer";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };
  // window.scrollTo(0,0)
  return (
    <div className={`${styles.section} my-8 mt-20`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 ">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/* Single FAQ 1 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(1)}
          >
            <span className="text-lg font-medium to-gray-900">
              What is Shop4All?
            </span>
            {activeTab === 1 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 1  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Shop4All is a online marketplace where individuals and businesses can buy and sell new and used goods, connecting buyers with multiple vendors across Nigeria.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 2 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(2)}
          >
            <span className="text-lg font-medium to-gray-900">
                How do I pay for my order?
            </span>
            {activeTab === 2 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 2  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Payment is made directly to the vendor after delivery. You only pay when you receive your item. Make sure to verify product before payment
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 3 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(3)}
          >
            <span className="text-lg font-medium to-gray-900">
            Can I trust the vendors on Shop4All?
            </span>
            {activeTab === 3 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 3  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    We advise customers to exercise caution and carefully review vendor ratings, product descriptions, and reviews before making a payment.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 4 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(4)}
          >
            <span className="text-lg font-medium to-gray-900">
            Can I return or exchange an item?
            </span>
            {activeTab === 4 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 4  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Make sure to agree with vendor before purchase
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 5 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(5)}
          >
            <span className="text-lg font-medium to-gray-900">
            How do I contact the vendor?
            </span>
            {activeTab === 5 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 5  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Find the vendor's contact info on the product page or in your order details.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 6 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(6)}
          >
            <span className="text-lg font-medium to-gray-900">
                Is my personal info safe?
            </span>
            {activeTab === 6 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 6  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                        Yes, we protect your data with robust security measures.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 7 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium to-gray-900">
            How do I become a vendor on Shop4All?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 7  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Register on our site, provide required documents, and we'll verify your account
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 8 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(8)}
          >
            <span className="text-lg font-medium to-gray-900">
            Can I offer discounts or promotions?
            </span>
            {activeTab === 8 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 8  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Yes, set your own prices and offer promotions through your vendor dashboard.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 9 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(9)}
          >
            <span className="text-lg font-medium to-gray-900">
            How do I handle customer complaints?
            </span>
            {activeTab === 9 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 9  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Respond promptly to customer inquiries, and resolve issues fairly and professionally.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 10 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(10)}
          >
            <span className="text-lg font-medium to-gray-900">
            What if I need help with my vendor account?
            </span>
            {activeTab === 10 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 10  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Contact our support team for assistance.
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 11 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(11)}
          >
            <span className="text-lg font-medium to-gray-900">
            Do you offer any guarantees or warranties?
            </span>
            {activeTab === 11 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 11  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Vendors may offer warranties; please check product details or contact them directly.

                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 12 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(12)}
          >
            <span className="text-lg font-medium to-gray-900">
            Can I purchase products on Shop4All as a guest?
            </span>
            {activeTab === 12 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 12  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    No, only registered user are allowed to buy and sell
                    </p>
                </div> )
            }
        </div>
        {/* Single FAQ 13 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(13)}
          >
            <span className="text-lg font-medium to-gray-900">
            What products can I sell on Shop4All?
            </span>
            {activeTab === 13 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                /> 
              </svg>
            )}

          </button>
            {
                activeTab === 13  && ( <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Legal goods and services.
                    </p>
                </div> )
            }
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
