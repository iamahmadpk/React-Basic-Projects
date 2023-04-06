import React, {useEffect} from 'react';
import './App.css';
import Header from './Header.js';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { useState } from 'react';
import { uuid } from 'uuidv4';

function App() {
  //const LOCAL_STORAGE_KEY = "contacts";
  //for functional components we use React Hooks useState
 // const [contacts,setContacts] = useState([]);
 const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  /*
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
  ];*/
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };
  /*retereive the data from local storage*/
  useEffect(()=>{
    const getContacts = window.localStorage.getItem(contacts);
    if(getContacts !==null) setContacts(getContacts);
  },[]);
  /*React Hook to persist the data*/
  useEffect(()=>{
    localStorage.setItem(
      LOCAL_STORAGE_KEY, JSON.stringify(contacts)
    )
  },[contacts]);/*pass contacts as dependency injection */
  
  return (
    <div className='ui container'>
      <Header/>
      {/*passing function as props*/}
      <AddContact addContactHandler = {addContactHandler}/>
      <ContactList contacts ={contacts} />
    </div>
  );
}

export default App;
