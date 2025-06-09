import React, { useState } from "react";

export default function DeletePopup({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}) {
  return (
    // Background overlay, fade in/out
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Stop click propagation so clicking inside popup doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-t-lg sm:rounded-lg shadow-xl p-6 max-w-md w-full
          transform transition-transform duration-500 ease-out
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
        style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
