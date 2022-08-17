import React, { useState, useEffect } from "react";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import SectionAds from "./SectionAds";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import axios from "../../axios";
// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//
const BlogPage: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_menu_1 = await axios.get(`/news`);
        setData(api_menu_1.data.data);
        setLoading(false);
      } catch (error) {
        setData(MAGAZINE1_POSTS);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <Helmet>
        <title>Blog </title>
      </Helmet>
      {loading ? (
        <>
          {" "}
          <div className="w-screen h-screen  flex flex-col items-center justify-center">
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
        <>
          {" "}
          {/* ======== BG GLASS ======== */}
          <BgGlassmorphism />
          {/* ======== ALL SECTIONS ======== */}
          {/* ======= START CONTAINER ============= */}
          <div className="container relative">
            {/* === SECTION 1 === */}
            <div className="pt-12 pb-16 lg:pb-28">
              <SectionMagazine5 posts={data} />
            </div>

            {/* === SECTION 8 === */}
            <SectionLatestPosts className="py-16 lg:py-28" posts={data} />

            {/* === SECTION 1 === */}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
