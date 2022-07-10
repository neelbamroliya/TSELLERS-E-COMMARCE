import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteEndUser, getEndUsers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch()
  const endUsers = useSelector(state => state.endUser.endUsers)
  // console.log(endUsers);

  useEffect(() => {
    getEndUsers(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteEndUser(id, dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://api-private.atlassian.com/users/5f8d01aa0b07fb006f126465/avatar?initials=public" alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Open</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={endUsers}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

