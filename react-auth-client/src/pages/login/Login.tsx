import { useRef, useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../api/axios';
import { LOGIN_URL } from '../../constantes';
import { BackendLoginUserResponse } from '../../models';
import { UserLoginAdapter } from '../../adapters';

export const Login = () => {
  const { setAuth } = useAuthContext();
  const emailRef = useRef<any>();
  const errRef = useRef<any>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!emailRef.current) return;
    emailRef?.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<BackendLoginUserResponse>(
        LOGIN_URL,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setAuth(UserLoginAdapter(response.data));
      setEmail('');
      setPassword('');
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrorMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrorMsg('Username Taken');
      } else {
        if (err.response?.data.errors) {
          setErrorMsg(err.response?.data.errors[0].msg);
        }
        if (err.response?.data.msg) {
          setErrorMsg(err.response?.data.msg);
        } else {
          setErrorMsg('Invalid login');
        }
      }
    }
  };

  return (
    <>
      {success ? (
        <div className="success">
          <h2>Success!</h2>
          <p>You are now logged in.</p>
        </div>
      ) : (
        <section>
          <p ref={errRef} className={errorMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errorMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" ref={emailRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

            <button type="submit">Sign In</button>
          </form>
        </section>
      )}
    </>
  );
};
