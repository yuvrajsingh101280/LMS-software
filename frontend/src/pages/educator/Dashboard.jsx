import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/students/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const { currency, isEducator } = useContext(Appcontext);

  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/educator/dashboard",
        { withCredentials: true }
      );
      if (data.success) {
        setDashboardData(data.dashboardData);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col item-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 item-center">
          <div className="flex item-center gap-4 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentsData.length}
              </p>

              <p className="text-base text-gray-500">Total Enrolments</p>
            </div>
          </div>
          <div className="flex item-center gap-4 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>

              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>
          <div className="flex item-center gap-4 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {currency}
                {dashboardData.totalEarnings}
              </p>

              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className=" font-medium text-lg pb-4">Latest Enrollements</h2>

          <div className="flex flex-col item-center max-w-4xl w-full overflow-hidden rounded-md bg-white border  border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b  border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold  text-center  hidden sm:table-cell">
                    #
                  </th>
                  <th className="font-semibold px-4 py-3">Student name</th>
                  <th className="font-semibold px-4 py-3">Course Title</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
