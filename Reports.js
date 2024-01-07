import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '../css/styles.css';

function Reports() {
  const [reportType, setReportType] = useState('');

  const fetchReportData = async () => {
    try {
      const response = await fetch('http://localhost/api/generateReport.php', {
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
    const lineHeight = 10;
    const margin = 5; 
  
    pdf.text(`${reportType} Report`, 20, 20);
  
    reportData.forEach((order, index) => {
      const yPosition = 30 + index * (lineHeight * 11 + margin);
  
      pdf.text(`Order ${index + 1}:`, 20, yPosition);
      pdf.text(`ID: ${order.id}`, 20, yPosition + lineHeight);
      pdf.text(`Supplier: ${order.supplier}`, 20, yPosition + 2 * lineHeight);
      pdf.text(`Color: ${order.color}`, 20, yPosition + 3 * lineHeight);
      pdf.text(`Size: ${order.size}`, 20, yPosition + 4 * lineHeight);
      pdf.text(`Type: ${order.type}`, 20, yPosition + 5 * lineHeight);
      pdf.text(`Amount: ${order.amount}`, 20, yPosition + 6 * lineHeight);
      pdf.text(`Order Date: ${order.orderDate}`, 20, yPosition + 7 * lineHeight);
      pdf.text(`Delivery Date: ${order.deliveryDate}`, 20, yPosition + 8 * lineHeight);
      pdf.text(`Status: ${order.status}`, 20, yPosition + 9 * lineHeight);
      pdf.text(`Shelf: ${order.shelf}`, 20, yPosition + 10 * lineHeight);
      pdf.text('', 20, yPosition + 11 * lineHeight);
    });
  
    pdf.save(`${reportType}_report.pdf`);
  };
  
  
  

  return (
    <div className='container-marRep'>
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
