"use client";

import { useCart } from "@/contexts/CartContext";
import { CityType, DistrictType, WardType } from "@/models/model";
import { ChangeEvent, useState } from "react";

export default function Payment({ citys }: { citys: CityType[] }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "",
  });

  const { cartItems, updateQuantity, removeFromCart, total } = useCart();
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);

  const handleProvinceChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setCustomerInfo({ ...customerInfo, city: provinceId, district: "" });
    setWards([]);
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceId}?depth=2`
    );
    const districts = await res.json();
    setDistricts(districts?.districts);
  };

  const handleDistrictChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setCustomerInfo({ ...customerInfo, district: districtId });
    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${districtId}?depth=2`
    );
    const wards = await res.json();
    setWards(wards.wards);
  };

  const handleCustomerInfo = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
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
                <p className="text-pink-800">Your cart is empty.</p>
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
                            ${(item.price * item.quantity).toFixed(2)}
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
                        ${total.toFixed(2)}
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
              <form>
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
                      htmlFor="city"
                      className="block mb-1 font-medium text-pink-800"
                    >
                      <i className="fas fa-city mr-2 text-pink-600"></i>
                      City
                    </label>
                    <select
                      value={customerInfo.city}
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
                        value={customerInfo.district}
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
                          <option key={item.code} value={item.code}>
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
                        onChange={handleCustomerInfo}
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
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
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
                      <option value="">Select a payment method</option>
                      <option value="cash">Cash on Delivery</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
