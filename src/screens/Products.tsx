"use client";

import ProductItem from "@/components/ProductItem";
import { ProductType } from "@/models/model";
import InfiniteScroll from "@/components/InfiniteScroll"; // Import the InfiniteScroll component
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/utils/const";
import Loading from "@/components/Loading";

export default function ProductsPage({
  products,
}: {
  products: ProductType[];
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductType[]>(products);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0); // Total count of products
  const [hasMore, setHasMore] = useState(true);

  // Filtering states
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 30,
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const loadMoreProducts = async () => {
    const typeFilter =
      selectedTypes.length > 0 ? `&type=${selectedTypes.join(",")}` : "";
    const res = await fetch(
      `${API_URL}/nail/products?page=${page + 1}&page_size=8&min_price=${
        priceRange.min
      }&max_price=${priceRange.max}${typeFilter}`
    );
    const data = await res.json();

    setAllProducts((prev) => [...prev, ...(data?.results || [])]);
    setPage((prev) => prev + 1);

    // Check if we've fetched all available products
    setHasMore(allProducts.length + data?.results?.length < totalProducts);
  };

  // Handle filter changes
  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    resetProducts(); // Reset products when filter changes
  };

  // Reset products based on filters
  const resetProducts = useCallback(async () => {
    setPage(1);
    const typeFilter =
      selectedTypes.length > 0 ? `&type=${selectedTypes.join(",")}` : "";
    const res = await fetch(
      `${API_URL}/nail/products?page=1&page_size=8&min_price=${priceRange.min}&max_price=${priceRange.max}${typeFilter}`
    );
    const data = await res.json();

    setAllProducts(data.results);
    setTotalProducts(data.count); // Set total count from API response
    setHasMore(data.results.length < data.count); // Determine if there's more data
  }, [priceRange, selectedTypes]);

  // Fetch initial filtered data when filters change
  useEffect(() => {
    resetProducts();
  }, [resetProducts]); // Now resetProducts is included in the dependencies

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-pink-600 font-bold mb-8 text-center">
        Nail Products
      </h1>

      {/* Filter Section */}

      <div className="mb-8">
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="bg-pink-500 text-white rounded px-4 py-2 outline-none hover:bg-pink-600"
        >
          Filter <i className="fa-solid fa-filter ml-1"></i>
        </button>
        {openFilter && (
          <div className="mt-4 bg-white p-3 rounded-lg shadow-md">
            <div className="mb-4 product__range">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={priceRange.min}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      Number(e.target.value),
                      priceRange.max
                    )
                  }
                  className="custom-input-range"
                  aria-label="Minimum price"
                />
                <span className="ml-2">${priceRange.min}</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={priceRange.max}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      priceRange.min,
                      Number(e.target.value)
                    )
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

      {/* Infinite Scroll Component */}
      <InfiniteScroll
        loadMore={loadMoreProducts}
        hasMore={hasMore}
        loading={<Loading />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {allProducts.map((product) => (
            <ProductItem key={product?.id} {...product} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
