/*
 * Copyright (c) 2021 Vykintas Valuzis
 * All rights reserved.
 */

import PropTypes from 'prop-types'
import {Button, FlexboxGrid, Icon, List, Panel} from "rsuite";
import styled from "styled-components";
import {NotificationShape, types} from "./utils";


const TypeIcon = styled(Icon)`
  color: ${props => props.color || "#7996a3"};
  font-size: 1.25rem;
`

const DismissButtonWrapper = styled(FlexboxGrid.Item)`
  text-align: center;
  margin-top: 1em;
`

/** Represents single notification */
const Notification = ({data, onDismiss}) => {

    return (
        <List.Item>
            <Panel collapsible header={
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={2}>
                        <TypeIcon icon={types[data.type].icon} color={types[data.type].color}/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        {data.title}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            }>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={24}>
                        {data.description}
                    </FlexboxGrid.Item>
                    {data.link &&
                    <FlexboxGrid.Item colspan={24}>
                        <a href={data.link.href}>{data.link.label}</a>
                    </FlexboxGrid.Item>}
                    <DismissButtonWrapper colspan={24}>
                        <Button appearance={"subtle"} onClick={() => onDismiss(data.id)}>Dismiss</Button>
                    </DismissButtonWrapper>
                </FlexboxGrid>
            </Panel>
        </List.Item>
    )
}

Notification.propTypes = {
    data: NotificationShape.isRequired,
    onDismiss: PropTypes.func
}

Notification.defaultProps = {
    onDismiss: (id) => {}
}

export default Notification;