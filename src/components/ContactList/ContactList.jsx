import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import {selectVisibleContacts} from "../../redux/contactsSlice";

function ContactList() {  
    const visibleContacts = useSelector(selectVisibleContacts);
    return (
        <ul className={css.container}>
           {visibleContacts.map((contact) => (
           <li className={css.contactList} key={contact.id}>
            <Contact contact={contact} />
           </li>
           ))}
        </ul>
    )
}
export default ContactList;