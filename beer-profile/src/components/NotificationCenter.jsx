import { useNotification } from "../contexts/NotificationContext";

const TYPE_COLOR = {
  recommendation: "#F59E0B",
  level:          "#6366F1",
  community:      "#22C55E",
  weekly:         "#3B82F6",
};

export default function NotificationCenter() {
  const { notifications, unreadCount, centerOpen, closeCenter, markAllRead } = useNotification();

  if (!centerOpen) return null;

  return (
    <>
      <div className="notif-overlay" onClick={closeCenter} />
      <div className="notif-sheet" role="dialog" aria-label="알림 센터">
        <div className="notif-handle" />
        <div className="notif-header">
          <span className="notif-title">알림</span>
          {unreadCount > 0 && (
            <button className="notif-read-all" onClick={markAllRead}>
              모두 읽음
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="notif-empty">
            <span className="notif-empty-icon">🔔</span>
            <p className="notif-empty-text">새 알림이 없습니다</p>
          </div>
        ) : (
          <ul className="notif-list">
            {notifications.map((n) => (
              <li key={n.id} className={`notif-item${n.read ? "" : " notif-item--unread"}`}>
                <div
                  className="notif-item-icon"
                  style={{ background: (TYPE_COLOR[n.type] ?? "#9CA3AF") + "18" }}
                >
                  <span>{n.icon}</span>
                  {!n.read && (
                    <span
                      className="notif-unread-dot"
                      style={{ background: TYPE_COLOR[n.type] ?? "#9CA3AF" }}
                    />
                  )}
                </div>
                <div className="notif-item-body">
                  <p className="notif-item-title">{n.title}</p>
                  <p className="notif-item-body-text">{n.body}</p>
                  <p className="notif-item-time">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
