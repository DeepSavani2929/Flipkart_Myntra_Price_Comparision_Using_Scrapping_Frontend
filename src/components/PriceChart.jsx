import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PriceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Myntra vs Flipkart Price Comparison
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="productName" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="myntraPrice" fill="#ec4899" name="Myntra" />
          <Bar dataKey="flipkartPrice" fill="#2563eb" name="Flipkart" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
