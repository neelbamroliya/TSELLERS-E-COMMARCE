import "./orderList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getOrders, deleteOrder, approveOrder } from "../../redux/apiCalls";

export default function OrderList() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order.orders)
  useEffect(() => {
    getOrders(dispatch)
  }, [dispatch])

  const handleClick = (orderId) => {
    approveOrder(dispatch, orderId)
  }

  const disabled = (status) => {
    if (status === "approved") {
      return true
    }
  }

  const handleDelete = (id) => {
    deleteOrder(id, dispatch)
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "order",
      headerName: "Order",
      width: 360,
      renderCell: (params) => {
        // console.log(params.row);
        return (
          <div className="productListItem">
            {params.row.products.map(item => (
              <>
                <img className="productListImg" src={item.img} alt="" />
                {item.title}
              </>
            ))
            }
          </div>
        );
      },
    },
    { field: "status", headerName: "Status", width: 160 },
    {
      field: "total",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        // console.log("params", params);
        return (
          <>
            <button className={params.row.status === "approved" ? "productListEditdisabled" : "productListEdit"} disabled={() => disabled(params.row.status)} onClick={() => handleClick(params.row._id)}>Approve</button>

            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          getRowId={row => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </>
  );

}