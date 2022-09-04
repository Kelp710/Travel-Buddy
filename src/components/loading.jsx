import React from "react";
import LoadingScreen from "react-loading-screen";

export const Loading = () => (
  <div>
  <div className="loading_hellow">
  <h1>Hello Travellers!</h1>
  <h2>Let`s plan next Vacation</h2>
  </div>
  <LoadingScreen
    loading={true}
    bgColor="rgba(255,255,255,0.8)"
    spinnerColor="#9ee5f8"
    textColor="#676767"
    logoSrc=""
    text=""
  >
    {" "}
  </LoadingScreen>
</div>
);

