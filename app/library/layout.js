import PrivateUserRoute from "../components/PrivateUserRoute";
import TopBar from "../components/library/topBar/TopBar";

const Layout = ({ children }) => {
  return (
    <PrivateUserRoute>
      <div>
        <TopBar />
        {children}
      </div>
    </PrivateUserRoute>
  );
}

export default Layout;
