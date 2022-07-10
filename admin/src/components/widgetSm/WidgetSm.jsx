import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import { userRequest } from "../../requestMethods"
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)

      } catch (err) { }
    }
    getUsers()
  }, [])


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user => (
          <li className="widgetSmListItem" key={user._id}>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <Link to={"/user/" + user._id} style={{ textDecoration: "none" }}>
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
