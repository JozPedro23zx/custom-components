// app/components/Modal.tsx
"use client";


export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  // Se clicar dentro da modal → não fecha
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
    onClick={handleOverlayClick}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
      onClick={handleContentClick}
      className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
