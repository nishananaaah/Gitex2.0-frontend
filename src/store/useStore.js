import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // Authentication
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Products Selection
      selectedProducts: [],
      productService: "",
      setSelectedProducts: (products) => set({ selectedProducts: products }),
      setProductService: (service) => set({ productService: service }),
      addProduct: (productId) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.includes(productId)
            ? state.selectedProducts.filter((id) => id !== productId)
            : [...state.selectedProducts, productId],
        })),
      clearProducts: () => set({ selectedProducts: [], productService: "" }),

      // Tickets
      selectedTickets: [],
      ticketQuantities: {
        ticket1: 1,
        ticket2: 1,
        ticket3: 1,
        ticket4: 1,
        ticket5: 1,
        ticket6: 1,
      },
      setTicketQuantity: (ticketId, quantity) =>
        set((state) => ({
          ticketQuantities: {
            ...state.ticketQuantities,
            [ticketId]: Math.max(1, quantity),
          },
        })),
      addTicket: (ticket, quantity) =>
        set((state) => {
          const existingTicket = state.selectedTickets.find(
            (t) => t.id === ticket.id
          );
          if (existingTicket) {
            return {
              selectedTickets: state.selectedTickets.map((t) =>
                t.id === ticket.id
                  ? { ...t, quantity: t.quantity + quantity }
                  : t
              ),
            };
          }
          return {
            selectedTickets: [
              ...state.selectedTickets,
              { ...ticket, quantity },
            ],
          };
        }),
      clearTickets: () =>
        set({
          selectedTickets: [],
          ticketQuantities: {
            ticket1: 1,
            ticket2: 1,
            ticket3: 1,
            ticket4: 1,
            ticket5: 1,
            ticket6: 1,
          },
        }),

      // Registration Form
      formData: {
        firstName: "",
        lastName: "",
        country: "",
        region: "",
        email: "",
        confirmEmail: "",
        nationality: "",
        mobile: "",
        companyName: "",
        jobTitle: "",
        companyType: "",
        industry: "",
        selectedWorkshops: [],
      },
      currentStep: 1,
      promoCode: "",
      promoApplied: false,
      appliedPromoDetails: null,
      termsAccepted: false,
      dataConsentAccepted: false,
      isSubmitted: false,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setPromoCode: (code) => set({ promoCode: code }),
      applyPromo: (details) =>
        set({ promoApplied: true, appliedPromoDetails: details }),
      removePromo: () =>
        set({ promoCode: "", promoApplied: false, appliedPromoDetails: null }),
      setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),
      setDataConsentAccepted: (accepted) =>
        set({ dataConsentAccepted: accepted }),
      setIsSubmitted: (submitted) => set({ isSubmitted: submitted }),
      resetForm: () =>
        set({
          formData: {
            firstName: "",
            lastName: "",
            country: "",
            region: "",
            email: "",
            confirmEmail: "",
            nationality: "",
            mobile: "",
            companyName: "",
            jobTitle: "",
            companyType: "",
            industry: "",
            selectedWorkshops: [],
          },
          currentStep: 1,
          promoCode: "",
          promoApplied: false,
          appliedPromoDetails: null,
          termsAccepted: false,
          dataConsentAccepted: false,
          isSubmitted: false,
        }),

      // Complete Registration Submission
      submitRegistration: () => {
        const state = get();
        const registrationData = {
          user: state.user,
          products: state.selectedProducts,
          tickets: state.selectedTickets,
          formData: state.formData,
          promoCode: state.promoCode,
          timestamp: new Date().toISOString(),
        };

        // Save to localStorage as JSON
        const existingData = JSON.parse(
          localStorage.getItem("registrations") || "[]"
        );
        existingData.push(registrationData);
        localStorage.setItem("registrations", JSON.stringify(existingData));

        set({ isSubmitted: true });
        return registrationData;
      },

      // Clear all data
      clearAllData: () =>
        set({
          selectedProducts: [],
          productService: "",
          selectedTickets: [],
          ticketQuantities: {
            ticket1: 1,
            ticket2: 1,
            ticket3: 1,
            ticket4: 1,
            ticket5: 1,
            ticket6: 1,
          },
          formData: {
            firstName: "",
            lastName: "",
            country: "",
            region: "",
            email: "",
            confirmEmail: "",
            nationality: "",
            mobile: "",
            companyName: "",
            jobTitle: "",
            companyType: "",
            industry: "",
            selectedWorkshops: [],
          },
          currentStep: 1,
          promoCode: "",
          promoApplied: false,
          appliedPromoDetails: null,
          termsAccepted: false,
          dataConsentAccepted: false,
          isSubmitted: false,
        }),
    }),
    {
      name: "gitex-registration-storage",
    }
  )
);
