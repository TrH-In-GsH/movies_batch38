import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ProductPage from "./pages/ProductPage";
import DefaultLayout from "./layouts/DefaultLayout";
import NoPage from "./pages/NoPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CustomerPage from "./pages/CustomerPage";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerOrders from "./pages/CustomerOrders";
import ProductDetailPage from "./pages/ProductDetailPage";
import PopularPage from "./pages/PopularPage";
import NowPlayingPage from "./pages/NowPlayingPage";
import MoviesDetailPage from "./pages/MoviesDetailPage";

// Create a client
const queryClient = new QueryClient();

function App() {
    console.log("App render");
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* 
          Cứ mỗi URL bạn cần định nghĩa 1 thẻ Route 
          Trong đó:
          - path: là đường dẫn URL
          - element là component bạn muốn hiển thị tương ứng với path
          */}
                    <Route path="/CV-homework/" element={<DefaultLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="popular" element={<PopularPage />} />
                        <Route path=":id" element={<MoviesDetailPage />} />
                        {/* 
            :slug ==> Đại diện cho phần chuỗi phía sau blog/
            */}
                        <Route path="now_playing" element={<NowPlayingPage />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;