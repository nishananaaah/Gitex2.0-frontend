import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast/Toast";
import ticketsData from "../data/tickets.json";

function Tickets() {
  const navigate = useNavigate();
  const { ticketQuantities, selectedTickets, setTicketQuantity, addTicket } =
    useStore();

  const { showToast, toastMessage, toastType, showToastMessage } = useToast();

  const handleQuantityChange = (ticketId, change) => {
    const newQuantity = ticketQuantities[ticketId] + change;
    setTicketQuantity(ticketId, newQuantity);
  };

  const handleBuyNow = (ticketId) => {
    const ticket = ticketsData.find((t) => t.id === ticketId);
    const quantity = ticketQuantities[ticketId];

    addTicket(ticket, quantity);
    showToastMessage(
      `${ticket.title} added to cart successfully! Quantity: ${quantity}`,
      "success"
    );
  };

  const calculateTotal = () => {
    return selectedTickets.reduce((total, ticket) => {
      if (ticket.price === "FREE") return total;
      return total + parseFloat(ticket.price) * ticket.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (selectedTickets.length === 0) {
      showToastMessage("Please select at least one ticket to proceed", "error");
    } else {
      showToastMessage("Proceeding to registration...", "success");
      setTimeout(() => navigate("/form"), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toast show={showToast} message={toastMessage} type={toastType} />

      <div className="h-24 bg-gradient-to-br from-[#0B5D1E] via-[#1E7F2A] to-[#0F8A3C] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-2 right-48 w-12 h-12 bg-lime-400 opacity-60"></div>
          <div className="absolute top-8 right-32 w-16 h-16 bg-green-400 opacity-50"></div>
          <div className="absolute top-4 right-64 w-10 h-10 bg-green-300 opacity-70"></div>
          <div className="absolute top-12 right-72 w-8 h-8 bg-lime-500 opacity-60"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ticketsData.map((ticket) => (
            <div key={ticket.id} className="relative">
              {ticket.badge && (
                <div
                  className={`absolute -top-1 -left-1 ${ticket.badgeColor} text-white px-2 py-1 text-xs font-bold transform -rotate-12 z-10 rounded`}
                >
                  {ticket.badge}
                </div>
              )}

              <div
                className={`bg-gradient-to-br ${ticket.color} rounded-xl shadow-lg overflow-hidden h-full`}
              >
                <div className="p-4 pb-2">
                  <h3 className="text-white text-sm font-bold mb-1">
                    {ticket.title}
                  </h3>
                  <a
                    href="#"
                    className="text-green-400 text-xs font-semibold hover:text-green-300"
                  >
                    VIEW DETAILS →
                  </a>
                </div>

                <div className="px-4 pb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white rounded px-2 py-1">
                      <span className="text-green-600 font-bold text-sm">
                        GITEX
                      </span>
                    </div>
                    <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xs">
                        AI
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  </div>
                </div>

                <div className="px-4 pb-2">
                  <p className="text-gray-300 text-xs leading-tight">
                    Visitor Passes provide{" "}
                    <span className="text-green-400 font-semibold">
                      3 DAYS ACCESS
                    </span>{" "}
                    to GITEX NIGERIA exhibition and all free conference
                  </p>
                </div>

                <div className="px-4 pb-3 space-y-1">
                  {ticket.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-1">
                      <svg
                        className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300 text-xs leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-2 flex items-center justify-between">
                  <div>
                    <div className="text-white text-xl font-bold">
                      {ticket.price === "FREE" ? "FREE" : `USD ${ticket.price}`}
                    </div>
                    <div className="text-gray-400 text-xs">Incl. 19% VAT</div>
                  </div>

                  {ticket.price !== "FREE" && (
                    <div className="flex items-center space-x-1 bg-gray-700 rounded">
                      <button
                        onClick={() => handleQuantityChange(ticket.id, -1)}
                        className="px-2 py-1 text-white text-sm hover:bg-gray-600 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-white text-sm font-semibold">
                        {ticketQuantities[ticket.id]}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(ticket.id, 1)}
                        className="px-2 py-1 text-white text-sm hover:bg-gray-600 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleBuyNow(ticket.id)}
                    className="w-full bg-white text-gray-900 font-bold text-sm py-2 rounded hover:bg-gray-100 transition"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0B5D1E] via-[#1E7F2A] to-[#0F8A3C] py-8 mt-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-4 left-48 w-12 h-12 bg-lime-400 opacity-60"></div>
          <div className="absolute bottom-8 left-32 w-16 h-16 bg-green-400 opacity-50"></div>
          <div className="absolute bottom-2 left-64 w-10 h-10 bg-green-300 opacity-70"></div>
          <div className="absolute bottom-12 left-16 w-8 h-8 bg-lime-500 opacity-60"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center relative z-10">
          <div className="text-white text-xl font-bold">
            Total:{" "}
            <span className="text-2xl">EUR {calculateTotal().toFixed(2)}</span>{" "}
            <span className="text-sm font-normal">Incl. 19% VAT</span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-white text-green-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition shadow-lg text-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
