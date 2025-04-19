import React, { createContext, useState } from 'react';

export const UserDataContext = createContext(null); 

const UserProvider = ({ children }) => {  
  const [user, setUser] = useState({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: ''
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserProvider;  
