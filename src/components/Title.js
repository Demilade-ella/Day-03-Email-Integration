import React from "react";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import "../styles/Title.css";

function Title() {
  return (
    <div className="title">
      <h1>
        Lets Have a Chat
        <span>
          <WavingHandIcon className="wave-hand-icon" />
        </span>
      </h1>
      <p>
        Questions about our products/services, orders, or just <br />
        want to hello? We are here to help
      </p>
    </div>
  );
}

export default Title;
