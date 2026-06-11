import { useNotification } from "../contexts/NotificationContext";

const ICON = { success: "✓", error: "✕", info: "ℹ", warning: "⚠" };
const COLOR = { success: "#22C55E", error: "#EF4444", info: "#6366F1", warning: "#F59E0B" };

export default function ToastContainer() {
  const { toasts } = useNotification();
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          style={{ borderLeftColor: COLOR[toast.type] }}
        >
          <span className="toast-icon" style={{ color: COLOR[toast.type] }}>
            {ICON[toast.type]}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
