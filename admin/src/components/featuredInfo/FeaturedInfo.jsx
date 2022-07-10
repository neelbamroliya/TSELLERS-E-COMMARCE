import "./featuredInfo.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income")
        // console.log(res.data.sort((a, b) => a._id - b._id));
        setIncome(res.data.sort((a, b) => a._id - b._id))
        setPercentage(((res.data[1].total * 100) / res.data[0].total - 100).toFixed(2))
      } catch { }
    }
    getIncome()
  }, [])
  // console.log(percentage);
  // console.log(income[1].total);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {percentage} %
            {(percentage < 0)
              ? <ArrowDownwardIcon className="featuredIcon negative" />
              : <ArrowUpwardIcon className="featuredIcon" />
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
