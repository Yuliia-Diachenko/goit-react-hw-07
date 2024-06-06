import { useId } from "react";
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required")
  });
  
function ContactForm() {
  const dispatch = useDispatch();
    const fieldId = useId();
    const handleSubmit = (values, actions) => {     
        values.id = nanoid(); 
        actions.resetForm();      
        dispatch(addContact(values));    
        actions.resetForm();
      };
  
    return (
      <Formik initialValues={{ name: "", number: "" }} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
        
      <Form className={css.container}>

        <div className={css.group}>
            <label  htmlFor={`${fieldId}-name`}>Name</label>
            <Field type="text" name="name" id={`${fieldId}-name`}/>
            <ErrorMessage name="name" component="span" className={css.error}/>
        </div>
        <div className={css.group}>
            <label  htmlFor={`${fieldId}-number`}>Number</label>
            <Field type="text" name="number" id={`${fieldId}-number`}/>
            <ErrorMessage name="number" component="span" className={css.error}/>
        </div>
        <button type="submit">Add contact</button>
        
      </Form>
      </Formik>
    )
}
export default ContactForm;