/*
 * Copyright (c) 2021 Vykintas Valuzis
 * All rights reserved.
 */

import PropTypes from 'prop-types'
import {useState} from "react";
import WidgetMaximized from "./WidgetMaximized";
import WidgetMinimized from "./WidgetMinimized";
import {NotificationShape} from "./utils";

/** Notification widget */
const NotificationWidget = ({notifications, onDismiss, pageLimit}) => {

    const [open, setOpen] = useState(false);


    return open ?
        <WidgetMaximized onClose={() => setOpen(false)}
                         initialNotifications={notifications}
                         onDismiss={onDismiss}
                         pageLimit={pageLimit}/>
        :
        <WidgetMinimized onOpen={() => setOpen(true)}/>
}

NotificationWidget.propTypes = {
    notifications: PropTypes.arrayOf(NotificationShape),
    onDismiss: PropTypes.func,
    pageLimit: PropTypes.number
}

NotificationWidget.defaultProps = {
    notifications: [],
    onDismiss: () => {},
    pageLimit: 5
}

export default NotificationWidget;