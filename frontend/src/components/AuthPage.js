import React, { useState } from 'react';

import Signup from './signup/Signup';
import Login from "./login/Login"

function AuthPage() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {showSignup ? (
        <Signup
          switchToLogin={() => setShowSignup(false)}
          onSignUpSuccess={() => setShowSignup(false)}
        />
      ) : (
        <Login switchToSignup={() => setShowSignup(true)} />
        
      )}
    </>
  );
}

export default AuthPage;
