import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
require("numeral/locales/pt-br");

const locale = navigator.languages[0];
if (locale !== "en-US") {
  moment.locale(locale.substr(0.2));
  numeral.locale(locale.toLowerCase());
}

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">
        {moment(createdAt).format("LL")}
      </span>
    </div>
    <h3 className="list-item__data">
      {numeral(amount / 100).format("$ 0,0.00")}
    </h3>
  </Link>
);

export default ExpenseListItem;
