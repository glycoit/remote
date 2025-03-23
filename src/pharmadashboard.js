import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, TrendingUp, Bell, Warehouse, Truck, AlertTriangle, ShieldCheck, Globe, CheckCircle, FileText } from "lucide-react";
import { parse } from "json2csv"; // Import json2csv for generating CSV

const clients = ["MediCare Ltd.", "PharmaTech Inc.", "BioGen Solutions", "HealWell Pharma", "NovaMed Group"];

const sampleData = [
  { name: "Jan", stock: 200, demand: 180 },
  { name: "Feb", stock: 170, demand: 190 },
  { name: "Mar", stock: 160, demand: 210 },
  { name: "Apr", stock: 220, demand: 200 },
  { name: "May", stock: 180, demand: 220 },
];

export default function PharmaDashboard() {
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [erpValue, setErpValue] = useState("ERP Dynamics: Stock - 500,000 units");

 // Function to generate and download CSV
  const generateCSV = () => {
    const csv = parse(sampleData);  // Convert sampleData to CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv"; // Name of the file to download
    link.click(); // Trigger the download
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Client Selection */}
      <div className="col-span-3">
        <div className="p-4 flex flex-col items-center">
          <h3 className="text-xl font-bold">Select Pharma Client</h3>
          <select className="mt-2 p-2 border rounded" onChange={(e) => setSelectedClient(e.target.value)}>
            {clients.map((client) => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>
          <p className="mt-2 text-gray-600">Currently viewing: {selectedClient}</p>
        </div>
      </div>

      {/* Overview divs */}
      <div><div className="flex items-center p-4"><Package className="text-blue-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Current Stock</h3><p className="text-gray-500">500,000 units</p></div></div></div>
      <div><div className="flex items-center p-4"><TrendingUp className="text-green-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Projected Demand</h3><p className="text-gray-500">520,000 units</p></div></div></div>
      <div><div className="flex items-center p-4"><Bell className="text-red-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Alerts</h3><p className="text-gray-500">2 Low Stock, 1 Overstock</p></div></div></div>

      {/* Demand Forecasting Chart */}
      <div className="col-span-2"><div className="p-4"><h3 className="text-xl font-bold mb-4">AI Demand Forecasting</h3><ResponsiveContainer width="100%" height={300}><LineChart data={sampleData}><XAxis dataKey="name" stroke="#ccc" /><YAxis stroke="#ccc" /><Tooltip /><Line type="monotone" dataKey="stock" stroke="#007bff" strokeWidth={2} /><Line type="monotone" dataKey="demand" stroke="#28a745" strokeWidth={2} /></LineChart></ResponsiveContainer></div></div>

      {/* ERP Data */}
      <div className="col-span-3"><div className="p-4"><h3 className="text-xl font-bold">ERP Dynamics Data</h3><input className="mt-2 p-2 w-full border rounded" type="text" value={erpValue} onChange={(e) => setErpValue(e.target.value)} /></div></div>

      {/* Supply Chain Monitoring */}
      <div><div className="flex items-center p-4"><Warehouse className="text-purple-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Supplier Tracking</h3><p className="text-gray-500">Supplier: XYZ Pharma | Last Shipment: 2 Days Ago</p></div></div></div>
      <div><div className="flex items-center p-4"><Truck className="text-orange-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Dispatch Status</h3><p className="text-gray-500">Next Shipment: 5,000 units | ETA: 3 Days</p></div></div></div>
      <div><div className="flex items-center p-4"><AlertTriangle className="text-yellow-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Supply Chain Alerts</h3><p className="text-gray-500">Potential disruption detected in Region X</p></div></div></div>
      <div><div className="flex items-center p-4"><ShieldCheck className="text-blue-600" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Regulatory Compliance</h3><p className="text-gray-500">All shipments comply with DSCSA & FDA standards</p></div></div></div>
      <div><div className="flex items-center p-4"><Globe className="text-green-500" size={32} /><div className="ml-4"><h3 className="text-xl font-bold">Global Supply Visibility</h3><p className="text-gray-500">Monitoring 15+ key pharmaceutical suppliers</p></div></div></div>

      {/* Action buttons */}
      <div><div className="p-4 flex flex-col items-center"><CheckCircle className="text-green-500 mb-2" size={32} /><h3 className="text-lg font-bold">Reorder Recommendations</h3><p className="text-gray-500 text-center">AI suggests ordering 10,000 units of Medication X.</p><button className="mt-4">Approve Order</button></div></div>

      {/* Generate Report Button */}
      <div className="col-span-3">
        <div className="flex justify-center">
          <button onClick={generateCSV}>Generate Report</button>
        </div>
      </div>
    </div>
  );
}
