import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import isNaN from "lodash/isNaN";
import styled from "styled-components";
import ko from "date-fns/locale/ko";
import { subYears, addYears } from "date-fns";
import isValid from "date-fns/isValid";
import getTimeStamp from "../../lib/util";
import colors from "../../style/colors";

const Container = styled.div`
  position: relative;
  display: block;
  width: 280px;
  input {
    background-color: transparent;
    width: 100%;
    height: 35px;
    border: 1px solid ${colors.woody_500};
    border-radius: 5px;
    font-size: 0.875rem;
    padding: 6px 0px 6px 12px;
    outline: none;
    -webkit-appearance: none;
    background-size: 45px 45px;
    background-position-x: 100.5%;

    ::-webkit-inner-spin-button {
      display: none;
    }
    ::-webkit-calendar-picker-indicator {
      opacity: 0;
    }

    ::placeholder {
    }
  }

  .calendar-icon-wrapper {
    height: 100%;
    position: absolute;
    pointer-events: none;
    z-index: 1;
    width: 40px;
    right: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
    }
  }
  input[type="date"]::-webkit-clear-button {
    display: none;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__triangle {
    border-bottom-color: white !important;
  }
  .react-datepicker {
    width: 280px;
    font-family: "Oxygen", sans-serif;
  }
  .react-datepicker__header {
    background-color: white;
  }
  .react-datepicker__month-container {
    width: 100%;
  }
  .react-datepicker__day-names {
    width: 100%;
    display: flex;
    font-weight: bold;
    justify-content: space-around;
  }
  .react-datepicker__month {
    margin: 0 !important;
  }
  .react-datepicker__day {
    font-weight: bold;
    &:hover {
      background-color: #f4f7ff !important;
      color: #4d7bf2;
    }
  }
  .react-datepicker-popper {
    z-index: 2;
  }
  .react-datepicker__day--selected {
    background-color: #4d7bf2;
    &:hover {
      background-color: #4d7bf2 !important;
      color: white;
    }
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #4d7bf2 !important;
  }
  .react-datepicker__week {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .react-datepicker__current-month {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-datepicker__navigation {
    margin-top: 6px;
  }
  .react-datepicker__day--outside-month {
    color: ${colors.gray_500};
  }
  .react-datepicker__close-icon {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-left: 1px solid ${colors.woody_500};
  }
  .react-datepicker__close-icon::after {
    font-size: 1rem;
    background-color: ${colors.gray_500};
    display: flex;
    justify-content: center;
    margin-left: 1px;
    align-items: center;
  }
  .react-datepicker__navigation--previous {
    left: 36px;
  }
  .react-datepicker__navigation--next {
    right: 36px;
  }
  .prev-year {
    left: 12px;
    &:hover {
      border-right-color: #ccc;
    }
  }
  .prev-year2 {
    left: 5px;
    &:hover {
      border-right-color: #ccc;
    }
  }
  .next-year {
    right: 12px;
    &:hover {
      border-left-color: #ccc;
    }
  }
  .next-year2 {
    right: 5px;
    &:hover {
      border-left-color: #ccc;
    }
  }
`;

export interface DatePickerProps {
  /**초기값 혹은 변경후 저장될 값 */
  value: Date | string;
  /** 날짜 선택시 실행될 callback */
  onChange: (date: Date | string) => void;
  className?: string;
  placeholder?: string;
}
/**
 *  `DatePicker` 컴포넌트는 날짜를 선택 할 때 사용합니다.
 *   데스크탑에서는 react-datepicker를
 *   모바일에선 input tag를 사용 합니다.
 */
const DatePicker = ({ value, onChange, className, placeholder }: DatePickerProps) => {
  const [openDate, setOpenDate] = useState();
  useEffect(() => {
    setOpenDate(new Date(value));
  }, [value]);
  const dateChange = e => {
    /**
     * ? safari 는 input 에 대하여 예외처리를 해주지 않는다.
     * * input 을 string으로 주어 isValid 체크를 하여 시간으로 변환가능하면 변환해주고 아니면 안되는거고
     * * 하지만 애초에 숫자만 입력받는다.
     */
    //숫자가 아닌것을 넣는다면
    const numbers = e.target.value;
    if (isNaN(parseInt(numbers, 10))) {
      console.error("dont push lettering");
      if (numbers === "") {
        onChange(null);
      }
    } else {
      onChange(getTimeStamp(e.target.value));
    }
    //time 으로 써 valid하다면
    if (isValid(new Date(numbers))) {
      onChange(new Date(numbers));
    } else {
      console.warn("invalid date");
    }
  };
  return (
    <Container className={`${className} datepicker-wrapper`}>
      <ReactDatePicker
        selected={value === null ? null : new Date(value)}
        onChange={date => {
          onChange(date);
          setOpenDate(date);
        }}
        locale={ko}
        isClearable
        openToDate={openDate}
        onMonthChange={date => setOpenDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        className="pc-datepicker"
        placeholderText={placeholder}
      >
        <div role="button" onClick={() => setOpenDate(subYears(openDate, 1))}>
          <button
            type="button"
            className="react-datepicker__navigation react-datepicker__navigation--previous prev-year"
          >
            Prev Year
          </button>
          <button
            type="button"
            className="react-datepicker__navigation react-datepicker__navigation--previous prev-year2"
          >
            Prev Year
          </button>
        </div>
        <div role="button" onClick={() => setOpenDate(addYears(openDate, 1))}>
          <button type="button" className="react-datepicker__navigation react-datepicker__navigation--next next-year">
            Next Year
          </button>
          <button type="button" className="react-datepicker__navigation react-datepicker__navigation--next next-year2">
            Next Year
          </button>
        </div>
      </ReactDatePicker>
    </Container>
  );
};

export default DatePicker;
