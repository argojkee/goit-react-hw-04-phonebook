import Form from './Form/Form';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './FriendsList/ContactsList';
import SearchInput from './SearchInput/SearchInput';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts.length === 0 && localStorage.removeItem('contacts');
    contacts.length > 0 &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleDeleteUser = id => {
    if (window.confirm('Are you sure?')) {
      setContacts([...contacts.filter(user => user.id !== id)]);
    }
  };

  const createUser = data => {
    setContacts([
      ...contacts,
      { name: data.name, id: nanoid(), number: data.number },
    ]);
  };

  const handlerSearch = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        paddingTop: '100px',
      }}
    >
      <h1> Phone book </h1>
      <Form createUser={createUser} contacts={contacts} />
      <p>Find contacts by name</p>
      <SearchInput onChange={handlerSearch} value={filter} />
      <h2>Contacts</h2>

      <ContactList
        handleDeleteUser={handleDeleteUser}
        contacts={contacts}
        filter={filter}
      />
    </div>
  );
};
