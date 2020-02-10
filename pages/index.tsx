import React from "react";
import { NextPage } from "next";
import Button from "../components/Button";

const index: NextPage = () => {
  return (
    <div>
      <h1>hello</h1>
      <Button size="sm" className="awef" onClick="onclick" text="버튼" />
      <Button size="md" className="awef" onClick="onclick" text="큰버튼" />
      <img src="https://media.giphy.com/media/h0cVMLhAiBtug/giphy.gif" alt="" />
    </div>
  );
};

export default index;
