import React, { useRef } from "react";
import { useTransition, useChain, animated, config } from "react-spring";
import styled from "styled-components";
import colors from "../style/colors";

const Container = styled.div`
  .sidebar {
    position: absolute;
    top: 52px;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    .content {
      height: 100vh;
      width: 300px;
      background-color: ${colors.beige_400};
    }
  }
`;

interface IPRops {
  show: boolean;
}
const Sidebar: React.FC<IPRops> = ({ show }) => {
  const sidebarRef = useRef();
  const transition = useTransition(show, null, {
    from: {
      transform: "translateX(-100%)"
    },
    enter: {
      transform: "translateX(0)"
    },
    leave: {
      transform: "translateY(-100%)"
    },
    unique: true,
    config: config.stiff,
    ref: sidebarRef
  });
  console.log(transition);
  useChain([sidebarRef], [0, 0.5]);

  return (
    <Container>
      {transition.map(({ item, key, props }) => (
        <React.Fragment key={key}>
          {item ? (
            <animated.div key={key} style={props} className="sidebar">
              <div className="content">asdfasf</div>
            </animated.div>
          ) : null}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Sidebar;
