import React, { useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];
function BarChartDashboard({ budgetDetails }) {

  const customTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border rounded p-2 shadow text-sm">
        <p className="font-bold">{data.name}</p>
        <p>Total Amount: ₹{data.amount}</p>
        <p>Total Spend: ₹{data.totalSpend}</p>
      </div>
    );
  }

  return null;
  }

  const chartFormat = {
    "Bar Chart": (
      <BarChart
        width={400}
        height={300}
        data={budgetDetails || []}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" fill="#8884d8" />
        <Bar dataKey="amount" fill="#00C49F" />
      </BarChart>
    ),
    "Pie Chart": (
      <PieChart width={400} height={300}>
        <Tooltip content={customTooltip} />
        <Legend />
        <Pie
          data={budgetDetails || []}
          dataKey="amount"
          // dataKey2="totalSpend"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {(budgetDetails || []).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    ),
  };

  const [selectFormat, setSelectFormat] = useState("Bar Chart");
  const [open, setOpen] = useState(false);
  return (
    <div className="border-4 rounded-lg p-5">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg flex justify-between">Activity</h2>{" "}
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            {selectFormat} ▼
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
              {Object.keys(chartFormat).map((format) => (
                <button
                  key={format}
                  onClick={() => {
                    setSelectFormat(format);
                    setOpen(false);
                  }}
                  {...console.log(format)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectFormat === format ? "btn-active" : ""
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="">{chartFormat[selectFormat]}</div>
    </div>
  );
}

export default BarChartDashboard;

{
  /*
      <BarChart
        width={400}
        height={400}
        data={budgetDetails || []}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" />
        <Bar />
      </BarChart>
         */
}
