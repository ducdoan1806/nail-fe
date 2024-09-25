"use client";

import ProductItem from "@/components/ProductItem";
import { ProductType } from "@/models/model";

import { useState } from "react";
export default function Products({ products }: { products: ProductType[] }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 30 });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceRange.min &&
      product.price <= priceRange.max &&
      (selectedTypes.length === 0 || selectedTypes.includes(product.type))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-pink-600 font-bold mb-8 text-center">
        Nail Products
      </h1>

      <div className="mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          aria-expanded={showFilters}
          aria-controls="filters"
        >
          <i className="fas fa-filter mr-2" aria-hidden="true"></i>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showFilters && (
          <div id="filters" className="bg-white p-4 rounded shadow-md mt-4">
            <h2 className="text-xl text-pink-600 font-semibold mb-4">
              Filters
            </h2>
            <div className="mb-4 product__range">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: Number(e.target.value),
                    }))
                  }
                  className="custom-input-range"
                  aria-label="Minimum price"
                />
                <span className="ml-2">${priceRange.min}</span>
              </div>
              <div className=" flex items-center">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value),
                    }))
                  }
                  className="custom-input-range"
                  aria-label="Maximum price"
                />
                <span className="ml-2">${priceRange.max}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Product Type</h3>
              {["polish", "kit", "accessories", "treatment"].map((type) => (
                <label key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="mr-2"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductItem key={product?.id} {...product} />
        ))}
      </div>
    </div>
  );
}
