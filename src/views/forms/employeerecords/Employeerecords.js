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
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeRecords = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [employeeDetails, setEmployeeDetails] = useState({
    name: '',
    employeeId: '',
    designation: '',
    department: '',
    contactNumber: '',
    email: '',
    dateOfJoining: '',
  })
  const [employeeList, setEmployeeList] = useState([]) // To hold the list of employees

  const apiBaseUrl = '${process.env.REACT_APP_API_URL}/api/employee-records'

  // Fetch token from localStorage (assuming it's stored as "token")
  const token = localStorage.getItem('token')

  // Fetch employee records from the API on component mount
  useEffect(() => {
    const fetchEmployeeRecords = async () => {
      try {
        const response = await fetch(apiBaseUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch employee records')
        }

        const data = await response.json()
        setEmployeeList(data.reverse())
      } catch (error) {
        console.error('Error fetching employee records:', error)
      }
    }

    fetchEmployeeRecords()
  }, [apiBaseUrl, token])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployeeDetails((prev) => ({ ...prev, [name]: value }))
  }

  const submitEmployeeDetails = async () => {
    try {
      const response = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeDetails),
      })

      const result = await response.json()

      if (response.ok) {
        setEmployeeList((prev) => [...prev, result.newRecord]) // Add new employee to the list
        setEmployeeDetails({
          name: '',
          employeeId: '',
          designation: '',
          department: '',
          contactNumber: '',
          email: '',
          dateOfJoining: '',
        }) // Clear the form after submission
      } else {
        throw new Error(result.message || 'Error saving employee record.')
      }
    } catch (error) {
      console.error('Error submitting employee details:', error)
      alert('Error saving employee record.')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Employee Records Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                {/* Name and Employee ID */}
                <CCol md={6}>
                  <CFormLabel htmlFor="name">Employee Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    name="name"
                    value={employeeDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter employee name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="employeeId">Employee ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={employeeDetails.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Designation and Department */}
                <CCol md={6}>
                  <CFormLabel htmlFor="designation">Designation</CFormLabel>
                  <CFormInput
                    type="text"
                    id="designation"
                    name="designation"
                    value={employeeDetails.designation}
                    onChange={handleInputChange}
                    placeholder="Enter designation (e.g., Nurse, Technician)"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="department">Department</CFormLabel>
                  <CFormSelect
                    id="department"
                    name="department"
                    value={employeeDetails.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    <option value="nursing">Nursing</option>
                    <option value="lab">Lab Technicians</option>
                    <option value="administration">Administration</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Contact and Email */}
                <CCol md={6}>
                  <CFormLabel htmlFor="contactNumber">Contact Number</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={employeeDetails.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    name="email"
                    value={employeeDetails.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Date of Joining */}
                <CCol md={6}>
                  <CFormLabel htmlFor="dateOfJoining">Date of Joining</CFormLabel>
                  <CFormInput
                    type="date"
                    id="dateOfJoining"
                    name="dateOfJoining"
                    value={employeeDetails.dateOfJoining}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                {/* Submit Button */}
                <CCol md={2}>
                  <CButton color="primary" onClick={submitEmployeeDetails}>
                    Save Record
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Display Employee Records in Table */}
            <div className="mt-5">
              <h5>Employee Records</h5>
              {employeeList.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Date of Joining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.employeeId}</td>
                        <td>{employee.name}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.department}</td>
                        <td>{employee.contactNumber}</td>
                        <td>{employee.email}</td>
                        <td>{employee.dateOfJoining}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No employee records available</p>
              )}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EmployeeRecords
