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

const ShiftManagement = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [shiftDetails, setShiftDetails] = useState({
    employeeId: '',
    employeeName: '',
    shiftType: '',
    notes: '',
  })

  const [employeeRecords, setEmployeeRecords] = useState([]) // Employee records to auto-fill names
  const [shiftRecords, setShiftRecords] = useState([]) // Shift records to display in table

  // Fetch employee records using fetch API
  useEffect(() => {
    const token = localStorage.getItem('token') // Get the token from localStorage
    if (token) {
      fetch(`https://amankaserver.vercel.app/api/employee-records`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => setEmployeeRecords(data))
        .catch((error) => console.error('Error fetching employee records:', error))
    } else {
      console.error('No token found!')
    }
  }, [])

  // Fetch shift records from the server
  useEffect(() => {
    const token = localStorage.getItem('token') // Get the token from localStorage
    if (token) {
      fetch(`https://amankaserver.vercel.app/api/shifts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && Array.isArray(data.data)) {
            setShiftRecords(data.data) // Set the shift records to state
          } else {
            console.error('Invalid data structure', data)
            setShiftRecords([]) // Default to empty if data structure is unexpected
          }
        })
        .catch((error) => console.error('Error fetching shift records:', error))
    } else {
      console.error('No token found!')
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShiftDetails((prev) => ({ ...prev, [name]: value }))

    // Auto-fill employee name when employee ID changes
    if (name === 'employeeId') {
      const selectedEmployee = employeeRecords.find((employee) => employee.employeeId === value)
      setShiftDetails((prev) => ({
        ...prev,
        employeeName: selectedEmployee ? selectedEmployee.name : '',
      }))
    }
  }

  const submitShiftDetails = () => {
    const newShiftRecord = {
      ...shiftDetails,
      shiftId: Math.random().toString(36).substr(2, 9), // Generate a random shift ID
    }

    // Retrieve the token from localStorage correctly
    const token = localStorage.getItem('token') // Make sure the key is 'token'

    if (token) {
      fetch(`https://amankaserver.vercel.app/api/shift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Correctly add the token
        },
        body: JSON.stringify(newShiftRecord),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.message === 'Shift record saved successfully!') {
            setShiftRecords((prev) => [...prev, newShiftRecord]) // Update the table with the new record
            setShiftDetails({
              // Reset the form
              employeeId: '',
              employeeName: '',
              shiftType: '',
              notes: '',
            })
            alert('Shift record saved successfully!')
          }
        })
        .catch((error) => console.error('Error saving shift record:', error))
    } else {
      console.error('No token found!')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Shift Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                {/* Employee ID and Name */}
                <CCol md={6}>
                  <CFormLabel htmlFor="employeeId">Employee ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={shiftDetails.employeeId}
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
                    value={shiftDetails.employeeName}
                    readOnly
                    placeholder="Employee name will be auto-filled"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Shift Type */}
                <CCol md={6}>
                  <CFormLabel htmlFor="shiftType">Shift Type</CFormLabel>
                  <CFormSelect
                    id="shiftType"
                    name="shiftType"
                    value={shiftDetails.shiftType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Shift Type</option>
                    <option value="morning">Morning Shift</option>
                    <option value="evening">Evening Shift</option>
                    <option value="night">Night Shift</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="notes">Additional Notes</CFormLabel>
                  <CFormTextarea
                    id="notes"
                    name="notes"
                    value={shiftDetails.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter any additional notes"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                {/* Submit Button */}
                <CCol md={2}>
                  <CButton color="primary" onClick={submitShiftDetails}>
                    Save Shift
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Display Shift Records Table */}
            <CRow className="mt-5">
              <CCol xs={12}>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>Employee ID</CTableHeaderCell>
                      <CTableHeaderCell>Employee Name</CTableHeaderCell>
                      <CTableHeaderCell>Shift Type</CTableHeaderCell>
                      <CTableHeaderCell>Notes</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {Array.isArray(shiftRecords) && shiftRecords.length > 0 ? (
                      shiftRecords.map((shift, idx) => (
                        <CTableRow key={shift._id}>
                          <CTableDataCell>{idx + 1}</CTableDataCell>
                          <CTableDataCell>{shift.employeeId}</CTableDataCell>
                          <CTableDataCell>{shift.employeeName}</CTableDataCell>
                          <CTableDataCell>{shift.shiftType}</CTableDataCell>
                          <CTableDataCell>{shift.notes}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="5" className="text-center">
                          No shift records available.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ShiftManagement
