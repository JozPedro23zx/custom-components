import { useState } from "react";
import Link from "next/link"; // importante no Next.js

const carrinhosMock = [
  {
    id: 1,
    dono: "João da Silva",
    data: "12/09/2025",
    total: 349.9,
    produtos: [
      { id: 1, nome: "Camiseta Azul", preco: 99.9, quantidade: 2 },
      { id: 2, nome: "Tênis Branco", preco: 150, quantidade: 1 },
    ],
  },
  {
    id: 2,
    dono: "Maria Oliveira",
    data: "10/09/2025",
    total: 199.5,
    produtos: [
      { id: 3, nome: "Vestido Floral", preco: 120, quantidade: 1 },
      { id: 4, nome: "Bolsa Pequena", preco: 79.5, quantidade: 1 },
    ],
  },
];

export default function ModalCarrinhos() {
  const [aberto, setAberto] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Meus Carrinhos</h2>
          <button className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {/* Lista de carrinhos */}
        <div className="divide-y">
          {carrinhosMock.map((carrinho) => (
            <div key={carrinho.id} className="p-4 space-y-2">
              {/* Cabeçalho do carrinho */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{carrinho.dono}</p>
                  <p className="text-sm text-gray-500">{carrinho.data}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    R$ {carrinho.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3">
                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() =>
                    setAberto(aberto === carrinho.id ? null : carrinho.id)
                  }
                >
                  {aberto === carrinho.id ? "▲ Fechar" : "▼ Ver produtos"}
                </button>

                {/* Botão que leva para outra página */}
                <Link
                  href={`/carrinho/${carrinho.id}`}
                  className="text-green-600 text-sm hover:underline"
                >
                  Ir para página →
                </Link>
              </div>

              {/* Lista de produtos (acordeão) */}
              {aberto === carrinho.id && (
                <div className="mt-3 space-y-2">
                  {carrinho.produtos.map((produto) => (
                    <div
                      key={produto.id}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{produto.nome}</p>
                        <p className="text-sm text-gray-500">
                          Qtd: {produto.quantidade}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-700">
                        R$ {(produto.preco * produto.quantidade).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
