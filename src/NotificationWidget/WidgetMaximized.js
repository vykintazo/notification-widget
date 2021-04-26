/*
 * Copyright (c) 2021 Vykintas Valuzis
 * All rights reserved.
 */

import styled from "styled-components";
import {Icon, List, Pagination, Panel} from "rsuite";
import Notification from "./Notification";
import ToolBar from "./ToolBar";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getGroupLabel, groupBy, NotificationShape} from "./utils";

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 700px;
  box-shadow: 5px 5px 23px 0 rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 20px;
  right: 20px;
`
const TopHeader = styled.div`
  width: 100%;
  height: 54px;
  background-color: #3498FF;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CloseButton = styled(Icon)`
  color: white;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`
const HeaderTitle = styled.div`
  color: white;
  font-size: 1.75em;
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`
const NotificationWrapper = styled(List)`
  margin: 0.25em 1em;
  flex: 1;
`
const CenteredDiv = styled.div`
  text-align: center;
`

/**
 * Container of maximized notification widget
 * */
const WidgetMaximized = ({onClose, initialNotifications, pageLimit, onDismiss}) => {

    // This is array which is displayed (after sorting, pagination and grouping)
    const [notifications, setNotifications] = useState([]);
    // This is array with filter applied, used as base for other data transforms (to preserve unmodified array)
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("date-desc");
    const [filter, setFilter] = useState("all");
    const [grouping, setGrouping] = useState("none");
    const [page, setPage] = useState(1);

    // After new notifications re-apply filter, which in turn will trigger other data transforms as well.
    // Note: ESLint react-hooks/exhaustive-deps warning is shown because I am modifying state inside useEffect
    useEffect(() => {
        setNotifications(initialNotifications);
        onFilter(filter);
    }, [initialNotifications])

    // After each filtering, re-apply search
    // Note: ESLint react-hooks/exhaustive-deps warning is shown because I am modifying state inside useEffect
    useEffect(() => {
        onSearch(search);
    }, [filteredNotifications]);

    /**
     * Filters notifications according to search keyword
     * @param {string} value search keyword
     * */
    const onSearch = (value) => {
        setSearch(value);
        // Reset page to 1 to avoid empty pages
        setPage(1);
        const lowerCaseVal = value.toLowerCase();
        const n = filteredNotifications.filter(notif =>
            notif.title.toLowerCase().includes(lowerCaseVal) || notif.description.toLowerCase().includes(lowerCaseVal));
        setNotifications(n);
    }

    /** Filters notifications based on specific property
     * @param {string} key property of notification object
     * */
    const onFilter = (key) => {
        setFilter(key);
        // Reset page to 1 to avoid empty pages
        setPage(1);
        if (key !== "all") {
            const n = initialNotifications.filter(notif => notif.type === key);
            setFilteredNotifications(n);
        } else {
            setFilteredNotifications(initialNotifications);
        }
    }
    /**
     * Gets paginated notifications
     * @param {object[]} notifications notification array
     * @param {number} page page to get
     * */
    const getPage = (notifications, page) => {
        const start = (page - 1) * pageLimit;
        return notifications.slice(start, start + pageLimit)
    }

    /**
     * Sorts and returns notifications according to sort criteria.
     * Sort criteria should be in the form of "{key}-{asc|desc}".
     * */
    const sortedNotifications = () => {
        const [sortKey, direction] = sort.split("-");
        const comparator = (a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];
            if (typeof valA === "string" && typeof valB === "string") {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
                if (valA > valB) {
                    return direction === "asc" ? 1 : -1;
                }
                if (valA < valB) {
                    return direction === "asc" ? -1 : 1;
                }
                return 0;
            }
            // Else values are numbers
            return (valA - valB) * (direction === "asc" ? 1 : -1);

        };
        return [...notifications].sort(comparator);
    }

    return (
        <WidgetContainer>
            <TopHeader>
                <HeaderTitle>Notifications</HeaderTitle>
                <CloseButton icon={"close"} onClick={onClose}/>
            </TopHeader>
            <Content>
                <ToolBar onFilter={onFilter} filter={filter}
                         onSort={setSort} sort={sort}
                         onGroup={setGrouping} grouping={grouping}
                         onSearch={onSearch}/>
                <NotificationWrapper>
                    {grouping !== "none" ?
                        Object.entries(groupBy(sortedNotifications(), grouping)).map(([key, items]) => (
                            <Panel header={getGroupLabel(key, grouping)} collapsible key={key}>
                                {items.map((item, i) => <Notification data={item} key={`${key}-${i}`}
                                                                      onDismiss={onDismiss}/>)}
                            </Panel>
                        ))
                        :
                        getPage(sortedNotifications(), page).map((item, i) =>
                            <Notification key={i} data={item} onDismiss={onDismiss}/>
                        )
                    }

                </NotificationWrapper>
                {/* Disable pagination when grouping */}
                {grouping === "none" &&
                <CenteredDiv>
                    <Pagination pages={Math.ceil(notifications.length / pageLimit)}
                                ellipsis activePage={page}
                                onSelect={setPage}
                                maxButtons={10}
                                prev last next first/>
                </CenteredDiv>
                }

            </Content>
        </WidgetContainer>
    )
}

WidgetMaximized.propTypes = {
    initialNotifications: PropTypes.arrayOf(NotificationShape),
    pageLimit: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onDismiss: PropTypes.func
}
WidgetMaximized.defaultProps = {
    initialNotifications: [],
    pageLimit: 5,
    onDismiss: (id) => {
    }
}

export default WidgetMaximized;