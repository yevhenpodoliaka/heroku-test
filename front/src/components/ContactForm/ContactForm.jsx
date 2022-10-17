import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import s from './ContactForm.module.css';

import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../redux/contactsSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [addContact, { isSuccess, data }] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  useEffect(() => {
    if (isSuccess) {
      toast.success(`contact ${data.name} add in list`);
    }
  }, [isSuccess, data]);
  
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    hasContact();
    setName('');
    setNumber('');
  };

  const hasContact = () => {
    contacts.find(el => el.name.toLowerCase() === name.toLowerCase())
      ? toast.error(`${name} is already in contacts`)
      : addContact({ name, number});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <button className={s.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;
