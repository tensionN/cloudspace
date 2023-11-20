import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import {useUser} from "./modules/users/store";
import {useEffect, useState} from "react";
import {auth} from "./actions/user";
import Cloud from "./components/cloud/Cloud";
import Loader from "./components/loader/Loader";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const ProtectedRoute = ({isAuth, redirectPath = '/login', children}) => {
    if (!isAuth) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

function App() {
    const {isAuth, setUser, logoutUser} = useUser(state => ({
        isAuth: state.isAuth,
        setUser: state.setUser,
        logoutUser: state.logoutUser
    }));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        auth().then(user => {
            if (user === undefined) {
                logoutUser()
                navigate("/login")
                setLoading(false)
            } else {
                setUser(user);
                navigate("/")
                setLoading(false)
            }
        })
    }, [isAuth]);

  return (
    <div className="App">
            <Navbar/>
        {
            loading ? <Loader/> : (
                <div className="container">
                    <Routes>
                        <Route element={<ProtectedRoute isAuth={!isAuth}/> }>

                            <Route path="login" element={<Login/>} />
                            <Route path="register" element={<Register/>} />
                        </Route>
                        <Route element={<ProtectedRoute isAuth={isAuth} redirectPath="/"/>}>
                            <Route path="about" element={<div>About</div>}/>
                            <Route index element={<Cloud/>} />
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                </div>
            )
        }


    </div>
  );
}
export default App;