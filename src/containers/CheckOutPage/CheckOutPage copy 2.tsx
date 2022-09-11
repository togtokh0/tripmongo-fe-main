import { Tab } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/outline";
import React, { FC, Fragment, useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import moment from "moment";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import axios from "../../axios";
import AuthContext from "context/AuthContext";
export interface CheckOutPageProps {
  className?: string;
}
type QuizParams = {
  id: string;
};
const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
  const { id } = useParams<QuizParams>();
  const auth: any = useContext(AuthContext);
  const [data, setdata] = useState<any>([]);
  const [qpay, setqpay] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api_ = await axios.get(`/order/${id}`);
      setdata(api_?.data?.data);
      // const api_2 = await axios.post(`/pay/qpay/create_simple/${id}`);
      // setqpay(api_2.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const array_sum = (array: any) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += parseInt(array[i]);
    }
    console.log(sum);
    return sum;
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={data.tour.featuredImage} />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {data.tour.name}
              </span>
              <span className="text-base font-medium mt-1 block">
                {data.tour.name}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400"></span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">
            {auth.site_data.үнийн_задаргаа}
          </h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{auth.site_data.нийт_үнэ} </span>
            <span>${data.amount}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>{auth.site_data.Одоо_төлөх}</span>
            <span>${data.income_amount}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          {auth.site_data.Confirm_and_payment}
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">
              {" "}
              {auth.site_data.Your_trip}
            </h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex justify-between space-x-5">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">
                  {auth.site_data.Date}
                </span>
                <span className="mt-1.5 text-lg font-semibold">
                  {moment(data.date).format("DD-MM-YYYY ")}
                </span>
              </div>
              <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
            </div>
            <div className="flex-1 p-5 flex justify-between space-x-5">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">
                  {auth.site_data.Guests}
                </span>
                <span className="mt-1.5 text-lg font-semibold">
                  {array_sum(data.travelers)} {auth.site_data.Guests}
                </span>
              </div>
              <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">{auth.site_data.Pay_with}</h3>
          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      Qpay
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 text-white"
                          : " text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <img className="w-8" src={visaPng} alt="" />
                      <img className="w-8" src={mastercardPng} alt="" />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <div className="w-14 border-b border-neutral-200 my-5"></div>
              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    {/* <div className="flex-shrink-0 w-full sm:w-30">
                      <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                        <NcImage
                          src={`data:image/png;base64,${qpay.qr_image}`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {qpay.urls.map((item: any) => (
                        <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                          <a href={item.link}>
                            <NcImage src={item.logo} />
                          </a>
                        </div>
                      ))}
                    </div> */}
                  </div>
                  {/* <div className="pt-4">
                    <ButtonPrimary></ButtonPrimary>
                  </div> */}
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                  <div className="pt-4">
                    <ButtonPrimary>
                      {" "}
                      {auth.site_data.Confirm_and_pay}
                    </ButtonPrimary>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CheckOutPage ${className} h-screen`}
      data-nc-id="CheckOutPage"
    >
      {loading ? (
        <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
          <div className="flex mt-16 justify-center items-center p-5">
            <ButtonPrimary loading>Loading...</ButtonPrimary>
          </div>
        </main>
      ) : (
        <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
            {renderMain()}
          </div>
          <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
        </main>
      )}
    </div>
  );
};

export default CheckOutPage;
