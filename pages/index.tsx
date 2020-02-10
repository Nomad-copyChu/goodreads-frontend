import React from "react";
import { NextPage } from "next";
import Button from "../components/Button";

const index: NextPage = () => {
  return (
    <div>
      <h1>hello</h1>
      <Button size="small" onClick={() => console.log("hi")}>
        버튼
      </Button>
      <Button size="medium" color="green" onClick={() => console.log("hi")}>
        팀버튼
      </Button>
      <Button size="medium" color="green" disabled onClick={() => console.log("hi")}>
        팀버튼
      </Button>
      <img src="https://media.giphy.com/media/h0cVMLhAiBtug/giphy.gif" alt="" />
    </div>
  );
};

export default index;
