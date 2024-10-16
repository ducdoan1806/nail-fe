"use client";

import Loading from "@/components/Loading";
import { useCart } from "@/contexts/CartContext";
import { CityType, DistrictType, WardType } from "@/models/model";
import { API_URL, formattedMoney } from "@/utils/const";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Payment({ citys }: { citys: CityType[] }) {
  const { emptyCart } = useCart();
  const router = useRouter();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "cash",
    note: "",
  });

  const { cartItems, updateQuantity, removeFromCart, total } = useCart();
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);
  const [location, setLocation] = useState({
    city: "",
    district: "",
    ward: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const handleProvinceChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setLocation({ ...location, city: provinceId });
    setCustomerInfo({
      ...customerInfo,
      city: e.target.options[e.target.selectedIndex].text,
      district: "",
    });
    setWards([]);
    const res = await fetch(`${API_URL}/nail/address/?city=${provinceId}`);
    const data = await res.json();
    setDistricts(data?.data);
  };

  const handleDistrictChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setLocation({ ...location, district: districtId });
    setCustomerInfo({
      ...customerInfo,
      district: e.target.options[e.target.selectedIndex].text,
    });
    const res = await fetch(`${API_URL}/nail/address/?district=${districtId}`);
    const data = await res.json();
    setWards(data?.data);
  };
  const handleWardChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocation({ ...location, ward: e.target.value });
    setCustomerInfo({
      ...customerInfo,
      ward: e.target.options[e.target.selectedIndex].text,
    });
  };
  const handleCustomerInfo = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/nail/order/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: customerInfo?.name.trim(),
          phone: customerInfo?.phone.trim(),
          address:
            customerInfo?.ward && customerInfo?.district && customerInfo?.city
              ? `${customerInfo?.address.trim()}, ${customerInfo?.ward.trim()}, ${customerInfo?.district.trim()}, ${customerInfo?.city.trim()}`
              : "",
          payment_method: customerInfo?.paymentMethod.trim(),
          note: customerInfo?.note.trim(),
          city_code: location?.city,
          district_code: location?.district,
          ward_code: location?.ward,
          carts: cartItems.map((item) => ({
            product_detail: item?.product_detail,
            quantity: item?.quantity,
            price: item?.price,
          })),
        }),
      });
      const data = await response.json();
      if (!data?.status) {
        setError(
          typeof data?.message !== "string"
            ? JSON.stringify(data?.message)
            : data?.message
        );
      } else {
        emptyCart();
        router.push(`/order-success/order-p${data?.data?.order_code}.html`);
        setError("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-pink-800">
          Payment
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
              <h2 className="text-2xl font-semibold mb-4 text-pink-700">
                Your Cart
              </h2>
              {cartItems.length === 0 ? (
                <p className="text-pink-800">
                  Your cart is empty.{" "}
                  <Link
                    href="/products"
                    className="underline font-semibold hover:text-pink-600"
                  >
                    Buy now
                  </Link>
                </p>
              ) : (
                <>
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center border-b border-pink-100 pb-2"
                      >
                        <span className="text-pink-800">{item.name}</span>
                        <div className="flex items-center">
                          <div className="flex items-center mr-4">
                            <button
                              className="text-pink-500 hover:text-pink-700"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-12 text-center mx-2 border border-pink-300 rounded-md outline-none focus:ring-1 focus:ring-pink-500"
                            />
                            <button
                              className="text-pink-500 hover:text-pink-700"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <span className="mr-4 text-pink-700">
                            {formattedMoney(item.price * item.quantity)}
                          </span>
                          <button
                            className="text-pink-500 hover:text-pink-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-pink-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-pink-800">
                        Total:
                      </span>
                      <span className="text-lg font-semibold text-pink-800">
                        {formattedMoney(total)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
              <h2 className="text-2xl font-semibold mb-4 text-pink-700">
                Customer Information
              </h2>
              <form onSubmit={handleSubmitOrder}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-user mr-2 text-pink-600"></i>
                      Full Name
                    </label>
                    <input
                      onChange={handleCustomerInfo}
                      value={customerInfo.name}
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-phone mr-2 text-pink-600"></i>
                      Phone
                    </label>
                    <input
                      onChange={handleCustomerInfo}
                      value={customerInfo.phone}
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-city mr-2 text-pink-600"></i>
                      City
                    </label>
                    <select
                      value={location.city}
                      onChange={handleProvinceChange}
                      id="city"
                      name="city"
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="" disabled>
                        Select your city
                      </option>
                      {citys.map((city) => (
                        <option key={city.code} value={city.code}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="district"
                        className="block mb-1 font-medium text-pink-800"
                      >
                        <i className="fas fa-flag-usa mr-2 text-pink-600"></i>
                        District
                      </label>
                      <select
                        value={location.district}
                        onChange={handleDistrictChange}
                        id="district"
                        name="district"
                        className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="" disabled>
                          Select your district
                        </option>
                        {districts.map((item) => (
                          <option key={item?.code} value={item?.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="ward"
                        className="block mb-1 font-medium text-pink-800"
                      >
                        <i className="fas fa-mail-bulk mr-2 text-pink-600"></i>
                        Wards
                      </label>
                      <select
                        onChange={handleWardChange}
                        value={customerInfo.ward}
                        id="ward"
                        name="ward"
                        className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="" disabled>
                          Select your ward
                        </option>
                        {wards.map((item) => (
                          <option key={item?.code} value={item?.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-map-marker-alt mr-2 text-pink-600"></i>
                      Address
                    </label>
                    <input
                      onChange={handleCustomerInfo}
                      value={customerInfo.address}
                      type="text"
                      id="address"
                      name="address"
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="paymentMethod"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-credit-card mr-2 text-pink-600"></i>
                      Payment Method
                    </label>
                    <select
                      onChange={handleCustomerInfo}
                      value={customerInfo.paymentMethod}
                      id="paymentMethod"
                      name="paymentMethod"
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="cash">Cash on Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="note"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-clipboard mr-2 text-pink-600"></i>
                      Note
                    </label>
                    <textarea
                      onChange={handleCustomerInfo}
                      value={customerInfo.note}
                      id="note"
                      name="note"
                      rows={4}
                      className="resize-none w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    ></textarea>
                  </div>
                </div>
                {error && (
                  <p className="text-center text-red-500 text-base mt-1">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <Loading
                        size="h-8 w-8"
                        color="fill-white"
                        bg="text-pink-600"
                      />
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
