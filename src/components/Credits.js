/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {

  const { credits, addCredit, accountBalance } = props;

  // Process form input
  const handleNewCredit = (event) => {

    event.preventDefault();  // Prevent inputs from refreshing until done processing
    const description = event.target.elements.description.value;
    const amount = parseFloat(event.target.elements.amount.value);

    if (!isNaN(amount) && description) {

      // Format input
      const newCredit = {
        id: credits.length + 1,
        description: description,
        amount: amount,
        date: new Date().toISOString()
      };
      
      // Add credit to list
      addCredit(newCredit);
      event.target.reset();

    }

  }

  // Create the list of Credit items
  let creditsView = () => { 

    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>${credit.amount} - {credit.description} - {date}</li>
    });

  }

  // Render the list of Credit items and a form to input new Credit item
  return (

    <div>

      <h1>Credits</h1>

      <AccountBalance accountBalance={accountBalance}/>
    
      {creditsView()}

      <form onSubmit={handleNewCredit}>

        <input type="text" name="description" placeholder="Enter credit description" />
        <input type="number" name="amount" placeholder="Enter credit amount" />
        <button type="submit">Add Credit</button>
        
      </form>

      <br/>

      <Link to="/">Return to Home</Link>

    </div>

  );

}

export default Credits;