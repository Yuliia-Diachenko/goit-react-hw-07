import css from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from "../ContactList/ContactList"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchContacts } from '../../redux/contactsOps.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Loader from '../Loader/Loader.jsx';
import Error from '../Error/Error.jsx';
import { selectLoading, selectError } from "../../redux/contactsSlice";

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {      
      
      try {
          const response = await axios.get('/contacts');
          return response.data;  
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
      
      }
  });

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  useEffect(() => {dispatch(fetchContacts())}, [dispatch]);

return (

<div className={css.container}>

  <h1>Phonebook</h1>
    <ContactForm />
    <SearchBox />
    {isLoading && <Loader>Loading message</Loader>}
    {isError && <Error>Error message</Error>}
    <ContactList /> 

</div>

)
}
export default App;