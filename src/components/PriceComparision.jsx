import { useEffect, useState } from "react";
import { normalizeComparisonData } from "../utils/NormalizeData.jsx";
import PriceChart from "../components/PriceChart";
import PriceTable from "../components/PriceTable";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/axiosInterceptor";

const PriceComparison = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductsDataForPriceComparision();
  }, []);

  const getProductsDataForPriceComparision = async () => {
    try {
      const res = await api.get("/prices/comparePrices");

      if (res.data?.success) {
        console.log(res.data.data);
        const normalized = normalizeComparisonData(res.data.data);
        console.log(normalized);
        setData(normalized);
      } else {
        toast.error(res.data?.message || "Failed to fetch price data");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Server error occurred"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Jeans Price Comparison</h1>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {data.length > 0 && (
        <>
          <PriceChart data={data} />
          <PriceTable data={data} />
        </>
      )}
    </div>
  );
};

export default PriceComparison;
