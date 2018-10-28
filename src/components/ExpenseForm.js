import React from 'react';
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { FormattedMessage, injectIntl, intlShape,defineMessages } from 'react-intl';

class ExpenseForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }


  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount."
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {

    const intl = this.props.intl;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'ExpenseForm.description' })}
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'ExpenseForm.amount' })}
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder={intl.formatMessage({ id: 'ExpenseForm.note' })}
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">
            <FormattedMessage
              id="ExpenseForm.saveExpense"
              defaultMessage="Save Expense"
            />
          </button>
        </div>
      </form>
    );
  }
}

const messages = defineMessages({
  description: {
      id: 'ExpenseForm.description',
      defaultMessage: 'description',
  },
  amount:{
    id: 'ExpenseForm.amount',
    defaultMessage: 'amount',
  },
  note:{
    id: 'ExpenseForm.note',
    defaultMessage: 'Add a note for your expense (optional)',
  }
});

ExpenseForm.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(ExpenseForm);