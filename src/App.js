import notificationsJson from "./notifications.json";
import {useState} from "react";
import NotificationWidget from "./NotificationWidget";

export default function App() {

    // Notifications, pre-populated from JSON created in https://www.mockaroo.com/.
    // Represents notifications from backend.
    const [notifications, setNotifications] = useState(notificationsJson)

    /** Removes notification from array based on its id.
     * Probably should call API in production.
     * @param {number} id notification id to remove
     * */
    const dismissNotification = (id) => {
        setNotifications(prevNotifications => prevNotifications.filter(notif => notif.id !== id));
    }

    return <div>
        <NotificationWidget notifications={notifications} onDismiss={dismissNotification} pageLimit={6}/>
    </div>
}
