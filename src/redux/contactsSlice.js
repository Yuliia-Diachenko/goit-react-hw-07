import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
            items: [],
            loading: false,
            error: null
    },

//     filters: {
//       name: ""
//   };

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
export default contactsSlice.reducer;

// export const { addContact, deleteContact } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export const contactsReducer = contactsSlice.reducer;