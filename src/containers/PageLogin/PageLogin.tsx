import React, { FC, useState, useContext } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "../../axios";
import AuthContext from "context/AuthContext";
import { useHistory } from "react-router-dom";
export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const auth: any = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const loginHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`/auth/login`, {
        email,
        password,
      })
      .then(async (result: any) => {
        setLoading(false);
        if (result.data.success) {
          await auth.HandleToken(result.data.token);
          await auth.HandleLogin(true);
          await auth.HandleUser(result.data.data);
          await history.push("/");
        } else {
          alert(result.data.message);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title> {auth.site_data.login}</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {auth.site_data.login}
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={loginHandler}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                {auth.site_data.Email_address}
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                {auth.site_data.Password}
                {/* <Link to="/forgot-pass" className="text-sm">
                  {auth.site_data.Forgot_password}
                </Link> */}
              </span>
              <Input
                type="password"
                className="mt-1"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <ButtonPrimary loading={loading} type="submit">
              {auth.site_data.Continue}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            {auth.site_data.New_user} {` `}
            <Link to="/signup">{auth.site_data.Create_an_account}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
