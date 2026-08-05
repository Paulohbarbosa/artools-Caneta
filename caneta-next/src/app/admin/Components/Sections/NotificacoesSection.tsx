import React from "react";
import { Icon } from "@iconify/react";

export default function NotificacoesSection({ notifications, setNotifications, triggerToast }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200">
        <span className="text-xs text-stone-500">{notifications.filter((n: any) => n.unread).length} notificações não lidas</span>
        <button
          onClick={() => {
            setNotifications((prev: any) => prev.map((n: any) => ({ ...n, unread: false })));
            triggerToast("Notificações", "Todas as notificações foram marcadas como lidas.", "info");
          }}
          className="text-xs text-stone-900 hover:underline font-semibold"
        >
          Marcar todas como lidas
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden divide-y divide-white/5">
        {notifications.map((notif: any) => (
          <div key={notif.id} className={`p-5 flex items-center justify-between transition ${notif.unread ? "bg-stone-50" : "opacity-60"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notif.type === "order" ? "bg-emerald-500/10 text-emerald-600" :
                notif.type === "stock" ? "bg-rose-500/10 text-rose-600" :
                notif.type === "payment" ? "bg-blue-500/10 text-blue-400" : "bg-stone-200 text-stone-600"
              }`}>
                <Icon icon={
                  notif.type === "order" ? "solar:cart-large-linear" :
                  notif.type === "stock" ? "solar:box-linear" :
                  notif.type === "payment" ? "solar:card-2-linear" : "solar:settings-linear"
                } />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">{notif.text}</p>
                <span className="text-[10px] text-stone-500 font-mono">{notif.time}</span>
              </div>
            </div>
            
            {notif.unread && (
              <button
                onClick={() => {
                  setNotifications((prev: any) => prev.map((n: any) => n.id === notif.id ? { ...n, unread: false } : n));
                }}
                className="px-2 py-1 bg-white border border-stone-300 shadow-sm rounded text-[10px] text-stone-500 hover:text-stone-900"
              >
                Marcar como lida
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
