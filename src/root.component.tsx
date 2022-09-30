import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReferralsQueue from "./referrals-queue/referrals-queue.component";
import styles from "./root.css";

export default function Root(props) {
  return (
    <div className={`omrs-main-content ${styles.overflowAuto}`}>
      <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
        <Route path="/referrals-queue" element={<ReferralsQueue />} />
      </BrowserRouter>
    </div>
  );
}
