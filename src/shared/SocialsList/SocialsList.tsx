import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import svgImg from "./t.svg";
export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}
let socialsDemo: SocialType[] = [
  { name: "Facebook", icon: "lab la-facebook-square", href: "#" },
  { name: "Twitter", icon: "lab la-twitter", href: "#" },
  { name: "Youtube", icon: "lab la-youtube", href: "#" },
  {
    name: "Instagram",
    icon: "lab la-instagram",
    href: "#",
  },
];
if (document.location.host.includes("holy")) {
  socialsDemo = [
    {
      name: "Facebook",
      icon: "lab la-facebook-square",
      href: "https://www.facebook.com/Genco.Tour.Bureau",
    },
    { name: "Twitter", icon: "lab la-twitter", href: "#" },
    {
      name: "Youtube",
      icon: "lab la-youtube",
      href: "https://www.youtube.com/",
    },
    {
      name: "Instagram",
      icon: "lab la-instagram",
      href: "https://www.instagram.com/",
    },
  ];
} else {
  socialsDemo = [
    {
      name: "Kakao talk",
      icon: "svg",
      href: "https://center-pf.kakao.com/_lLxojT",
    },
    {
      name: "Youtube",
      icon: "lab la-youtube",
      href: "https://www.youtube.com/channel/UCyC-YjUdS2DMEGJuFjcTwlw",
    },
    {
      name: "Instagram",
      icon: "lab la-instagram",
      href: "https://www.instagram.com/skytoursmongolia/",
    },
  ];
}

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          {item.icon == "svg" ? (
            <>
              <img
                src={svgImg}
                alt=""
                className=" h-[16px] w-[16px] mt-[3px]"
              />
            </>
          ) : (
            <i className={item.icon}></i>
          )}
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
