import toast from 'react-hot-toast';
import { useEffect } from 'react';
import s from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
import { useSelector } from 'react-redux';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';
import { getFilterValue } from '../../redux/filterSlice';

const Contactlist = () => {
  
  const { data: contacts } = useGetContactsQuery();
  const [deleteContact, { isSuccess, data }] = useDeleteContactMutation();

  const value = useSelector(getFilterValue);
  useEffect(() => {
    if (isSuccess) {
      toast.success(`contact ${data.name} deleted`);
    }
  }, [isSuccess, data]);

  const getVisiblecontacts = () => {
    const normalizedFilter = value.toLowerCase();
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisiblecontacts();
console.log(visibleContacts);
  return (
    <>
      <ul className={s.list}>
        {visibleContacts ? (
          visibleContacts?.map(({ _id, name, number }) => (
            <ContactItem
              key={_id}
              name={name}
              number={number}
              onDeleteContact={() => {
                console.log(_id)
                deleteContact(_id)
              }}
            />
          ))
        ) : (
          <p>Loading Contact ...</p>
        )}
      </ul>
      {contacts?.length === 0 && <p>there are not contacts</p>}
    </>
  );
};

export default Contactlist;
