import "./user.css";
import { useLocation } from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useSelector } from "react-redux"

export default function User() {
  const location = useLocation()
  const endUserId = location.pathname.split("/")[2]

  const endUser = useSelector(state => state.endUser.endUsers.find(endUser => endUser._id === endUserId))
  const date = endUser.createdAt.split("T")[0]
  // console.log(date);


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://api-private.atlassian.com/users/5f8d01aa0b07fb006f126465/avatar?initials=public"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{endUser.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{endUser.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowTitle" style={{ marginLeft: "5px" }}>Created At:</span>
              <span className="userShowInfoTitle">{date}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{endUser.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
