import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

// 懶加載頁面組件
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Customization = lazy(() => import("./pages/Customization"));
const Visit = lazy(() => import("./pages/Visit"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CustomerProfile = lazy(() => import('./pages/CustomerProfile'));
const Checkout = lazy(() => import('./pages/Checkout'));
const UIShowcase = lazy(() => import('./pages/UIShowcaseMinimal'));

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/sova-home">
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/customization" element={<Customization />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<CustomerProfile />} />
            <Route path="/ui-showcase" element={<UIShowcase />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
