/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {

  const { debits, addDebit, accountBalance } = props;

  // Process form input
  const handleNewDebit = (event) => {

    event.preventDefault();  // Prevent inputs from refreshing until done processing
    const description = event.target.elements.description.value;
    const amount = parseFloat(event.target.elements.amount.value);

    if (!isNaN(amount) && description) {

      // Format input
      const newDebit = {
        id: debits.length + 1,
        description: description,
        amount: amount,
        date: new Date().toISOString()
      };

      // Add debit to list
      addDebit(newDebit);
      event.target.reset();

    }

  }

  // Create the list of Debit items
  let debitsView = () => { 

    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>${debit.amount} - {debit.description} - {date}</li>
    });

  }

  // Render the list of Debit items and a form to input new Debit item
  return (

    <div>

      <h1>Debits</h1>

      <AccountBalance accountBalance={accountBalance}/>

      {debitsView()}

      <br/>

      <form onSubmit={handleNewDebit}>

        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
        
      </form>

      <br/>

      <Link to="/">Return to Home</Link>

    </div>

  );

}

export default Debits;