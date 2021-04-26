/*
 * Copyright (c) 2021 Vykintas Valuzis
 * All rights reserved.
 */

import PropTypes from "prop-types";

/** Shape of notification object */
export const NotificationShape = PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(["info", "success", "warning", "danger", "muted"]),
    priority: PropTypes.number,
    date: PropTypes.number,
    link:  PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string
    })
})

/** Provides icons and colors based on type property */
export const types = {
    info: {icon: "info", color: "#2196f3"},
    success: {icon: "check-circle", color: "#4caf50"},
    warning: {icon: "exclamation-triangle", color: "#ffb300"},
    danger: {icon: "exclamation-circle", color: "#f44336"},
    muted: {icon: "bell-slash", color: "#7996a3"}
}

/**
 * Groups object array by supplied key. Adapted from {@link https://stackoverflow.com/a/46431916/}
 * @param {object[]} array
 * @param {string} key
 * @return {object} object with arrays grouped by key
 * */
export const groupBy = (array, key) => array.reduce((groupedObj, item) => ({
    ...groupedObj,
    [item[key]]: [...(groupedObj[item[key]] || []), item]
}), {});

/**
 * Gets human-readable label for a group. Currently only two groups are implemented.
 * @param {string} groupKey original group key
 * @param {string} attribute attribute according to which grouping was done
 * @return {string} formated label
 * */
export const getGroupLabel = (groupKey, attribute) => {
    switch (attribute) {
        case "type":
            return groupKey.charAt(0).toUpperCase() + groupKey.slice(1);
        case "priority":
            return `Priority ${groupKey}`;
        default:
            return groupKey;
    }
}