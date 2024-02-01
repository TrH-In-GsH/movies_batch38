import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import AddProductReactQuery from "./AddProductReactQuery";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
interface IResponse {
    page: number;
    results: IProduct[];
    total_pages: number;
    total_results: number;
}

interface IProduct {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
  }

const API = "https://api.themoviedb.org/3/movie/popular";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const SingleProduct = ({
    product,
    // onClick,
}: {
    product: IProduct;
    // onClick: () => void;
}) => {
    return (
        <div className="movie-box">
                {/* <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt="" className="movie-box-img"/> */}
                <div className="box-text">
                    <h1 className="movie-tittle">{product.title}</h1>
                    <span className="movie-type">{product.release_date}</span>
                    <a href="#" className="watch-btn play-btn">
                    <div className="bx">
                    {/* <FiPlay className=""/> */}
                </div>
                    </a>
                </div>
            </div>  
    );
};

const ProductListAPIReactQuery = () => {
    /*Phân trang  */
    const [params] = useSearchParams();
    const page = params.get("page");
    const int_page = page ? parseInt(page) : 1;

    console.log(page);
    //?offset=0&limit=10 -- ?page=1
    //?offset=10&limit=10 --> ?page=2

    // Access the client
    const queryClient = useQueryClient();
    /*
      Fetch data và return kết quả cuối cùng
      */
    const getProducts = async (page: number) => {
        const limit = 10; //Số lượng sp / 1trang
        const offset = (page - 1) * limit; //công thức phân trang
        const result = await axios.get(
            `${API}?offset=${offset}&limit=${limit}`,
            {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
        );
        return result.data;
    };
    /**
     * 
     query = {data,isSuccess, isError, error, isLoading }
     data: chứa kết quả trả về
     */
    const query = useQuery<IResponse | null,Error>({
        queryKey: ["products", int_page], //key khong trung lap cua bo nho cache
        queryFn: () => getProducts(int_page),
    });

    const deleteProduct = async (productId: number) => {
        const result = await axios.delete(
            `${API}/${productId}`
        );
        return result.data;
    };

    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            // Invalidate and refetch
            //cập nhật lại bộ nhớ cache
            queryClient.invalidateQueries({ queryKey: ["products"] });
            //reset form
        },
        onError: (err) => {
            console.log("<<=== 🚀 err ===>>", err);
        },
    });

  

    return (
        <>
            <main className="my-10">
                {/* <AddProductReactQuery /> */}
                <h2>Product List React Query</h2>
                <div className="pagination flex gap-x-10">
                    <Link
                        className="rounded border border-slate-600 py-3 px-4"
                        to={`/products?page=1`}
                    >
                        1
                    </Link>
                    <Link
                        className="rounded border border-slate-600 py-3 px-4"
                        to={`/products?page=2`}
                    >
                        2
                    </Link>
                    <Link
                        className="rounded border border-slate-600 py-3 px-4"
                        to={`/products?page=3`}
                    >
                        3
                    </Link>
                </div>
                {query.isLoading && <div>Loading.......</div>}
                <div className="flex gap-3 flex-wrap justify-between">
                
               
                    {
                    query.data &&
                        query.data.results.length > 0 &&
                        query.data.results.map((product) => {
                            return (
                                <SingleProduct
                                    
                                    product={product}
                                />
                            );
                        })}
                </div>
            </main>
        </>
    );
};

export default ProductListAPIReactQuery;