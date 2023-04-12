import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetails";
import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
 //Retreive contacts
 const retriveContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
 };
  const addContactHandler = async (contact) => {
    console.log(contact);
    //add using api
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts",request)
    setContacts([...contacts, response.data]);
  };
  //to edit
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };


//to delete
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async ()=>{
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
      <Header />
      <Switch>
        <Route 
          path = "/" 
          exact 
          render={(props)=>(<ContactList
            {...props}
            contacts = {contacts}
            getContactId={removeContactHandler} 
            />
            )}
        />
        <Route 
          path = "/add"
          render={(props)=>(<AddContact
            {...props}
            addContactHandler={addContactHandler}
            />
            )}
        />
        <Route 
          path = "/edit"
          render={(props)=>(<EditContact
            {...props}
            updateContactHandler={updateContactHandler}
            />
            )}
        />
        <Route path="/contact/:id" component={ContactDetail}/>
      </Switch>
      {/* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
      
    </div>
  );
}

export default App;
