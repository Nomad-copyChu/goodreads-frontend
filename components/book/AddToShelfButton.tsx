import React, { useState } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import colors from "../../style/colors";
import ArrowIcon from "../../public/static/svg/select/select-down-errow.svg";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  background-color: ${colors.green_500};
  border-radius: 5px;
  height: 32px;
  direction: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  .select-input {
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1px 6px;
    border: 1px solid ${colors.beige_900};
    border-radius: 5px;
    position: relative;
  }
  .select-input-value {
    padding-right: 5px;
    margin-right: 5px;
    border-right: 1px solid ${colors.beige_900};
  }
  .popup-box {
    background-color: white;
    border-radius: 5px;
    border: 1px solid ${colors.gray_500};
    position: absolute;
    top: 100%;
    left: 0;
    white-space: pre;
    height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 4px;
    flex-direction: column;

    li {
      font-size: 14px;
      font-size: 14px;
      padding: 4px 0;
      border-bottom: 1px solid ${colors.gray_500};
      width: 100%;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: ${colors.beige_400};
      }
      &:last-child {
        border: 0;
      }
    }
  }
  p {
    color: white;
    font-size: 14px;
  }
`;

interface IProps {
  value: string;
  options: string[];
  onClick: (value) => void;
}

const AddToShelfButton: React.FC<IProps> = ({ value, options, onClick }) => {
  const [popupStatus, setPopupStatus] = useState(false);
  return (
    <Container>
      <div className="select-input" role="button" onClick={() => setPopupStatus(!popupStatus)}>
        <p className="select-input-value">{value}</p>
        <ArrowIcon classnName="arrow-icon" />
        {popupStatus && (
          <OutsideClickHandler onOutsideClick={() => setPopupStatus(false)}>
            <ul className="popup-box">
              {options.map((option, index) => (
                <li key={index} onClick={() => onClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </OutsideClickHandler>
        )}
      </div>

      <p>선반에 추가하기</p>
    </Container>
  );
};

export default AddToShelfButton;
