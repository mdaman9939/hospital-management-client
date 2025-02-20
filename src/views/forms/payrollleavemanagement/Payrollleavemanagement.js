import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PayrollLeaveManagement = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [payrollDetails, setPayrollDetails] = useState({
    employeeId: '',
    employeeName: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    totalSalary: '',
    leaveType: '',
    leaveStartDate: '',
    leaveEndDate: '',
    leaveReason: '',
  })

  const [payrollRecords, setPayrollRecords] = useState([])
  const [employeeRecords, setEmployeeRecords] = useState([])

  // Fetch payroll records from the backend
  // Fetch payroll records from the backend
  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch(`https://amankaserver.vercel.app/api/payroll-leave`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setPayrollRecords(data) // Directly use the array data
        } else {
          setPayrollRecords([])
        }
      })
      .catch((error) => {
        console.error('Error fetching payroll records:', error)
        setPayrollRecords([]) // Handle fetch errors
      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPayrollDetails((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotalSalary = () => {
    const totalSalary =
      parseFloat(payrollDetails.basicSalary || 0) +
      parseFloat(payrollDetails.allowances || 0) -
      parseFloat(payrollDetails.deductions || 0)
    setPayrollDetails((prev) => ({ ...prev, totalSalary: totalSalary.toFixed(2) }))
  }

  const submitPayrollLeaveDetails = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`https://amankaserver.vercel.app/api/payroll-leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payrollDetails),
      })

      if (response.ok) {
        const newRecord = await response.json()
        setPayrollRecords((prev) => [...prev, newRecord.data])
        setPayrollDetails({
          employeeId: '',
          employeeName: '',
          basicSalary: '',
          allowances: '',
          deductions: '',
          totalSalary: '',
          leaveType: '',
          leaveStartDate: '',
          leaveEndDate: '',
          leaveReason: '',
        })
      } else {
        alert('Error saving payroll and leave record')
      }
    } catch (error) {
      console.error('Error submitting payroll leave details:', error)
      alert('An error occurred while saving the record')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Payroll and Leave Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="employeeId">Employee ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={payrollDetails.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="employeeName">Employee Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={payrollDetails.employeeName}
                    onChange={handleInputChange}
                    placeholder="Enter employee name"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="basicSalary">Basic Salary</CFormLabel>
                  <CFormInput
                    type="number"
                    id="basicSalary"
                    name="basicSalary"
                    value={payrollDetails.basicSalary}
                    onChange={handleInputChange}
                    placeholder="Enter basic salary"
                    onBlur={calculateTotalSalary}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="allowances">Allowances</CFormLabel>
                  <CFormInput
                    type="number"
                    id="allowances"
                    name="allowances"
                    value={payrollDetails.allowances}
                    onChange={handleInputChange}
                    placeholder="Enter allowances"
                    onBlur={calculateTotalSalary}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="deductions">Deductions</CFormLabel>
                  <CFormInput
                    type="number"
                    id="deductions"
                    name="deductions"
                    value={payrollDetails.deductions}
                    onChange={handleInputChange}
                    placeholder="Enter deductions"
                    onBlur={calculateTotalSalary}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="totalSalary">Total Salary</CFormLabel>
                  <CFormInput
                    type="text"
                    id="totalSalary"
                    name="totalSalary"
                    value={payrollDetails.totalSalary}
                    disabled
                    placeholder="Calculated total salary"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="leaveType">Leave Type</CFormLabel>
                  <CFormSelect
                    id="leaveType"
                    name="leaveType"
                    value={payrollDetails.leaveType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="vacation">Vacation Leave</option>
                    <option value="maternity">Maternity Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="leaveStartDate">Leave Start Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="leaveStartDate"
                    name="leaveStartDate"
                    value={payrollDetails.leaveStartDate}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="leaveEndDate">Leave End Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="leaveEndDate"
                    name="leaveEndDate"
                    value={payrollDetails.leaveEndDate}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="leaveReason">Leave Reason</CFormLabel>
                  <CFormTextarea
                    id="leaveReason"
                    name="leaveReason"
                    value={payrollDetails.leaveReason}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter reason for leave"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol md={2}>
                  <CButton color="primary" onClick={submitPayrollLeaveDetails}>
                    Save Record
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Data Table to Display Records */}
            <CTable hover striped className="mt-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Employee ID</CTableHeaderCell>
                  <CTableHeaderCell>Employee Name</CTableHeaderCell>
                  <CTableHeaderCell>Total Salary</CTableHeaderCell>
                  <CTableHeaderCell>Leave Type</CTableHeaderCell>
                  <CTableHeaderCell>Leave Dates</CTableHeaderCell>
                  <CTableHeaderCell>Reason</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {payrollRecords.map((record, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{record.employeeId}</CTableDataCell>
                    <CTableDataCell>{record.employeeName}</CTableDataCell>
                    <CTableDataCell>{record.totalSalary}</CTableDataCell>
                    <CTableDataCell>{record.leaveType}</CTableDataCell>
                    <CTableDataCell>
                      {record.leaveStartDate} to {record.leaveEndDate}
                    </CTableDataCell>
                    <CTableDataCell>{record.leaveReason}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PayrollLeaveManagement
