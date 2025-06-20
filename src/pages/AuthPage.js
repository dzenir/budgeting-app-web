import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = isRegister
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem('userId', userCredential.user.uid);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isRegister ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          {isRegister ? 'Create Account' : 'Log In'}
        </button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} style={styles.toggle}>
        {isRegister ? 'Already have an account? Log in' : 'No account? Sign up'}
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '100px auto',
    padding: 24,
    borderRadius: 16,
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Aptos, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 14,
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  toggle: {
    marginTop: 16,
    color: '#555',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
};
