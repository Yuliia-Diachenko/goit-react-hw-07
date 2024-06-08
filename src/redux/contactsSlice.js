import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import  { selectNameFilter } from "./filtersSlice";

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
            items: [],
            loading: false,
            error: null
    },

   extraReducers: builder => {
        builder
        .addCase(fetchContacts.pending, state => {
            state.error = false;
            state.loading = true;
          })
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
          })
        .addCase(fetchContacts.rejected, state => {
            state.loading = false;
            state.error = true;
          })
        .addCase(addContact.pending, state => {
            state.error = false;
            state.loading = true;
        })
        .addCase(addContact.fulfilled, (state, action) =>{
            state.items.push(action.payload);
            state.loading = true;
        })
        .addCase(addContact.rejected, state => {
            state.loading = false;
            state.error = true;
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
           state.loading = false;
        })
    }, 
}
);


// export const { addContact, deleteContact } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export const contactsReducer = contactsSlice.reducer;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectVisibleContacts = createSelector([selectContacts, selectNameFilter], (contacts,filters) => {
    return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filters.toLowerCase())
            );
});

export default contactsSlice.reducer;