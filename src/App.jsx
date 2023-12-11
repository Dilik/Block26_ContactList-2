import React, { useState } from "react";
import ContactList from "./components/ContactList";
import SelectedContact from "./components/SelectedContact";

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState(null);

  return (
    <>
      {selectedContactId ? (
        // Render the SelectedContact component if selectedContactId is truthy
        <SelectedContact
          selectedContactId={selectedContactId}
          setSelectedContactId={setSelectedContactId}
        />
      ) : (
        // Render the ContactList component if selectedContactId is falsy
        <ContactList setSelectedContactId={setSelectedContactId} />
      )}
    </>
  );
}
