export default function BottomTabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home",    icon: "🏠", label: "홈" },
    { id: "explore", icon: "🍺", label: "탐색" },
    { id: "add",     icon: null,  label: "평가" },
    { id: "alarm",   icon: "🔔", label: "알림" },
    { id: "profile", icon: "👤", label: "프로필" },
  ];

  return (
    <div className="bottom-tab-bar">
      {tabs.map((tab) =>
        tab.id === "add" ? (
          <button
            key={tab.id}
            className="tab-add-btn"
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-add-icon">＋</span>
          </button>
        ) : (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        )
      )}
    </div>
  );
}
