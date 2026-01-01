import { useState } from "react";

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const showToastMessage = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return {
    showToast,
    toastMessage,
    toastType,
    showToastMessage,
  };
};
