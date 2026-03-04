import { useNotificationPreferences } from "../hooks/useNotificationPreferences";
import "./NotificationToggle.css";

interface NotificationToggleProps {
  matchId: number;
  variant?: "full" | "icon";
}

const NotificationToggle = ({
  matchId,
  variant = "full",
}: NotificationToggleProps) => {
  const { isSubscribed, toggle } = useNotificationPreferences();
  const active = isSubscribed(matchId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(matchId);
  };

  if (variant === "icon") {
    return (
      <button
        className={`notif-toggle notif-toggle--icon ${active ? "notif-toggle--active" : ""}`}
        onClick={handleClick}
        title={active ? "Désactiver les notifications" : "Activer les notifications"}
        aria-label={active ? "Désactiver les notifications" : "Activer les notifications"}
        aria-pressed={active}
      >
        {active ? "🔔" : "🔕"}
      </button>
    );
  }

  return (
    <button
      className={`notif-toggle notif-toggle--full ${active ? "notif-toggle--active" : ""}`}
      onClick={handleClick}
      aria-pressed={active}
    >
      <span className="notif-toggle__icon">{active ? "🔔" : "🔕"}</span>
      <span className="notif-toggle__label">
        {active ? "Notifications activées" : "Activer les notifications"}
      </span>
      <span className={`notif-toggle__dot ${active ? "notif-toggle__dot--on" : ""}`} />
    </button>
  );
};

export default NotificationToggle;
