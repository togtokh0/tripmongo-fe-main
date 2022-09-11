import React, { FC, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import GoogleMapReact from "google-map-react";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import TabFilters from "../TabFilters";
import Heading2 from "components/Heading/Heading2";
import ExperiencesCardH from "components/ExperiencesCardH/ExperiencesCardH";
import AuthContext from "context/AuthContext";
import axios from "../../../axios";
const DEMO_EXPERIENCES = DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 12);

export interface SectionGridHasMapProps {
  data: any;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({ data }) => {
  const auth: any = useContext(AuthContext);
  const params: any = useParams();
  const { id } = params;
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);

  const [r_data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data?._id && !id) {
          const api_ = await axios.get(`/tour`);
          setData(api_?.data?.data);
          setTimeout(function () {
            setLoading(false);
          }, 2000);
        } else {
          const api_ = await axios.get(`/tour/category/${data?._id || id}`);
          setData(api_?.data?.data);
          setTimeout(function () {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        setData(DEMO_EXPERIENCES);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const center_def = {
    lat: parseFloat(r_data[0]?.map?.lat),
    lng: parseFloat(r_data[0]?.map?.lng),
  };
  return (
    <div>
      {loading ? (
        <div>
          <div className="relative flex min-h-screen">
            <div className="w-screen h-[200px]  flex flex-col items-center justify-center">
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
        </div>
      ) : (
        <div className="relative flex min-h-screen">
          {/* CARDSSSS */}
          <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
            <Heading2
              heading={`${data.name} Tours`}
              subHeading={
                <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                  {data.count} tours
                </span>
              }
            />
            <div className="mb-8 lg:mb-11">
              <TabFilters />
            </div>
            <div className="grid grid-cols-1 gap-8">
              {r_data?.map((item: any) => (
                <div
                  key={item._id}
                  onMouseEnter={() => setCurrentHoverID((_) => item._id)}
                  onMouseLeave={() => setCurrentHoverID((_) => -1)}
                >
                  <ExperiencesCardH data={item} />
                </div>
              ))}
            </div>
            <div className="flex mt-16 justify-center items-center">
              {/* <Pagination /> */}
            </div>
          </div>

          <div
            className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>

          {/* MAPPPPP */}
          <div
            className={`xl:flex-grow xl:static xl:block ${
              showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
            }`}
          >
            {showFullMapFixed && (
              <ButtonClose
                onClick={() => setShowFullMapFixed(false)}
                className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
              />
            )}

            <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
              <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white shadow-xl z-10 rounded-2xl min-w-max">
                <Checkbox
                  className="text-xs xl:text-sm text-neutral-800"
                  name="xx"
                  label={auth.site_data.Search_as_I_move_the_map}
                />
              </div>
              {/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
                }}
                yesIWantToUseGoogleMapApiInternals
                defaultZoom={6}
                defaultCenter={center_def}
              >
                {r_data?.map((item: any) => (
                  <AnyReactComponent
                    isSelected={currentHoverID === item._id}
                    key={item.id}
                    lat={item.map.lat}
                    lng={item.map.lng}
                    experiences={item}
                  />
                ))}
              </GoogleMapReact>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionGridHasMap;
