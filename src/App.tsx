import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ServicesPage from "./pages/Services";
import CctvPage from "./pages/services/Cctv";
import LaptopPage from "./pages/services/Laptop";
import PrinterPage from "./pages/services/Printer";
import NetworkingPage from "./pages/services/Networking";
import WebDesignPage from "./pages/services/WebDesign";
import DigitalMarketingPage from "./pages/services/DigitalMarketing";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/cctv" element={<CctvPage />} />
      <Route path="/services/laptop" element={<LaptopPage />} />
      <Route path="/services/printer" element={<PrinterPage />} />
      <Route path="/services/networking" element={<NetworkingPage />} />
      <Route path="/services/web-design" element={<WebDesignPage />} />
      <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
