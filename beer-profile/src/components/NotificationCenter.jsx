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
    <div className="notif-page" role="main" aria-label="알림">
      <div className="notif-page-header">
        <button className="notif-back-btn" onClick={closeCenter} aria-label="뒤로가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="notif-page-title">알림</span>
        {unreadCount > 0 ? (
          <button className="notif-read-all" onClick={markAllRead}>모두 읽음</button>
        ) : (
          <span style={{ width: 60 }} />
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
  );
}
