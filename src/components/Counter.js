import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [letterCounter, setLetterCounter] = useState(0);
  const [dropDown, setDropDown] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [selected, setSelected] = useState({});

  const onDropDownDecrement = () => {
    if (counter <= 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
      setDropDown(dropDown.filter((option) => option != counter));
    }
  };

  const onDropDownIncrement = () => {
    if (counter < letterCounter) {
      setCounter(counter + 1);
      setDropDown([...dropDown, counter + 1]);
    }
  };

  const onLetterDecrement = () => {
    if (letterCounter <= 0) {
      setLetterCounter(0);
    } else if (letterCounter > counter) {
      setLetterCounter(letterCounter - 1);
      setOptionList(optionList.slice(0, -1));
    }
  };

  const onLetterIncrement = () => {
    setLetterCounter(letterCounter + 1);
    setOptionList([...optionList, convertToString(letterCounter + 1)]);
  };

  const convertToString = (letterCounter) => {
    if (letterCounter === 0) {
      return "";
    }
    return String.fromCharCode(letterCounter + 96);
  };

  const onChangeHandler = (e, option) => {
    setSelected({ ...selected, [option]: e.target.value || null });
  };

  const submitHandler = () => {
    console.log(Object.values(selected));
  };

  const resetHandler = () => {
    setSelected({});
  };

  return (
    <div className="flex">
      <h1>CONDITIONAL DROPDOWN</h1>

      <div className="float-container">
        <div className="float-child">
          <h4>Selects</h4>
          <button className="decrement-btn" onClick={onDropDownDecrement}>
            -
          </button>
          {counter}
          <button className="increment-btn" onClick={onDropDownIncrement}>
            +
          </button>
        </div>

        <div className="float-child">
          <h4>Letters</h4>
          <button className="decrement-btn" onClick={onLetterDecrement}>
            -
          </button>
          {letterCounter}
          <button className="increment-btn" onClick={onLetterIncrement}>
            +
          </button>
        </div>
      </div>

      <div className="dropdown-btn">
        {dropDown?.length
          ? dropDown.map((dropDownOption) => (
              <select
                id={dropDownOption}
                className="dropdown"
                onChange={(e) => onChangeHandler(e, dropDownOption)}
                value={selected[dropDownOption] || ""}
                key={dropDownOption}
              >
                <option value="">SELECT</option>
                {optionList
                  .filter(
                    (option) =>
                      option === selected[dropDownOption] ||
                      !Object.values(selected).includes(option)
                  )
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            ))
          : ""}
      </div>

      <div className="btn-flex">
        <button onClick={submitHandler}>Submit</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
