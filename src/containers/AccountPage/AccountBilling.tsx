import React, { useContext, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import AuthContext from "context/AuthContext";
import axios from "../../axios";
import moment from "moment";
const AccountBilling = () => {
  const auth: any = useContext(AuthContext);
  const [data, setdata] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const api_ = await axios.get(`/order/find/my`);
      setdata(api_?.data?.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8  h-screen">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">{auth.site_data.orders}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="">
            <div className="mt-4 -mb-3">
              <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 w-full">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
                <div className="relative rounded-xl overflow-auto">
                  <div className="shadow-sm overflow-hidden my-8">
                    <table className="border-collapse table-auto w-full text-sm">
                      <thead>
                        <tr>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            _id
                          </th>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            amount
                          </th>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            date
                          </th>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            travelers
                          </th>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            income_amount
                          </th>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            pay_type
                          </th>
                          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            tour
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800">
                        {!loading &&
                          data.map((item: any) => (
                            <tr key={item._id}>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                <a
                                  href={`../../checkout/${item._id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Link
                                </a>
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                {item.amount}$
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                {moment(item.date).format("DD-MM-YYYY")}
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                <p>Насанд хүрсэн : {item.travelers[0]}</p>
                                <p>Өсвөр нас : {item.travelers[1]}</p>
                                <p>Хүүхэд : {item.travelers[2]}</p>
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                {item.income_amount}$
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                {item.pay_type}
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                {item.user_email}
                              </td>
                              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                <a
                                  href={`../../listing-detail/${item?.tour?._id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item?.tour?.title}
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountBilling;
