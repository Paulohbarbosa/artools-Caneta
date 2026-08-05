import React from "react";

export default function EstoqueSection({ products, setProducts, triggerToast }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
        <h3 className="text-sm font-semibold">Painel de Reposição & Alertas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-rose-950/20 border border-rose-500/15 p-4 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-mono text-rose-600">Crítico: Sem Estoque</span>
            <div className="text-2xl font-bold font-mono text-rose-600">
              {products.filter((p: any) => p.stock === 0).length}
            </div>
            <p className="text-xs text-rose-700/80">Produtos fora de catálogo temporariamente.</p>
          </div>

          <div className="bg-amber-950/20 border border-amber-500/15 p-4 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-mono text-amber-600">Atenção: Estoque Baixo</span>
            <div className="text-2xl font-bold font-mono text-amber-600">
              {products.filter((p: any) => p.stock > 0 && p.stock <= 10).length}
            </div>
            <p className="text-xs text-amber-700/80">Necessita emissão de ordem de compra.</p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/15 p-4 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-mono text-emerald-600">Estoque Saudável</span>
            <div className="text-2xl font-bold font-mono text-emerald-600">
              {products.filter((p: any) => p.stock > 10).length}
            </div>
            <p className="text-xs text-emerald-700/80">Nenhum risco de ruptura imediata.</p>
          </div>
        </div>
      </div>

      {/* Stock adjustments list */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
              <th className="p-4">Produto</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Estoque Atual</th>
              <th className="p-4">Ajuste Rápido</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {products.map((p: any) => (
              <tr key={p.id} className="hover:bg-stone-50 transition">
                <td className="p-4 font-medium text-stone-900">{p.name}</td>
                <td className="p-4 font-mono text-xs text-stone-500">{p.sku}</td>
                <td className="p-4 font-mono text-stone-900 font-semibold">{p.stock} un</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (p.stock > 0) {
                          setProducts((prev: any) => prev.map((prod: any) => prod.id === p.id ? { ...prod, stock: prod.stock - 1 } : prod));
                          triggerToast("Estoque Atualizado", `${p.name} (-1 un)`, "warning");
                        }
                      }}
                      className="px-2.5 py-1 rounded bg-white border border-stone-300 shadow-sm text-stone-500 hover:text-stone-900 transition"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => {
                        setProducts((prev: any) => prev.map((prod: any) => prod.id === p.id ? { ...prod, stock: prod.stock + 1 } : prod));
                        triggerToast("Estoque Atualizado", `${p.name} (+1 un)`, "success");
                      }}
                      className="px-2.5 py-1 rounded bg-white border border-stone-300 shadow-sm text-stone-500 hover:text-stone-900 transition"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => {
                        setProducts((prev: any) => prev.map((prod: any) => prod.id === p.id ? { ...prod, stock: prod.stock + 10 } : prod));
                        triggerToast("Estoque Reposto", `Lote de reposição (+10 un) adicionado a ${p.name}.`, "success");
                      }}
                      className="px-2 py-1 rounded bg-white text-black font-semibold text-xs hover:bg-stone-200 transition"
                    >
                      Repor +10
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
