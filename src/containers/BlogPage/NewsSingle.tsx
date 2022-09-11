import { DEMO_POSTS } from "data/posts";
import { PostDataType } from "data/types";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Comment from "shared/Comment/Comment";
import NcImage from "shared/NcImage/NcImage";
import SocialsList from "shared/SocialsList/SocialsList";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import AuthContext from "context/AuthContext";
import axios from "../../axios";
const BlogSingle = () => {
  const auth: any = useContext(AuthContext);
  const params: any = useParams();
  const { id } = params;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const api = await axios.get(`/news/${id}`);
          setData(api?.data?.data);
          setLoading(false);
        } else {
          const api = await axios.get(`/news`);
          setData(api?.data?.data[0]);
          setLoading(false);
        }
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            {data.title}
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            {data.desc}
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
                imgUrl={data?.author?.avatar}
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a
                    className="block font-semibold"
                    href="/ncmaz/author/the-demo-author-slug"
                  >
                    {data?.author?.displayName}
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {data?.author?.date}
                  </span>
                  <span className="mx-2 font-semibold">·</span>
                  {/* <span className="text-neutral-700 dark:text-neutral-300">
                    6 min read
                  </span> */}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
      >
        <div dangerouslySetInnerHTML={{ __html: data.body }}></div>
      </div>
    );
  };

  const renderAuthor = () => {
    return (
      <div className="max-w-screen-md mx-auto ">
        <div className="nc-SingleAuthor flex">
          <Avatar
            sizeClass="w-11 h-11 md:w-24 md:h-24"
            imgUrl={data?.author?.avatar}
          />
          <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              {data?.author?.displayName}
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      <Helmet>
        <title>Single Blog || Booking React Template</title>
      </Helmet>
      {loading ? (
        <>
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
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          {renderHeader()}
          <NcImage
            className="w-full rounded-xl"
            containerClassName="container my-10 sm:my-12 "
            src={data.featuredImage}
          />
          <div className="nc-SingleContent container space-y-10">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSingle;
