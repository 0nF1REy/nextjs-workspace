"use client";

import { useState } from "react";

export function ButtonComponent() {
  const [nome, setNome] = useState("Usuário");

  function handleChangeName() {
    setNome("Alan Ryan");
  }

  return (
    <div>
      <button
        className="bg-[#4a90e2] hover:bg-[#2c6fb2] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2"
        onClick={handleChangeName}
      >
        Alterar nome
      </button>
      <br />
      <h3 className="text-xl font-bold text-[#2d3e50] mb-4">Nome: {nome}</h3>
    </div>
  );
}
