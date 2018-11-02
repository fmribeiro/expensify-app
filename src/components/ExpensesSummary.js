import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from "numeral";
import moment from 'moment';
require("numeral/locales/pt-br");

const locale = navigator.languages[0];
if (locale !== "en-US") {
  moment.locale(locale.substr(0.2));
  numeral.locale(locale.toLowerCase());
}

export const ExpensesSummary = ({ expenseCount, expensesTotal, props }) => {
  //const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const expenseWord = expenseCount === 1 ? <FormattedMessage id="ExpensesSummary.expense" defaultMessage="expense" /> :
    <FormattedMessage id="ExpensesSummary.expenses" defaultMessage="expenses" />;

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          <FormattedMessage id="ExpensesSummary.viewing" defaultMessage="Viewing" />{" "}
          <span>{expenseCount}</span> {" "}
          {expenseWord} {" "}
          <FormattedMessage id="ExpensesSummary.totalling" defaultMessage="totalling" />{" "}
          <span>{numeral(expensesTotal / 100).format("$0,0.00")}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create"><FormattedMessage id="ExpensesSummary.addExpense" defaultMessage="Add Expense" /></Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
