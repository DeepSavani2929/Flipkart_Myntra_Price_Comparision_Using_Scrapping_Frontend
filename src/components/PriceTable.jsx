// const PriceTable = ({ data }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-x-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Detailed Price Comparison
//       </h2>

//       <table className="min-w-full text-sm border-collapse">
//         <thead className="sticky top-0 bg-gray-100 z-10">
//           <tr className="border-b text-gray-700">
//             <th className="text-left py-3 px-4">Product</th>
//             <th className="text-center py-3 px-4 text-pink-600">Myntra</th>
//             <th className="text-center py-3 px-4 text-blue-600">Flipkart</th>
//             <th className="text-center py-3 px-4">Cheapest</th>
//             <th className="text-center py-3 px-4 text-green-600">
//               Savings (₹)
//             </th>
//             <th className="text-center py-3 px-4">View</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((p, index) => (
//             <tr
//               key={`${p.globalProductKey}-${index}`}
//               className={`transition ${
//                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//               } hover:bg-gray-100`}
//             >
//               <td className="py-4 px-4 font-medium text-gray-800">
//                 {p.productName}
//               </td>

//               <td className="text-center py-4 px-4 font-semibold text-pink-600">
//                 ₹{p.myntraPrice}
//               </td>

//               <td className="text-center py-4 px-4 font-semibold text-blue-600">
//                 ₹{p.flipkartPrice}
//               </td>

//               <td className="text-center py-4 px-4">
//                 <span
//                   className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold ${
//                     p.myntraPrice < p.flipkartPrice
//                       ? "bg-pink-600"
//                       : "bg-blue-600"
//                   }`}
//                 >
//                   {p.myntraPrice < p.flipkartPrice
//                     ? "🛍️ Myntra"
//                     : "🛒 Flipkart"}
//                 </span>
//               </td>

//               <td className="text-center py-4 px-4">
//                 <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-lg">
//                   ₹{Math.abs(p.myntraPrice - p.flipkartPrice)}
//                 </span>
//               </td>

//               <td className="text-center py-4 px-4 space-x-2">
//                 <a
//                   href={p.myntraProductUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1 rounded-md"
//                 >
//                   Myntra
//                 </a>

//                 <a
//                   href={p.flipkartProductUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
//                 >
//                   Flipkart
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <p className="text-xs text-gray-500 mt-4">
//         Savings calculated as the difference between Myntra and Flipkart prices
//       </p>
//     </div>
//   );
// };

// export default PriceTable;


import { useState, useMemo } from "react";

const PriceTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let valueA;
      let valueB;

      if (sortConfig.key === "savings") {
        valueA = Math.abs(a.myntraPrice - a.flipkartPrice);
        valueB = Math.abs(b.myntraPrice - b.flipkartPrice);
      } else {
        valueA = a[sortConfig.key];
        valueB = b[sortConfig.key];
      }

      return sortConfig.direction === "asc"
        ? valueA - valueB
        : valueB - valueA;
    });
  }, [data, sortConfig]);

  const SortIcon = ({ column }) =>
    sortConfig.key === column ? (
      <span className="ml-1">
        {sortConfig.direction === "asc" ? "⬆️" : "⬇️"}
      </span>
    ) : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Detailed Price Comparison
      </h2>

      <table className="min-w-full text-sm border-collapse">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr className="border-b text-gray-700">
            <th className="text-left py-3 px-4">Product</th>

            <th
              className="text-center py-3 px-4 text-pink-600 cursor-pointer"
              onClick={() => handleSort("myntraPrice")}
            >
              Myntra <SortIcon column="myntraPrice" />
            </th>

            <th
              className="text-center py-3 px-4 text-blue-600 cursor-pointer"
              onClick={() => handleSort("flipkartPrice")}
            >
              Flipkart <SortIcon column="flipkartPrice" />
            </th>

            <th className="text-center py-3 px-4">Cheapest</th>

            <th
              className="text-center py-3 px-4 text-green-600 cursor-pointer"
              onClick={() => handleSort("savings")}
            >
              Savings (₹) <SortIcon column="savings" />
            </th>

            <th className="text-center py-3 px-4">View</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((p, index) => (
            <tr
              key={`${p.globalProductKey}-${index}`}
              className={`transition ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="py-4 px-4 font-medium text-gray-800">
                {p.productName}
              </td>

              <td className="text-center py-4 px-4 font-semibold text-pink-600">
                ₹{p.myntraPrice}
              </td>

              <td className="text-center py-4 px-4 font-semibold text-blue-600">
                ₹{p.flipkartPrice}
              </td>

              <td className="text-center py-4 px-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold ${
                    p.myntraPrice < p.flipkartPrice
                      ? "bg-pink-600"
                      : "bg-blue-600"
                  }`}
                >
                  {p.myntraPrice < p.flipkartPrice
                    ? "🛍️ Myntra"
                    : "🛒 Flipkart"}
                </span>
              </td>

              <td className="text-center py-4 px-4">
                <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-lg">
                  ₹{Math.abs(p.myntraPrice - p.flipkartPrice)}
                </span>
              </td>

              <td className="text-center py-4 px-4 space-x-2">
                <a
                  href={p.myntraProductUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1 rounded-md"
                >
                  Myntra
                </a>

                <a
                  href={p.flipkartProductUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                >
                  Flipkart
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-4">
        Click on price or savings headers to sort results
      </p>
    </div>
  );
};

export default PriceTable;
