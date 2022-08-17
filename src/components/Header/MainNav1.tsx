import React, { FC, useContext } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import AvatarDropdown from "./AvatarDropdown";
import AuthContext from "context/AuthContext";
import LangDropdown from "./LangDropdown";
export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const auth: any = useContext(AuthContext);
  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
        <div className=" md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          <Logo />
          <Navigation />
        </div>

        <div className=" md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-1">
            <SwitchDarkMode />
            <SearchDropdown />
            <LangDropdown />
            {auth.logged && (
              <>
                <div className="px-1" />
                <AvatarDropdown />
              </>
            )}
            {!auth.logged && (
              <>
                <div className="px-1" />
                <ButtonPrimary href="/login">
                  {auth.site_data.Signup}
                </ButtonPrimary>
              </>
            )}
          </div>
          <div className="flex xl:hidden items-center justify-end ">
            <SwitchDarkMode />
            {auth.logged && (
              <>
                {" "}
                <AvatarDropdown />
              </>
            )}

            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
