import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReferralsQueue from "./referrals-queue/referrals-queue.component";
import styles from "./root.css";

export default function Root(props) {
  return (
    <div className={`omrs-main-content ${styles.overflowAuto}`}>
      <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
        <Routes>
          <Route path="/referrals-queue" element={<ReferralsQueue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
