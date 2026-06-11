import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "recommendation",
    icon: "🍺",
    title: "오늘의 추천 맥주",
    body: "Belgian Tripel이 당신의 취향과 89% 일치합니다",
    time: "방금",
    read: false,
  },
  {
    id: "n2",
    type: "level",
    icon: "🏆",
    title: "레벨 업!",
    body: "맥주 탐험가 달성! 다음 레벨까지 15잔 남았습니다",
    time: "1시간 전",
    read: false,
  },
  {
    id: "n3",
    type: "community",
    icon: "💬",
    title: "커뮤니티 활동",
    body: "홉헤드님이 회원님의 리뷰에 좋아요를 눌렀습니다",
    time: "3시간 전",
    read: true,
  },
  {
    id: "n4",
    type: "weekly",
    icon: "📊",
    title: "이번 주 맥주 리포트",
    body: "이번 주 4잔 기록! IPA를 가장 많이 마셨네요",
    time: "어제",
    read: true,
  },
];

let toastIdSeq = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [centerOpen, setCenterOpen] = useState(false);

  const addToast = useCallback(({ message, type = "info", duration = 3000 }) => {
    const id = ++toastIdSeq;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      { ...notification, id: `n${Date.now()}`, read: false, time: "방금" },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const openCenter = useCallback(() => setCenterOpen(true), []);
  const closeCenter = useCallback(() => setCenterOpen(false), []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        notifications,
        unreadCount,
        centerOpen,
        addToast,
        addNotification,
        markAllRead,
        openCenter,
        closeCenter,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
