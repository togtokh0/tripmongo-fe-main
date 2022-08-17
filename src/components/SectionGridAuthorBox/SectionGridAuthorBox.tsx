import CardAuthorBox from "components/CardAuthorBox/CardAuthorBox";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import Heading from "components/Heading/Heading";
import { DEMO_AUTHORS } from "data/authors";
import { AuthorType } from "data/types";
import React, { FC, useEffect, useState, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import axios from "../../axios";
import AuthContext from "context/AuthContext";
export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
}
const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);

console.log("auther", JSON.stringify(DEMO_DATA));
const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors = DEMO_DATA,
  boxCard = "box1",
}) => {
  const auth: any = useContext(AuthContext);
  const [data, setData] = useState(authors);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_menu_1 = await axios.get(`/author`);
        setData(api_menu_1.data.data);
        setloading(false);
      } catch (error) {
        setData(DEMO_DATA);
        setloading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc={auth.site_data.author_desc} isCenter>
        {auth.site_data.author_title}
      </Heading>
      {loading ? (
        <div className="flex mt-16 justify-center items-center">
          <div className="h-[200px] flex flex-col items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 ">
          {data.map((author, index) =>
            boxCard === "box2" ? (
              <CardAuthorBox2 key={author.id} author={author} />
            ) : (
              <CardAuthorBox
                index={index < 3 ? index + 1 : undefined}
                key={author.id}
                author={author}
              />
            )
          )}
        </div>
      )}
      {!loading && (
        <div className="mt-16 flex items-center justify-center space-x-5">
          <ButtonSecondary>{auth.site_data.Show_me_more} </ButtonSecondary>
          <ButtonPrimary>{auth.site_data.Become_a_host}</ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default SectionGridAuthorBox;
