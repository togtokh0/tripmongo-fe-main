import React, { FC } from "react";
import ExperiencesSearchForm from "./ExperiencesSearchForm";

export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
  };
  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      <div className="pt-10"></div>
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
