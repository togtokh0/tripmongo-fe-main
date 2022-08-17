import React, { FC, useContext } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import AuthContext from "context/AuthContext";
export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  const auth: any = useContext(AuthContext);
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          {auth.site_data.select_home_1.start}
        </span>
        <h2 className="font-semibold text-4xl mt-5">
          {auth.site_data.select_home_1.h1}
        </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name={auth.site_data.select_home_1.cat_1_span} />
            <span className="block text-xl font-semibold">
              {auth.site_data.select_home_1.cat_1_header}
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              {auth.site_data.select_home_1.cat_1_text}
            </span>
          </li>
          <li className="space-y-4">
            <Badge
              color="green"
              name={auth.site_data.select_home_1.cat_2_span}
            />
            <span className="block text-xl font-semibold">
              {auth.site_data.select_home_1.cat_3_header}
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              {auth.site_data.select_home_1.cat_2_text}
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name={auth.site_data.select_home_1.cat_3_span} />
            <span className="block text-xl font-semibold">
              {auth.site_data.select_home_1.cat_3_header}
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              {auth.site_data.select_home_1.cat_3_text}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
