"use client"

import React, { useState } from "react";

export default function MoneyInput() {
  const [value, setValue] = useState("0,00");

  const formatValue = (numbers) => {
    let onlyNums = numbers.replace(/\D/g, "");
    const num = parseFloat(onlyNums || "0") / 100;
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (e) => {
    setValue(formatValue(e.target.value))
  };

  return (
    <div className="flex flex-col w-64">
      <label className="mb-1 text-sm">Valor {value} (R$)</label>
      <input
        type="text"
        inputMode="numeric"
        placeholder="0,00"
        value={value || ''}
        onChange={(e) => handleChange(e)}
        className="border rounded-lg p-2 text-right text-lg"
      />
    </div>
  );
}