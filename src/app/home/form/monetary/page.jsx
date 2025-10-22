"use client"

import React, { useState, useRef } from "react";

export default function MoneyInput() {
  const [value, setValue] = useState("0,00");
  const inputRef = useRef(null);

  const formatValue = (numbers) => {
    const num = parseFloat(numbers || "0") / 100;
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
      return;
    }
    let onlyNums = value.replace(/\D/g, "");

    if (e.key === "Backspace") {
      onlyNums = onlyNums.slice(0, -1);
    } else {
      onlyNums += e.key;
    }

    setValue(formatValue(onlyNums));
    e.preventDefault();
  };

  const handleFocus = () => {
    const input = inputRef.current;
    input.setSelectionRange(input.value.length, input.value.length);
  };

  return (
    <div className="flex flex-col w-64">
      <label className="mb-1 text-sm text-gray-100">Valor (R$){parseFloat(value.replace('.', '').replace(',', '.'))}</label>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={value}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className="border rounded-lg p-2 text-right text-lg"
      />
    </div>
  );
}
