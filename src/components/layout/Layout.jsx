import Navbar from "./Navbar";
import Footer from "./Footer";
import AIChatbot from "../ai/AIChatbot";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Layout;
