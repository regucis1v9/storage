import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '../css/styles.css';
import 'jspdf-autotable';


function Reports() {
  const [reportType, setReportType] = useState('');

  const fetchReportData = async () => {
    try {
      const response = await fetch('http://localhost:8888/storageAPI/generateReport.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ reportType }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dataa');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const handleGenerateReport = async () => {
    const reportData = await fetchReportData();

    const pdf = new jsPDF();
    const margin = 5;

    pdf.text(`${reportType} Report`, 20, 20);

    reportData.forEach((order, index) => {
      if (index > 0) {
        pdf.addPage(); // Add a new page for each order after the first one
      }

      const tableData = [
        ['ID', 'Supplier', 'Color', 'Size', 'Type', 'Amount', 'Order Date', 'Delivery Date', 'Status', 'Shelf'],
        [order.id, order.supplier, order.color, order.size, order.type, order.amount, order.orderDate, order.deliveryDate, order.status, order.shelf]
      ];

      pdf.autoTable({
        startY: 30, // Set the starting y position for the table
        head: [tableData[0]],
        body: tableData.slice(1),
        margin: { top: margin }
      });

      pdf.text('', 20, pdf.autoTable.previous.finalY + margin); // Add some space after the table
    });

    pdf.save(`${reportType}_report.pdf`);
  };

  return (
    <div className='container-marRep'>
      <div className="topBar-mar"><span className='spanTop-mar'>STORAGE</span></div>
      <div className='reportForm'>
        <div className='radio-group'>
          <label>
            <input
              type='radio'
              value='daily'
              checked={reportType === 'daily'}
              onChange={() => setReportType('daily')}
            />
            DAILY REPORT
          </label>
          <label>
            <input
              type='radio'
              value='weekly'
              checked={reportType === 'weekly'}
              onChange={() => setReportType('weekly')}
            />
            Weekly Report
          </label>
          <label>
            <input
              type='radio'
              value='monthly'
              checked={reportType === 'monthly'}
              onChange={() => setReportType('monthly')}
            />
            Monthly Report
          </label>
        </div>
        <button className='submit-button' onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default Reports;
