"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { errorAlert, successAlert } from "@/utils/helper";
import { validateEmail, validatePassword } from "@/utils/auth";

type LoginProps = {
  showRegisterForm: () => void;
};

const Login = ({ showRegisterForm }: LoginProps) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const showOtpForm = () => setIsLoginWithOtp(true);
  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginWithPasword = async () => {
    if (!phoneOrEmail) {
      return errorAlert("لطفا شماره تماس یا ایمیل را وارد نمایید");
    }

    const isValidEmail = validateEmail(phoneOrEmail);
    if (!isValidEmail) {
      return errorAlert("ایمیل یا شماره موبایل وارد شده معتبر نمی باشد");
    }

    if (!password) {
      return errorAlert("لطفا رمز عبور را وارد نمایید");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return errorAlert("رمز عبور به اندازه کافی قوی نیست");
    }

    const user = { email: phoneOrEmail, password };
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 200) {
      successAlert("با موفقیت لاگین شدید", "ورود به پنل کاربری");
      setPhoneOrEmail("");
      setPassword("");
    } else if (res.status === 422 || res.status === 401) {
      errorAlert("کاربری با این اطلاات یافت ");
    } else if (res.status === 419) {
      errorAlert("ایمیل یا رمز عبور معتبر نمی باشد");
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginWithPasword}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button onClick={showOtpForm} className={styles.btn}>
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
