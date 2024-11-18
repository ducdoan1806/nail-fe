import { ContactType } from "@/models/model";
import { API_URL, socials } from "@/utils/const";
import logger from "@/utils/logger";
import React from "react";

const page = async () => {
  logger.info(`${API_URL}/nail/contacts/`);
  const res = await fetch(`${API_URL}/nail/contacts/?page_size=999&page=1`);
  const data = await res.json();
  const contacts: ContactType[] = [];
  const networks: ContactType[] = [];
  data.results.forEach((item: ContactType) => {
    if (item?.social === "Phone" || item?.social === "Location") {
      contacts.push(item);
    } else {
      networks.push(item);
    }
  });

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Get in Touch
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {contacts.map((item) => (
                <div className="flex items-start" key={item?.id}>
                  <i
                    className={
                      socials.find((social) => social.name === item?.social)
                        ?.icon + " text-pink-600 text-2xl mr-4 mt-1"
                    }
                  ></i>
                  <div>
                    <h3 className="font-semibold text-gray-700">Address</h3>
                    <a
                      target={item?.url === "#" ? "_self" : "_blank"}
                      href={item?.url}
                      className="text-gray-600 cursor-pointer truncate"
                    >
                      {item?.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Business Hours
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Every day: 9:00 AM - 8:00 PM</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Connect With Us
            </h2>
            <div className="space-y-6 mb-8">
              {networks.map((item) => (
                <a
                  key={item?.id}
                  href={item?.url}
                  target={item?.url === "#" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={
                    "flex items-center transition duration-300 text-pink-600 hover:text-pink-800 w-fit"
                  }
                >
                  <i
                    className={
                      socials.find((social) => social.name === item?.social)
                        ?.icon + " text-4xl mr-4"
                    }
                  ></i>
                  <div>
                    <h3 className="font-semibold">{item?.social}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {item?.url}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Services
              </h3>
              <p className="text-gray-600">
                At Gao Nails, we offer a wide range of nail care services
                including manicures, pedicures, nail art, and more. Visit us for
                a relaxing and pampering experience!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
