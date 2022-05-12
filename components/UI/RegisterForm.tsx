import styles from "./RegisterForm.module.css";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import SVGIcon from "./SVGIcon";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  //using state to describe the forms status
  const [formStatus, setFormStatus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordToggle = () => setPasswordVisible(!passwordVisible);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .lowercase()
        .required("required"),
      password: Yup.string()
        .min(8, "Your password must have at least 8 characters")
        .required("required"),
      confirmPassword: Yup.string()
        .test(
          "is-match",
          "passwords do not match, try again.",
          (value, context) => value === context.parent
        )
        .required(),
    }),
    onSubmit: (values, actions) => {
      //after form is submitted the following function will execute
      apiFetcher(values);
      //clear the form after submission
      actions.resetForm();
    },
  });

  //handle form submission
  const apiFetcher = async (values: RegisterValues) => {
    const { email, password, confirmPassword } = values;
    setFormStatus(() => !formStatus);
    console.log(email);
  };

  //register form
  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      {formStatus && (
        <div className={styles.formSuccess}>
          Success - Check your email for confirmation
        </div>
      )}
      <h1>Register</h1>
      {/* user name input */}
      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input
        className={styles.input}
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {/* error message to display if form not filled out correctly */}
      {formik.touched.email && formik.errors.email ? (
        <div className={styles.errorMessage}>{formik.errors.email}</div>
      ) : null}

      {/* password input */}
      <label htmlFor="password" className={styles.label}>
        Password
        <SVGIcon title="reveal password" action={passwordToggle} icon={faEye} />
      </label>
      <input
        className={styles.input}
        id="password"
        name="password"
        type={passwordVisible ? "text" : "password"}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {/* error message to display if form not filled out correctly */}
      {formik.touched.password && formik.errors.password ? (
        <div className={styles.errorMessage}>{formik.errors.password}</div>
      ) : null}

      {/* confirm password input */}
      <label htmlFor="confirmPassword" className={styles.label}>
        Confirm Password
        <SVGIcon title="reveal password" action={passwordToggle} icon={faEye} />
      </label>
      <input
        className={styles.input}
        id="confirmPassword"
        name="confirmPassword"
        type={passwordVisible ? "text" : "password"}
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      {/* error message to display if form not filled out correctly */}
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className={styles.errorMessage}>
          {formik.errors.confirmPassword}
        </div>
      ) : null}

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.reset}`}
          type="reset"
          onClick={() => {
            formik.resetForm();
          }}
        >
          Reset
        </button>
        <button className={`${styles.button} ${styles.submit}`} type="submit">
          Submit
        </button>
      </div>
      <div className={styles.registerLink}>
        already a member? <Link href="/login">login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
