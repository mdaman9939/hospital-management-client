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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DutyRostersSchedules = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    staffName: '',
    staffRole: '',
    contactInfo: '',
    dutyStart: '',
    dutyEnd: '',
    shiftType: '',
    assignedDate: '',
    assignedWard: '',
  })

  const [dutyRoster, setDutyRoster] = useState([])

  // Fetch the duty roster data from the API
  // Fetch the duty roster data from the API
  const fetchDutyRoster = async () => {
    try {
      const token = localStorage.getItem('token') // Assuming token is stored in localStorage

      const response = await fetch('${process.env.REACT_APP_API_URL}/api/duty-roster', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()
      console.log('Fetched Data:', result) // Debugging API response
      if (Array.isArray(result.data)) {
        setDutyRoster(result.data) // Set the "data" array into the state
      } else {
        console.error('Invalid data format received from API.')
      }
    } catch (error) {
      console.error('Error fetching duty roster:', error)
    }
  }

  useEffect(() => {
    fetchDutyRoster()
  }, [])

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token') // Assuming token is stored in localStorage

      const response = await fetch('${process.env.REACT_APP_API_URL}/api/duty-roster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Refresh the roster data after successful submission
        fetchDutyRoster()
        // Clear the form
        setFormData({
          staffName: '',
          staffRole: '',
          contactInfo: '',
          dutyStart: '',
          dutyEnd: '',
          shiftType: '',
          assignedDate: '',
          assignedWard: '',
        })
      } else {
        console.error('Error saving duty roster:', response.statusText)
      }
    } catch (error) {
      console.error('Error saving duty roster:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Duty Rosters and Schedules</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Form Fields */}
              <CRow>
                <CCol md={4}>
                  <CFormLabel htmlFor="staffName">Staff Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="staffName"
                    placeholder="Enter staff name"
                    value={formData.staffName}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="staffRole">Role</CFormLabel>
                  <CFormSelect
                    id="staffRole"
                    value={formData.staffRole}
                    onChange={handleInputChange}
                  >
                    <option>Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Administrative Staff</option>
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="contactInfo">Contact Information</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="contactInfo"
                    placeholder="Phone number or email"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              {/* Additional Fields */}
              <CRow className="mt-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="dutyStart">Duty Start Time</CFormLabel>
                  <CFormInput
                    type="time"
                    id="dutyStart"
                    value={formData.dutyStart}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="dutyEnd">Duty End Time</CFormLabel>
                  <CFormInput
                    type="time"
                    id="dutyEnd"
                    value={formData.dutyEnd}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="shiftType">Shift Type</CFormLabel>
                  <CFormSelect
                    id="shiftType"
                    value={formData.shiftType}
                    onChange={handleInputChange}
                  >
                    <option>Select Shift</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="night">Night</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="assignedDate">Assigned Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="assignedDate"
                    value={formData.assignedDate}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="assignedWard">Assigned Ward/Department</CFormLabel>
                  <CFormInput
                    type="text"
                    id="assignedWard"
                    placeholder="e.g., ICU, General Ward, Pediatrics"
                    value={formData.assignedWard}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4 text-center">
                <CCol md={12}>
                  <CButton color="primary" type="submit">
                    Save Duty Roster
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Duty Roster Table */}
            {dutyRoster.length > 0 && (
              <CRow className="mt-5">
                <CCol md={12}>
                  <CTable striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>#</CTableHeaderCell>
                        <CTableHeaderCell>Staff Name</CTableHeaderCell>
                        <CTableHeaderCell>Role</CTableHeaderCell>
                        <CTableHeaderCell>Contact</CTableHeaderCell>
                        <CTableHeaderCell>Duty Start</CTableHeaderCell>
                        <CTableHeaderCell>Duty End</CTableHeaderCell>
                        <CTableHeaderCell>Shift</CTableHeaderCell>
                        <CTableHeaderCell>Assigned Date</CTableHeaderCell>
                        <CTableHeaderCell>Ward/Dept</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {dutyRoster.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{item.staffName}</CTableDataCell>
                          <CTableDataCell>{item.staffRole}</CTableDataCell>
                          <CTableDataCell>{item.contactInfo}</CTableDataCell>
                          <CTableDataCell>{item.dutyStart}</CTableDataCell>
                          <CTableDataCell>{item.dutyEnd}</CTableDataCell>
                          <CTableDataCell>{item.shiftType}</CTableDataCell>
                          <CTableDataCell>{item.assignedDate}</CTableDataCell>
                          <CTableDataCell>{item.assignedWard}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DutyRostersSchedules
