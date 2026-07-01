import { useState } from "react";

export default function useNotification() {
  const [notification, setNotification] =
    useState({
      show: false,
      type: "success",
      message: "",
    });

  const success = (message) => {
    setNotification({
      show: true,
      type: "success",
      message,
    });
  };

  const error = (message) => {
    setNotification({
      show: true,
      type: "error",
      message,
    });
  };

  const close = () => {
    setNotification((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return {
    notification,
    success,
    error,
    close,
  };
}