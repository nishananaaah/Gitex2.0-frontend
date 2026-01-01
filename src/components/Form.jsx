import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast/Toast";
import workshopsData from "../data/workshops.json";

function Form() {
  const navigate = useNavigate();
  const {
    formData,
    currentStep,
    promoCode,
    promoApplied,
    appliedPromoDetails,
    termsAccepted,
    dataConsentAccepted,
    isSubmitted,
    setFormData,
    setCurrentStep,
    setPromoCode,
    applyPromo,
    removePromo,
    setTermsAccepted,
    setDataConsentAccepted,
    submitRegistration,
    clearAllData,
  } = useStore();

  const { showToast, toastMessage, toastType, showToastMessage } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleWorkshopChange = (workshopId) => {
    const selectedWorkshops = formData.selectedWorkshops || [];
    const newWorkshops = selectedWorkshops.includes(workshopId)
      ? selectedWorkshops.filter((id) => id !== workshopId)
      : [...selectedWorkshops, workshopId];
    setFormData({ selectedWorkshops: newWorkshops });
  };

  const validateStep1 = () => {
    if (!formData.firstName?.trim()) {
      showToastMessage("Please enter your first name");
      return false;
    }
    if (!formData.lastName?.trim()) {
      showToastMessage("Please enter your last name");
      return false;
    }
    if (!formData.country) {
      showToastMessage("Please select your country of residence");
      return false;
    }
    if (!formData.email?.trim()) {
      showToastMessage("Please enter your email address");
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showToastMessage("Please enter a valid email address");
      return false;
    }
    if (!formData.mobile?.trim()) {
      showToastMessage("Please enter your mobile number");
      return false;
    }
    if (!formData.companyName?.trim()) {
      showToastMessage("Please enter your company name");
      return false;
    }
    if (!formData.jobTitle?.trim()) {
      showToastMessage("Please enter your job title");
      return false;
    }
    if (!formData.companyType) {
      showToastMessage("Please select your company type");
      return false;
    }
    if (!formData.industry) {
      showToastMessage("Please select your industry");
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!promoApplied) {
      showToastMessage("Please apply a promo code to proceed");
      return false;
    }
    if (!termsAccepted) {
      showToastMessage("Please accept the terms and conditions");
      return false;
    }
    if (!dataConsentAccepted) {
      showToastMessage("Please accept the data consent policy");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
      case 3:
        isValid = true;
        break;
      case 4:
        isValid = validateStep4();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        showToastMessage("Step completed successfully!", "success");
      } else {
        submitRegistration();
        showToastMessage("Registration submitted successfully!", "success");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "GITEX15") {
      applyPromo({
        code: "GITEX15",
        discount: "15%",
        amount: "(EUR 0.05 incl. VAT)",
        appliedTo: "2 lowest-priced tickets",
      });
      showToastMessage("Promo code applied successfully!", "success");
    } else {
      showToastMessage("Invalid promo code. Please try again.");
    }
  };

  const handleRemovePromo = () => {
    removePromo();
    showToastMessage("Promo code removed", "success");
  };

  const handleReturnHome = () => {
    clearAllData();
    navigate("/products");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-lime-100 to-lime-50">
        <div className="h-20 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-32 w-16 h-16 bg-lime-400 opacity-60"></div>
            <div className="absolute top-4 right-48 w-12 h-12 bg-green-400 opacity-50"></div>
            <div className="absolute top-2 right-16 w-10 h-10 bg-green-300 opacity-70"></div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
              <div className="w-full h-2 bg-green-600 rounded-t-lg -mt-12 mb-8"></div>

              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                THANK YOU!
              </h1>
              <p className="text-xl text-gray-700 font-semibold mb-3">
                Your Registration Has Been Submitted Successfully
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                A Confirmation Email With Your Event Details Will Be Sent To You
                Shortly. Please Check Your Inbox (And Spam Folder).
              </p>

              <button
                onClick={handleReturnHome}
                className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition shadow-lg"
              >
                Return To Homepage
              </button>
            </div>
          </div>
        </div>

        <div className="h-24 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute bottom-2 left-32 w-16 h-16 bg-lime-400 opacity-60"></div>
            <div className="absolute bottom-8 left-48 w-12 h-12 bg-green-400 opacity-50"></div>
            <div className="absolute bottom-4 left-16 w-10 h-10 bg-green-300 opacity-70"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-100 to-lime-50">
      <Toast show={showToast} message={toastMessage} type={toastType} />

      <div className="h-20 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-32 w-16 h-16 bg-lime-400 opacity-60"></div>
          <div className="absolute top-4 right-48 w-12 h-12 bg-green-400 opacity-50"></div>
          <div className="absolute top-2 right-16 w-10 h-10 bg-green-300 opacity-70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-end">
          <button className="bg-lime-400 text-gray-900 font-bold px-8 py-2 rounded hover:bg-lime-500 transition">
            LOGIN
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {currentStep > step ? "✓" : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 ${
                    currentStep > step ? "bg-green-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 flex justify-between items-center">
                <h2 className="text-white text-xl font-bold">
                  Registration Information {currentStep}
                </h2>
                <div className="text-lime-200 text-sm">
                  PREMIUM TICKET - FREE|Incl. 19% VAT
                </div>
              </div>

              <div className="p-6 space-y-4">
                {currentStep < 4 ? (
                  <>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Country and Region */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country of residence{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="country"
                          value={formData.country || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Please Select</option>
                          <option value="nigeria">Nigeria</option>
                          <option value="ghana">Ghana</option>
                          <option value="kenya">Kenya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Region
                        </label>
                        <select
                          name="region"
                          value={formData.region || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Please Select</option>
                          <option value="lagos">Lagos</option>
                          <option value="abuja">Abuja</option>
                        </select>
                      </div>
                    </div>

                    {/* Email Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Email address
                        </label>
                        <input
                          type="email"
                          name="confirmEmail"
                          value={formData.confirmEmail || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Nationality and Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nationality
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Please Select</option>
                          <option value="nigerian">Nigerian</option>
                          <option value="ghanaian">Ghanaian</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2">
                          <select className="w-24 px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500">
                            <option value="+234">🇳🇬 +234</option>
                            <option value="+233">🇬🇭 +233</option>
                          </select>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile || ""}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company and Job */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Company Type and Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="companyType"
                          value={formData.companyType || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Please Select</option>
                          <option value="startup">Startup</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="industry"
                          value={formData.industry || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Please Select</option>
                          <option value="tech">Technology</option>
                          <option value="finance">Finance</option>
                        </select>
                      </div>
                    </div>

                    {/* Workshops Section */}
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          What products & services are you interested in?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <button className="bg-red-700 text-white px-4 py-1 rounded text-xs font-bold hover:bg-red-800">
                          SELECT SOLUTIONS/PRODUCTS
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        Select Workshop (Maximum 6 can Select)
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {workshopsData.map((workshop) => (
                          <label
                            key={workshop.id}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={(
                                formData.selectedWorkshops || []
                              ).includes(workshop.id)}
                              onChange={() => handleWorkshopChange(workshop.id)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">
                              {workshop.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Step 4: Registration Summary */
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="font-semibold text-gray-700">
                          PREMIUM TICKET x 2
                        </span>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 line-through">
                            FREE 0.14
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                              -15%
                            </span>
                            <span className="font-semibold text-gray-900">
                              FREE 0.14 Incl. 19% VAT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Promo Code Section */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                      <label className="block text-green-700 font-semibold mb-2">
                        Have a promo code?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter Promo code (GITEX15)"
                          disabled={promoApplied}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={promoApplied || !promoCode}
                          className="bg-red-700 text-white font-bold px-6 py-2 rounded hover:bg-red-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          APPLY
                        </button>
                      </div>

                      {promoApplied && appliedPromoDetails && (
                        <div className="space-y-3">
                          <div className="bg-green-100 border border-green-300 rounded p-3">
                            <p className="text-green-700 font-semibold text-sm">
                              Promo code '{appliedPromoDetails.code}' applied
                              successfully! Applied to{" "}
                              {appliedPromoDetails.appliedTo}!
                            </p>
                          </div>

                          <div className="bg-white border border-gray-200 rounded p-3 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Promo code applied:
                              </span>
                              <span className="text-sm font-semibold text-green-600">
                                {appliedPromoDetails.code}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Discount:
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {appliedPromoDetails.discount}{" "}
                                {appliedPromoDetails.amount}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Applied to:
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-green-600">
                                  {appliedPromoDetails.appliedTo}
                                </span>
                                <button
                                  onClick={handleRemovePromo}
                                  className="text-red-600 border border-red-600 text-xs font-bold px-3 py-1 rounded hover:bg-red-50 transition"
                                >
                                  REMOVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-gray-600">
                        Student Ticket Access On Day 3 Only
                      </span>
                      <span className="text-sm text-gray-600">
                        EUR 50 40 SUBJECT TO APPROVAL Incl. 19%
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t-2 border-gray-300">
                      <span className="text-lg font-semibold text-gray-700">
                        Total:
                      </span>
                      <div className="text-right">
                        <div className="text-gray-500 line-through text-sm">
                          EUR 300
                        </div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            EUR 150
                          </span>
                          <span className="text-sm text-gray-500">
                            Incl. 19% VAT
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4 pt-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="w-5 h-5 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          I have read and accept the{" "}
                          <a
                            href="#"
                            className="text-green-600 underline hover:text-green-700"
                          >
                            terms and conditions
                          </a>
                          ,{" "}
                          <a
                            href="#"
                            className="text-green-600 underline hover:text-green-700"
                          >
                            Privacy Policy
                          </a>
                          , and consent that attendees under the age of 21 will
                          not be admitted, and admission to the exhibition is
                          restricted to trade and business professionals only,
                          and students above 16 and below 18 can attend only if
                          accompanied by school or faculty member{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dataConsentAccepted}
                          onChange={(e) =>
                            setDataConsentAccepted(e.target.checked)
                          }
                          className="w-5 h-5 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          I hereby consent the use of my data by the organiser,
                          exhibitors and sponsors of DWTC & KAOUN International
                          to delivering services and for marketing purposes. I
                          am aware that I can object to the sending of
                          newsletters at any time{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="bg-gray-600 text-white font-bold px-10 py-3 rounded hover:bg-gray-700 transition shadow-lg"
                >
                  {currentStep === 4 ? "BACK" : "PREVIOUS"}
                </button>
              )}
              <button
                onClick={handleNext}
                className="bg-green-600 text-white font-bold px-12 py-3 rounded hover:bg-green-700 transition shadow-lg"
              >
                {currentStep === 4 ? "SUBMIT" : "NEXT"}
              </button>
            </div>
          </div>

          {/* Right Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="bg-green-600 text-white px-4 py-2 rounded font-bold">
                  GITEX
                </div>
                <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  AI
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                <span className="text-xs">Nigeria</span>
                <span className="text-xs">Esxon - Lagos</span>
              </div>

              <div className="bg-green-100 text-center py-2 rounded mb-6">
                <span className="text-sm font-semibold">
                  Registration Information {currentStep}
                </span>
              </div>

              <div className="space-y-4 text-center text-gray-400 text-sm">
                <div>
                  {formData.firstName && formData.lastName
                    ? `${formData.firstName} ${formData.lastName}`
                    : "FULL NAME"}
                </div>
                <div>{formData.jobTitle || "JOB TITLE"}</div>
                <div>{formData.companyName || "COMPANY NAME"}</div>
                <div>{formData.country || "COUNTRY OF RESIDENCE"}</div>
                <div className="pt-6 border-t">
                  <div className="mb-2 font-semibold text-gray-600">
                    BADGE CATEGORY
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    VISITOR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Green Pattern */}
      <div className="h-24 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 relative overflow-hidden mt-8">
        <div className="absolute inset-0">
          <div className="absolute bottom-2 left-32 w-16 h-16 bg-lime-400 opacity-60"></div>
          <div className="absolute bottom-8 left-48 w-12 h-12 bg-green-400 opacity-50"></div>
          <div className="absolute bottom-4 left-16 w-10 h-10 bg-green-300 opacity-70"></div>
        </div>
      </div>
    </div>
  );
}
export default Form;
