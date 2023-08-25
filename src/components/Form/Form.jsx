import {  useState } from 'react';
import PropTypes from 'prop-types';
import FormStyle from './FormStyle.styled';

const Form = ({ createUser, contacts }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handlerChangeInput = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    } else {
      setNumber(target.value);
    }
  };
  const handlerSubmitForm = e => {
    e.preventDefault();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is alredy in your contacts`);
      return;
    }

    if (number && name) {
      createUser({ name, number });
      setName('');
      setNumber('');
    }
  };

  return (
    <FormStyle onSubmit={handlerSubmitForm}>
      <label>
        Name
        <input
          value={name}
          onChange={handlerChangeInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Phone
        <input
          value={number}
          onChange={handlerChangeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" disabled={!name || !number}>
        Add contact
      </button>
    </FormStyle>
  );
};

export default Form;

Form.propTypes = {
  createUser: PropTypes.func.isRequired,
  userName: PropTypes.string,
  userNumber: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
