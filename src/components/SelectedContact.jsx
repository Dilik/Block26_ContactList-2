import React, { useState, useEffect } from "react";
import "./SelectedContact.css";

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        setContact(result);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);

  const handleGoBack = () => {
    setSelectedContactId(null);
  };

  return (
    <div className="selected-contact">
      <h2>Contact Details</h2>
      {selectedContactId ? (
        contact ? (
          <div>
            {Object.entries(contact).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong>{" "}
                {typeof value === "object" ? (
                  // Handle nested objects by rendering their properties
                  Object.entries(value).map(([nestedKey, nestedValue]) => (
                    <div key={nestedKey}>
                      <strong>{nestedKey}:</strong>{" "}
                      {typeof nestedValue === "object" ? (
                        // Handle doubly nested objects
                        Object.entries(nestedValue).map(
                          ([doubleNestedKey, doubleNestedValue]) => (
                            <div key={doubleNestedKey}>
                              <strong>{doubleNestedKey}:</strong> {doubleNestedValue}
                            </div>
                          )
                        )
                      ) : (
                        nestedValue
                      )}
                    </div>
                  ))
                ) : (
                  value
                )}
              </div>
            ))}
            <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
          </div>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p>Click on a contact to view details.</p>
      )}
    </div>
  );
}
