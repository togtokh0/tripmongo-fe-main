import React, { FC, ReactNode, useContext, useState, useEffect } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import AuthContext from "context/AuthContext";
import axios from "../../axios";
// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
}) => {
  const auth: any = useContext(AuthContext);
  heading = auth.site_data.special_tour;
  subHeading = auth.site_data.special_tour_text;
  const [data, setData] = useState(stayListings);
  const [a_tabs, seta_tabs] = useState(tabs);
  const [selceted, setSelceted] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api_menu_1 = await axios.get(`/tour`);
      const loc_data = await axios.get(`/fun/location`);
      seta_tabs(loc_data.data.data);
      setData(api_menu_1.data.data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);

  const renderCard = (stay: any) => {
    return <StayCard key={stay._id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        subHeading={subHeading}
        tabActive={selceted}
        tabs={a_tabs}
        heading={heading}
        onClickTab={(e) => {
          setSelceted(e);
        }}
      />
      {loading ? (
        <>
          <div className="w-fill h-[200px]  flex flex-col items-center justify-center">
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
        </>
      ) : (
        <div
          className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
        >
          {data
            .filter((name) => name.listingCategory.name.includes(selceted))
            .map((stay) => renderCard(stay))}
        </div>
      )}

      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>{auth.site_data.Show_me_more}</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
