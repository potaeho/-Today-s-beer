function IconHome({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9"/>
      <path d="M9 21V12h6v9"/>
      <path d="M5 10v11h14V10"/>
    </svg>
  );
}

function IconExplore({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="11" cy="11" r="7"/>
      <line x1="16.5" y1="16.5" x2="21" y2="21"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7"/>
      <line x1="16.5" y1="16.5" x2="21" y2="21"/>
    </svg>
  );
}

function IconAlarm({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="currentColor" fillOpacity="0.15"/>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

function IconProfile({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}

export default function BottomTabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home",    Icon: IconHome,    label: "홈" },
    { id: "explore", Icon: IconExplore, label: "탐색" },
    { id: "add",     Icon: null,        label: "평가" },
    { id: "alarm",   Icon: IconAlarm,   label: "알림" },
    { id: "profile", Icon: IconProfile, label: "프로필" },
  ];

  return (
    <div className="bottom-tab-bar">
      {tabs.map((tab) =>
        tab.id === "add" ? (
          <div key={tab.id} className="tab-add-wrap">
            <button className="tab-add-btn" onClick={() => onTabChange(tab.id)}>
              <span className="tab-add-icon">＋</span>
            </button>
            <span className="tab-add-label">평가</span>
          </div>
        ) : (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">
              <tab.Icon active={activeTab === tab.id} />
            </span>
            <span className="tab-label">{tab.label}</span>
          </button>
        )
      )}
    </div>
  );
}
