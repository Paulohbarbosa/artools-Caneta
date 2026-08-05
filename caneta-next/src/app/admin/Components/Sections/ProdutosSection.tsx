import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function ProdutosSection({ products, setProducts, triggerToast }: any) {
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState<any>({ sku: "", name: "", category: "Canetas", price: 0, stock: 0, status: "Ativo", brand: "Artools" });
  const [productFilter, setProductFilter] = useState({ category: "Todos", status: "Todos", search: "" });

  return (
    <div className="space-y-6">
      {/* Actions and filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Category */}
          <select
            value={productFilter.category}
            onChange={e => setProductFilter(prev => ({ ...prev, category: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-600 outline-none"
          >
            <option value="Todos">Todas Categorias</option>
            <option value="Canetas">Canetas</option>
            <option value="Acessórios">Acessórios</option>
          </select>

          {/* Filter Status */}
          <select
            value={productFilter.status}
            onChange={e => setProductFilter(prev => ({ ...prev, status: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-600 outline-none"
          >
            <option value="Todos">Status (Todos)</option>
            <option value="Ativo">Ativos</option>
            <option value="Inativo">Inativos</option>
          </select>

          <input
            type="text"
            placeholder="Pesquisar SKU ou Nome..."
            value={productFilter.search}
            onChange={e => setProductFilter(prev => ({ ...prev, search: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder:text-stone-500 outline-none"
          />
        </div>

        <button
          onClick={() => {
            setProductForm({ sku: "", name: "", category: "Canetas", price: 0, stock: 0, status: "Ativo", brand: "Artools" });
            setProductFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-white text-black hover:bg-stone-200 transition px-4 py-2.5 rounded-lg text-xs font-semibold"
        >
          <Icon icon="solar:add-circle-linear" />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
                <th className="p-4">SKU</th>
                <th className="p-4">Nome</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Estoque</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {products
                .filter((p: any) => {
                  if (productFilter.category !== "Todos" && p.category !== productFilter.category) return false;
                  if (productFilter.status !== "Todos" && p.status !== productFilter.status) return false;
                  if (productFilter.search && !p.name.toLowerCase().includes(productFilter.search.toLowerCase()) && !p.sku.toLowerCase().includes(productFilter.search.toLowerCase())) return false;
                  return true;
                })
                .map((p: any) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition">
                    <td className="p-4 font-mono text-xs font-semibold text-stone-500">{p.sku}</td>
                    <td className="p-4 font-medium text-stone-900">{p.name}</td>
                    <td className="p-4 text-stone-500">{p.category}</td>
                    <td className="p-4 font-mono text-stone-900">R$ {p.price.toFixed(2)}</td>
                    <td className="p-4 font-mono">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        p.stock === 0 ? "bg-rose-950/40 text-rose-600 border border-rose-500/20" :
                        p.stock <= 10 ? "bg-amber-950/40 text-amber-600 border border-amber-500/20" :
                        "text-stone-500"
                      }`}>
                        {p.stock} un
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "Ativo" ? "bg-emerald-500/10 text-emerald-600" : "bg-stone-200 text-stone-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Ativo" ? "bg-emerald-400" : "bg-stone-500"}`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(p);
                            setProductForm(p);
                            setProductFormOpen(true);
                          }}
                          className="p-1.5 rounded bg-white border border-stone-300 shadow-sm text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                        >
                          <Icon icon="solar:pen-linear" />
                        </button>
                        <button
                          onClick={() => {
                            setProducts((prev: any) => prev.filter((prod: any) => prod.id !== p.id));
                            triggerToast("Produto Removido", `O produto ${p.name} foi removido.`, "success");
                          }}
                          className="p-1.5 rounded bg-white border border-stone-300 shadow-sm text-rose-500 hover:bg-rose-950/30 transition"
                        >
                          <Icon icon="solar:trash-bin-trash-linear" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {productFormOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-base font-semibold font-display">{selectedProduct ? "Editar Produto" : "Novo Produto"}</h3>
              <button className="text-stone-500 hover:text-stone-900" onClick={() => { setProductFormOpen(false); setSelectedProduct(null); }}>
                <Icon icon="solar:close-circle-linear" className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={e => {
              e.preventDefault();
              if (selectedProduct) {
                setProducts((prev: any) => prev.map((p: any) => p.id === selectedProduct.id ? { ...p, ...productForm } : p));
                triggerToast("Produto Atualizado", `O produto ${productForm.name} foi atualizado com sucesso.`, "success");
              } else {
                const newProd = {
                  id: (products.length + 1).toString(),
                  sku: productForm.sku || `ART-NEW-${Math.floor(Math.random() * 1000)}`,
                  name: productForm.name || "Novo Produto",
                  category: productForm.category || "Canetas",
                  price: Number(productForm.price) || 0,
                  stock: Number(productForm.stock) || 0,
                  status: productForm.status || "Ativo",
                  brand: productForm.brand || "Artools"
                };
                setProducts((prev: any) => [...prev, newProd]);
                triggerToast("Produto Cadastrado", `O produto ${newProd.name} foi criado com sucesso.`, "success");
              }
              setProductFormOpen(false);
              setSelectedProduct(null);
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Nome do Produto</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, sku: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-mono text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Categoria</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                  >
                    <option value="Canetas">Canetas</option>
                    <option value="Acessórios">Acessórios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-mono text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Estoque inicial</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, stock: Number(e.target.value) }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-mono text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Status</label>
                  <select
                    value={productForm.status}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Marca</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={e => setProductForm((prev: any) => ({ ...prev, brand: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex gap-2 justify-end">
                <button type="button" onClick={() => { setProductFormOpen(false); setSelectedProduct(null); }} className="px-4 py-2 rounded-xl bg-white border border-stone-300 shadow-sm text-xs hover:bg-stone-100 transition">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
