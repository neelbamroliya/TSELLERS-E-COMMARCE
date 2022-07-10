import React from "react";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";


export default function Topbar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user.currentUser)

  const handleClick = (e) => {
    e.preventDefault()
    logout(dispatch, user)
    history.push("/login")
    // console.log("pushed");
  }


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <button onClick={handleClick}>Logout</button>
          </div>
          <img src="https://previews.123rf.com/images/bsd555/bsd5552003/bsd555200302924/143157301-admin-support-blue-rgb-color-icon-virtual-assistant-online-consultant-manager-managing-and-assistanc.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
