import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import OrderList from "./pages/orderList/orderList";

function App() {
  const user = useSelector(state => state.user.currentUser)



  return (
    <Router>
      <Switch>

        <Route exact path="/">
          {user ?
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Home />
              </div>
            </> :
            <Redirect to="/login" />
          }
        </Route>
        <Route path="/users">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <UserList />
            </div>
          </>
        </Route>
        <Route path="/user/:userId">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <User />
            </div>
          </>
        </Route>
        <Route path="/newUser">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <NewUser />
            </div>
          </>
        </Route>
        <Route path="/products">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <ProductList />
            </div>
          </>
        </Route>
        <Route path="/orders">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <OrderList />
            </div>
          </>
        </Route>
        <Route path="/product/:productId">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Product />
            </div>
          </>
        </Route>
        <Route path="/newproduct">
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <NewProduct />
            </div>
          </>
        </Route>
        <Route path="/login">

          {user ? <Redirect to="/" /> : <Login />}
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
