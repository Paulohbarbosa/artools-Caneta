import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function FuncionariosSection({ employees, setEmployees, triggerToast }: any) {
  const [employeeFormOpen, setEmployeeFormOpen] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<any>({ name: "", cpf: "", email: "", phone: "", role: "Atendente", department: "", status: "Ativo" });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200">
        <span className="text-xs text-stone-500 font-mono">{employees.length} funcionários cadastrados</span>
        <button
          onClick={() => {
            setEmployeeForm({ name: "", cpf: "", email: "", phone: "", role: "Atendente", department: "", status: "Ativo" });
            setEmployeeFormOpen(true);
          }}
          className="flex items-center gap-2 bg-white text-black hover:bg-stone-200 transition px-4 py-2 rounded-lg text-xs font-semibold"
        >
          <Icon icon="solar:add-circle-linear" />
          <span>Novo Funcionário</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
              <th className="p-4">Nome</th>
              <th className="p-4">Cargo / Nível</th>
              <th className="p-4">Departamento</th>
              <th className="p-4">Acesso</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {employees.map((emp: any) => (
              <tr key={emp.id} className="hover:bg-stone-50 transition">
                <td className="p-4 font-medium text-stone-900">{emp.name}</td>
                <td className="p-4 text-stone-900 font-mono text-xs">{emp.role}</td>
                <td className="p-4 text-stone-500">{emp.department}</td>
                <td className="p-4 text-stone-500 font-mono text-xs">{emp.lastAccess}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                    emp.status === "Ativo" ? "bg-emerald-500/10 text-emerald-600" : "bg-stone-850 text-stone-500"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Ativo" ? "bg-emerald-400" : "bg-stone-500"}`} />
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      const nextStatus = emp.status === "Ativo" ? "Inativo" : "Ativo";
                      setEmployees((prev: any) => prev.map((e: any) => e.id === emp.id ? { ...e, status: nextStatus } : e));
                      triggerToast("Funcionário Modificado", `${emp.name} está agora ${nextStatus === "Ativo" ? "Ativo" : "Inativo"}.`, "info");
                    }}
                    className="px-2.5 py-1 bg-white border border-stone-300 shadow-sm rounded text-xs text-stone-500 hover:text-stone-900"
                  >
                    Tweak Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: ADD EMPLOYEE */}
      {employeeFormOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-base font-semibold font-display">Cadastrar Novo Funcionário</h3>
              <button className="text-stone-500 hover:text-stone-900" onClick={() => setEmployeeFormOpen(false)}>
                <Icon icon="solar:close-circle-linear" className="text-xl" />
              </button>
            </div>

            <form onSubmit={e => {
              e.preventDefault();
              const newEmp = {
                id: (employees.length + 1).toString(),
                name: employeeForm.name || "Novo Colaborador",
                cpf: employeeForm.cpf || "000.000.000-00",
                email: employeeForm.email || "",
                phone: employeeForm.phone || "",
                role: employeeForm.role || "Atendente",
                department: employeeForm.department || "Operações",
                status: employeeForm.status || "Ativo",
                lastAccess: "Sem acessos"
              };
              setEmployees((prev: any) => [...prev, newEmp]);
              setEmployeeFormOpen(false);
              triggerToast("Funcionário Cadastrado", `${newEmp.name} cadastrado com sucesso.`, "success");
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={employeeForm.name}
                  onChange={e => setEmployeeForm((prev: any) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">CPF</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={employeeForm.cpf}
                    onChange={e => setEmployeeForm((prev: any) => ({ ...prev, cpf: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-mono text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Cargo / Nível</label>
                  <select
                    value={employeeForm.role}
                    onChange={e => setEmployeeForm((prev: any) => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Atendente">Atendente</option>
                    <option value="Estoquista">Estoquista</option>
                    <option value="Financeiro">Financeiro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@artools.pro"
                  value={employeeForm.email}
                  onChange={e => setEmployeeForm((prev: any) => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Departamento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Comercial, Logística"
                  value={employeeForm.department}
                  onChange={e => setEmployeeForm((prev: any) => ({ ...prev, department: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400 transition"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex gap-2 justify-end">
                <button type="button" onClick={() => setEmployeeFormOpen(false)} className="px-4 py-2 rounded-xl bg-white border border-stone-300 shadow-sm text-xs hover:bg-stone-100 transition">
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
