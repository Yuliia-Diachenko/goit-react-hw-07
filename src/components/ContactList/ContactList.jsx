import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
// import { selectContacts } from "../../redux/contactsSlice";
// import { selectNameFilter } from "../../redux/filtersSlice";

function ContactList() {
    const contacts = useSelector(state => state.contacts.items);

    return (
        <ul className={css.container}>
           {contacts.map((contact) => (
           <li className={css.contactList} key={contact.id}>
            <Contact contact={contact} />
           </li>
           ))}
        </ul>
    )
}
export default ContactList;