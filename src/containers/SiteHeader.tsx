import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "components/Header/Header";
import { useLocation } from "react-router-dom";

import { PathName } from "routers/types";

let OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = [
  "/",
  "/listing-car-detail",
  "/listing-experiences-detail",
  "/listing-stay-detail",
];

const SiteHeader = () => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [isTopOfPage, setIsTopOfPage] = React.useState(window.pageYOffset < 5);
  const location = useLocation();
  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };
  useEffect(() => {
    // disconnect the observer
    if (!PAGES_HIDE_HEADER_BORDER.includes(location.pathname as PathName)) {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
      return;
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }
  }, [location]);

  const renderHeader = () => {
    let headerClassName = "shadow-sm dark:border-b dark:border-neutral-700";
    if (PAGES_HIDE_HEADER_BORDER.includes(location.pathname as PathName)) {
      headerClassName = isTopOfPage
        ? ""
        : "shadow-sm dark:border-b dark:border-neutral-700";
    }
    return <Header className={headerClassName} navType="MainNav1" />;
  };

  return (
    <>
      <Helmet>{/* <title>Chisfis || Booking React Template</title> */}</Helmet>
      {renderHeader()}
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  );
};

export default SiteHeader;
