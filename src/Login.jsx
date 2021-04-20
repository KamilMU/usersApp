import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import styles from './Login.module.css';
import { withRouter } from "react-router";

function Login({
  loginUser,
  username,
  password,
  setPassword,
  setUsername }) {
  return (
    <div className={styles.login}>
      <Formik
        initialValues={{ username: username, password: password }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(2, 'Too Short!')
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(5, "Password is too short - should be 5 chars minimum.")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Logging in", values);
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => {
          const {
            touched,
            errors,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              loginUser();
            }}>

              <label htmlFor="username">Email</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onBlur={handleBlur}
                className={errors.username && touched.username && "error"}
              />
              {errors.username && touched.username && (
                <div className={styles.inputFeedback}>{errors.username}</div>
              )}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={handleBlur}
                className={errors.password && touched.password && "error"}
              />
              {errors.password && touched.password && (
                <div className={styles.inputFeedback}>{errors.password}</div>
              )}
              <button type="submit">Login</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withRouter(Login)