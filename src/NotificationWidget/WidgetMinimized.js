/*
 * Copyright (c) 2021 Vykintas Valuzis
 * All rights reserved.
 */

import {Icon, IconButton} from "rsuite";
import styled from "styled-components";
import PropTypes from "prop-types";

// Modifying default IconButton so that we would get ripple effect and more uniform styles.
const FloatingIconButton = styled(IconButton)`
  && {
    width: 72px;
    height: 72px;
    box-shadow: 5px 5px 23px 0 rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  && > .rs-icon {
    width: 72px;
    height: 72px;
    font-size: 36px;
  }
`
/** Minimized widget container */
const WidgetMinimized = ({onOpen}) => {
    return <FloatingIconButton circle icon={<Icon icon={"bell-o"}/>} onClick={onOpen}/>
}

WidgetMinimized.propTypes = {
    onOpen: PropTypes.func.isRequired
}

export default WidgetMinimized;