import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast/Toast";
import productsData from "../data/products.json";

function Products() {
  const navigate = useNavigate();
  const {
    selectedProducts,
    productService,
    addProduct,
    setProductService,
    clearProducts,
  } = useStore();

  const { showToast, toastMessage, toastType, showToastMessage } = useToast();

  const handleCheckboxChange = (productId) => {
    addProduct(productId);
  };

  const handleApply = () => {
    if (selectedProducts.length === 0) {
      showToastMessage(
        "Please select at least one workshop to continue",
        "error"
      );
      return;
    }

    if (selectedProducts.length > 5) {
      showToastMessage("You can select a maximum of 5 workshops", "error");
      return;
    }

    showToastMessage(
      `${selectedProducts.length} workshop(s) selected successfully!`,
      "success"
    );
    setTimeout(() => navigate("/tickets"), 1000);
  };

  const handleCancel = () => {
    if (selectedProducts.length > 0 || productService) {
      clearProducts();
      showToastMessage("Selection cleared", "success");
    }
  };

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(productService.toLowerCase())
  );

  const leftProducts = filteredProducts.filter((p) => p.column === "left");
  const rightProducts = filteredProducts.filter((p) => p.column === "right");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toast show={showToast} message={toastMessage} type={toastType} />

      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-t-2xl p-6 relative shadow-lg">
          <h1 className="text-white text-3xl font-bold tracking-wide">
            SELECT WORKSHOPS
          </h1>
          <button
            onClick={handleCancel}
            className="absolute top-6 right-6 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <div className="mb-8">
            <input
              type="text"
              value={productService}
              onChange={(e) => setProductService(e.target.value)}
              placeholder="Try Product/Service"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-500 transition"
            />
          </div>

          <div className="mb-6">
            <p className="text-gray-700 font-medium">
              I Am Interested In Sourcing The Following Solutions/Products?
              (Select Top 5) * Please Ensure You Have Chosen At Least One
              Category In Each Section
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Selected: {selectedProducts.length} / 5
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <div className="space-y-4">
              {leftProducts.map((product) => (
                <label
                  key={product.id}
                  className="flex items-center space-x-4 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                      className="w-6 h-6 border-2 border-gray-400 rounded cursor-pointer appearance-none checked:bg-green-600 checked:border-green-600 transition"
                    />
                    {selectedProducts.includes(product.id) && (
                      <svg
                        className="w-4 h-4 text-white absolute top-1 left-1 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-lg group-hover:text-green-600 transition">
                    {product.name}
                  </span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              {rightProducts.map((product) => (
                <label
                  key={product.id}
                  className="flex items-center space-x-4 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                      className="w-6 h-6 border-2 border-gray-400 rounded cursor-pointer appearance-none checked:bg-green-600 checked:border-green-600 transition"
                    />
                    {selectedProducts.includes(product.id) && (
                      <svg
                        className="w-4 h-4 text-white absolute top-1 left-1 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-lg group-hover:text-green-600 transition">
                    {product.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">
                No workshops found matching "{productService}"
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              CANCEL
            </button>
            <button
              onClick={handleApply}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md"
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
