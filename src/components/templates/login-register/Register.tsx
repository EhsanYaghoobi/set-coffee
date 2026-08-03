import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { errorAlert, successAlert } from "@/utils/helper";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";

type RegisterProps = {
  showLoginForm: () => void;
};

const Register = ({ showLoginForm }: RegisterProps) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signUp = async () => {
    if (!name.trim()) {
      return errorAlert("نام معتبر نمی باشد");
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return errorAlert("شماره موبایل معتبر نمی باشد");
    }

    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        return errorAlert("ایمیل معتبر نمی باشد");
      }
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return errorAlert("رمز عبور معتبر نمی باشد");
    }

    const user = { name, phone, email, password };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      return successAlert("ثبت نام با موفقیت انجام شد", "ورود به پنل کاربری");
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="نام"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {isRegisterWithPass && (
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}
            <p
              onClick={() => setIsRegisterWithOtp(true)}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              onClick={() => {
                if (isRegisterWithPass) {
                  signUp();
                } else {
                  setIsRegisterWithPass(true);
                }
              }}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showLoginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p onClick={showLoginForm} className={styles.redirect_to_home}>
            لغو
          </p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}

      {/* <Sms /> */}
    </>
  );
};

export default Register;
