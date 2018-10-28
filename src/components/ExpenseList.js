import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";
import { injectIntl, intlShape,defineMessages } from 'react-intl';

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">{props.intl.formatMessage({ id: 'ExpenseList.expenses' })}</div>
      <div className="show-for-desktop">{props.intl.formatMessage({ id: 'ExpenseList.expense' })}</div>
      <div className="show-for-desktop">{props.intl.formatMessage({ id: 'ExpenseList.amount' })}</div>
    </div>
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>
            <FormattedMessage
              id="ExpenseList.noExpenses"
              defaultMessage="No expenses"
            />
          </span>
        </div>
      ) : (
        props.expenses.map(expense => {
          return <ExpenseListItem key={expense.id} {...expense} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

const messages = defineMessages({
  expense: {
      id: 'ExpenseList.expense',
      defaultMessage: 'Expense',
  },
  expenses:{
    id:"ExpenseList.expenses",
    defaultMessage:"Expenses"
  },
  amount:{
    id:"ExpenseList.amount",
    defaultMessage:"Amount"
  }
});

ExpenseList.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(connect(mapStateToProps)(ExpenseList));
