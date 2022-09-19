import React, { FC, useContext } from "react";
import { useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import AuthContext from "context/AuthContext";
import axios from "../../axios";
export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  const auth: any = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/media`)
        .then(async (result: any) => {
          if (result.data.success) {
            setdata(result.data.data[0]);
            setLoading(false);
          }
        })
        .catch((err: any) => {});
    };
    fetchData();
  }, []);
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading desc={auth.site_data.About_text}>
        {auth.site_data.About_h1}
      </Heading>
      <div className="grid md:grid-cols-1 gap-6 lg:grid-cols-1 xl:gap-8">
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
          {/* <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
            {auth.site_data.About_h2}
          </h3> */}
          {!loading && (
            <span
              className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400"
              dangerouslySetInnerHTML={{
                __html: auth.lang == "en" ? data.about_en : data.about_mon,
              }}
            ></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionStatistic;
