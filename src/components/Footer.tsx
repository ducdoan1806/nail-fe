import logo from "@/app/logo-white.svg";
import { ContactType } from "@/models/model";
import { API_URL, menu, socials } from "@/utils/const";
import logger from "@/utils/logger";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export default async function Footer() {
  try {
    logger.info(`Footer: ${API_URL}/nail/contacts/`);
    const res = await fetch(`${API_URL}/nail/contacts/?page_size=4&page=1`);
    const data = await res.json();

    return (
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                <Image src={logo} alt="" className="w-20 h-auto" />
              </h3>
              <p className="text-gray-400">
                Your one-stop shop for all your nail care needs.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {menu.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <ul className="space-y-2">
                {data?.results.map((item: ContactType) => (
                  <li key={item?.id}>
                    <a
                    target="_blank"
                      href={item?.url}
                      className="text-gray-400 hover:text-white"
                    >
                      <i
                        className={
                          "mr-2 " +
                          socials.find(
                            (social) => social?.name === item?.social
                          )?.icon
                        }
                      ></i>
                      {item?.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              &copy; 2024 Gạo Nails. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    logger.error("Footer: " + JSON.stringify(error));
    return notFound();
  }
}
