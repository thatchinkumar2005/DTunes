import React from "react";

export default function Spinner({ className }) {
  return (
    <div
      className={`border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600 ${className}`}
    />
  );
}
