import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl, intlShape,defineMessages } from 'react-intl';
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };
  confirmRemoveExpense = () => {
    const title = this.props.intl.formatMessage({ id: 'EditExpensePage.title' });
    const message = this.props.intl.formatMessage({ id: 'EditExpensePage.message' });
    const yes = this.props.intl.formatMessage({ id: 'EditExpensePage.yes' });
    const no = this.props.intl.formatMessage({ id: 'EditExpensePage.no' });

    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: yes,
          onClick: () => this.onRemove()
        },
        {
          label: no,
          onClick: () => window.close
        }
      ]
    })
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              <FormattedMessage
                id="EditExpensePage.editExpense"
                defaultMessage="Edit Expense"
              />
            </h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.confirmRemoveExpense}>
            <FormattedMessage
              id="EditExpensePage.removeExpense"
              defaultMessage="Remove Expense"
            />            
          </button>
        </div>
      </div>
    );
  }
}

const messages = defineMessages({
  title: {
      id: 'EditExpensePage.title',
      defaultMessage: 'Confirm',
  },
  message:{
    id: 'EditExpensePage.message',
    defaultMessage: 'Are you sure to do this.',
  },
  yes:{
    id: 'EditExpensePage.yes',
    defaultMessage: 'Yes',
  },
  no:{
    id: 'EditExpensePage.no',
    defaultMessage: 'No',
  }
});

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
});

EditExpensePage.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl( connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage))