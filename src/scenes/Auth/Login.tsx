import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';
import config from '../../config';
import * as yup from 'yup'
import { TextField } from '@mui/material'
import { Formik } from 'formik';
import {
  MDBContainer,
  MDBTabsContent,
  MDBBtn
}
  from 'mdb-react-ui-kit';

function Login() {
  const [invalidPassword, setInvalidPassword] = useState<string | null>('');
  const [showError, setShowError] = useState(false);
  const [showMsg, setMsg] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLoginSchema = yup.object().shape({
    email: yup.string().email().required('required'),
    password: yup.string().required('required')
  })

  const initialLoginValues = {
    email: "",
    password: ''
  }

  const displayErrorFor5Seconds = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setInvalidPassword(null)
    }, 2000);
  };

  const displayMsgTimer = () => {
    setMsg(true);
    setTimeout(() => {
      setMsg(false);
    }, 2000);
  };
  useEffect(() => {

    if (invalidPassword) {
      displayErrorFor5Seconds();
    }
  }, [invalidPassword]);

  const handleLogin = async (values: any, onSubmitProps: any) => {

    const loginUserData = await fetch(`${config.apiUrl}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const loggedInUser = await loginUserData.json();

    if (loggedInUser.success) {
      setInvalidPassword(null)
      dispatch(setLogin(
        {
          user: loggedInUser.user,
          token: loggedInUser.authToken
        }
      ))
      navigate('/home')
    } else {
      setInvalidPassword(loggedInUser.err)
    }
    onSubmitProps.resetForm()
  }
  const handleLoginClick = (values: any, onSubmitProps: any) => {
    handleLogin(values, onSubmitProps)
  }
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabsContent>
        <Formik initialValues={initialLoginValues}
          validationSchema={userLoginSchema}
          onSubmit={handleLoginClick}>
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            resetForm
          }) => (

            <form onSubmit={handleSubmit}>
              <TextField onBlur={handleBlur}
                onChange={handleChange}
                name='email'
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                label='Email Address'
                id='email'
                type='email'
                size='small'
                sx={{ width: '100%', padding: "7px" }} />

              <TextField onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                label='Password'
                error={Boolean(touched.password) && Boolean(errors.password)}
                variant="outlined" size="small"
                helperText={touched.password && errors.password} id='password' type='text'
                sx={{ width: '100%', padding: "7px" }} />
              <MDBBtn type="submit" className="mb-4 w-100">Sign in</MDBBtn>
              {showError && <p style={{ color: '#8B0000', border: '8px' }}>{invalidPassword}</p>}

            </form>
          )}
        </Formik>
        <p className="text-center">
          Not a member?{' '}
          <Link to="/signup" style={{ color: 'blue' }}>
            Register
          </Link>
        </p>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;