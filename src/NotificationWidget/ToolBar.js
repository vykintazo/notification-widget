/*
 * Copyright (c) 2021 Vykintas Valuzis
 * All rights reserved.
 */

import {Dropdown, FlexboxGrid, Icon, IconButton, Input, InputGroup} from "rsuite";
import styled from "styled-components";
import PropTypes from "prop-types";

const ToolsFlexboxGridItem = styled(FlexboxGrid.Item)`
  text-align: center;
  padding: 2px 1px
`

/** Toolbar containing notification searching, filtering, sorting etc. tools */
const ToolBar = ({onSearch, onSort, sort, onFilter, filter, onGroup, grouping}) => {

    return (
        <FlexboxGrid>
            <ToolsFlexboxGridItem colspan={18}>
                <InputGroup>
                    <Input placeholder={"Search..."} onChange={onSearch}/>
                    <InputGroup.Addon>
                        <Icon icon="search"/>
                    </InputGroup.Addon>
                </InputGroup>
            </ToolsFlexboxGridItem>
            <ToolsFlexboxGridItem colspan={2}>
                <Dropdown placement={"bottomEnd"}
                          activeKey={filter}
                          renderTitle={() => <IconButton icon={<Icon icon={"filter"}/>}/>}
                          onSelect={onFilter}>
                    <Dropdown.Item panel style={{padding: 10, width: 160}}>
                        <b>Filter by type:</b>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={"all"}>All</Dropdown.Item>
                    <Dropdown.Item eventKey={"success"}>Success</Dropdown.Item>
                    <Dropdown.Item eventKey={"warning"}>Warning</Dropdown.Item>
                    <Dropdown.Item eventKey={"danger"}>Danger</Dropdown.Item>
                    <Dropdown.Item eventKey={"info"}>Info</Dropdown.Item>
                    <Dropdown.Item eventKey={"muted"}>Muted</Dropdown.Item>
                </Dropdown>
            </ToolsFlexboxGridItem>
            <ToolsFlexboxGridItem colspan={2}>
                <Dropdown placement={"bottomEnd"}
                          renderTitle={() => <IconButton icon={<Icon icon={"sort-amount-desc"}/>}/>}
                          activeKey={sort}
                          onSelect={onSort}>
                    <Dropdown.Item panel style={{padding: 10, width: 160}}>
                        <b>Sort by:</b>
                    </Dropdown.Item>
                    <Dropdown.Menu title={"Priority"} pullLeft>
                        <Dropdown.Item icon={<Icon icon={"sort-amount-asc"}/>}
                                       eventKey={"priority-asc"}>Ascending</Dropdown.Item>
                        <Dropdown.Item icon={<Icon icon={"sort-amount-desc"}/>}
                                       eventKey={"priority-desc"}>Descending</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Menu title={"Title"} pullLeft>
                        <Dropdown.Item icon={<Icon icon={"sort-alpha-asc"}/>}
                                       eventKey={"title-asc"}>A-Z</Dropdown.Item>
                        <Dropdown.Item icon={<Icon icon={"sort-alpha-desc"}/>}
                                       eventKey={"title-desc"}>Z-A</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Menu title={"Date"} pullLeft>
                        <Dropdown.Item icon={<Icon icon={"sort-amount-asc"}/>}
                                       eventKey={"date-asc"}>From oldest</Dropdown.Item>
                        <Dropdown.Item icon={<Icon icon={"sort-amount-desc"}/>}
                                       eventKey={"date-desc"}>From newest</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ToolsFlexboxGridItem>
            <ToolsFlexboxGridItem colspan={2}>
                <Dropdown placement={"bottomEnd"}
                          renderTitle={() => <IconButton icon={<Icon icon={"bars"}/>}/>}
                          activeKey={grouping}
                          onSelect={onGroup}>
                    <Dropdown.Item panel style={{padding: 10, width: 160}}>
                        <b>Group by:</b>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={"none"}>No Grouping</Dropdown.Item>
                    <Dropdown.Item eventKey={"type"}>Types</Dropdown.Item>
                    <Dropdown.Item eventKey={"priority"}>Priority</Dropdown.Item>
                </Dropdown>
            </ToolsFlexboxGridItem>
        </FlexboxGrid>
    )
}

ToolBar.propTypes = {
    filter: PropTypes.string,
    grouping: PropTypes.string,
    onFilter: PropTypes.func,
    onGroup: PropTypes.func,
    onSearch: PropTypes.func,
    onSort: PropTypes.func,
    sort: PropTypes.string
}

ToolBar.defaultProps = {
    filter: "all",
    grouping: "none",
    onFilter: () => {},
    onGroup: () => {},
    onSearch: () => {},
    onSort: () => {},
    sort: "date-desc"
}

export default ToolBar;