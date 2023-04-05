import './App.css';
import Header from './Header.js';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const contacts = [
    {
      id:"1",
      name: "Ahmad",
      email: "iamahmadpk444@gmail.com"
    },
    {
      id:"2  ",
      name: "AhmadPk",
      email: "iamahmadpk53@gmail.com"
    }
  ];
  return (
    <div className='ui container'>
      <Header/>
      <AddContact/>
      <ContactList contacts ={contacts} />
    </div>
  );
}

export default App;
