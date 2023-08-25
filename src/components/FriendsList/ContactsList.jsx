import ContactItem from './ContactItem';
import PropTypes from 'prop-types';
import ContactsListStyled from './ContactsListStyle.styled';

const ContactList = ({ contacts, filter, handleDeleteUser }) => {
  console.log('hehe');
  return (
    <ContactsListStyled>
      {contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.number.toLowerCase().includes(filter.toLowerCase())
        )
        .map(contact => (
          <ContactItem
            handleDeleteUser={handleDeleteUser}
            userName={contact.name}
            userNumber={contact.number}
            id={contact.id}
            key={contact.id}
          />
        ))}
    </ContactsListStyled>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};
