import React, { FC, useContext } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";
import rightImg from "images/SVG-subcribe2.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";
import AuthContext from "context/AuthContext";
export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const auth: any = useContext(AuthContext);
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">
          {auth.site_data.Join_our_newsletter} 🎉
        </h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          {auth.site_data.Join_our_newsletter_desc}
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {auth.site_data.Join_our_newsletter_1}
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {auth.site_data.Join_our_newsletter_1}
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder={auth.site_data.Enter_your_email}
            type="email"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
