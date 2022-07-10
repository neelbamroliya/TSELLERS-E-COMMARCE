import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userstats, setUserstats] = useState([])
  const months = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"], []
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats")
        res.data.map(item => (
          setUserstats(prev =>
            [
              ...prev,
              { name: months[item._id - 1], "Active User": item.total }
            ]
          )
        ))
      } catch { }
    }
    getStats()
  }, [months])
  // console.log(userstats);
  // console.log(userstats.sort((a, b) => months.indexOf[a.name] - months.indexOf[b.name]));
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userstats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
