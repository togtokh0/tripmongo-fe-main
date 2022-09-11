import React, { FC, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "./components/SectionHeroArchivePage";
import SectionGridHasMap from "./components/SectionGridHasMap";
import { Helmet } from "react-helmet";
import AuthContext from "context/AuthContext";
import axios from "../../axios";
export interface ListingExperiencesMapPageProps {
  className?: string;
}

const ListingExperiencesMapPage: FC<ListingExperiencesMapPageProps> = ({
  className = "",
}) => {
  const auth: any = useContext(AuthContext);
  const params: any = useParams();
  const { id } = params;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const api = await axios.get(`/category/${id}`);
          setData(api?.data?.data);
          setLoading(false);
        } else {
          const api = await axios.get(`/category`);
          setData(api?.data?.data[0]);
          setLoading(false);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div
      className={`nc-ListingExperiencesMapPage relative ${className}`}
      data-nc-id="ListingExperiencesMapPage"
    >
      <Helmet>
        <title>{data.name || ""}</title>
      </Helmet>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage
          currentPage="Experiences"
          currentTab="Experiences"
          listingType={
            <>
              <i className="text-2xl las la-umbrella-beach"></i>
              <span className="ml-2.5">{data.count || 0} </span>
            </>
          }
          data={data}
        />
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap data={data} />
      </div>
    </div>
  );
};

export default ListingExperiencesMapPage;
