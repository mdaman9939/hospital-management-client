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

const PatientRegistrationAdmission = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  // Function to get the current date and time in 'YYYY-MM-DDTHH' format (only hours)
  const getCurrentDateTime = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0') // Adding leading zero for month
    const day = today.getDate().toString().padStart(2, '0') // Adding leading zero for day
    const hours = today.getHours().toString().padStart(2, '0') // Adding leading zero for hours
    const minutes = '00' // Always set minutes to '00'
    return `${year}-${month}-${day}T${hours}:${minutes}` // Only showing hours and setting minutes to 00
  }

  // Set the default admissionDate to the current date and time with hours only
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    contactInfo: '',
    admissionDate: getCurrentDateTime(), // Automatically set to current date and time (only hours)
    address: '',
    ward: '',
    guardianContact: '',
    medicalHistory: '',
  })

  const [patients, setPatients] = useState([])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }
  console.log(process.env.REACT_APP_API_URL)

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token') // Get token from localStorage
      console.log('Token from localStorage:', token) // Log the token to verify it's being fetched

      if (!token) {
        console.error('No token found.')
        return
      }

      const response = await fetch('${process.env.REACT_APP_API_URL}/api/patient', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      })

      if (!response.ok) {
        // Handle authentication errors
        console.error('Authentication error:', response.statusText)
        return
      }

      const data = await response.json()
      if (data.length > 0) {
        setPatients(data.reverse())
      } else {
        console.log('No patients found for this user.')
      }
    } catch (error) {
      console.error('Error fetching patients:', error)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token') // Get token from localStorage
    if (!token) {
      alert('No token found!')
      return
    }

    // POST request to register the patient
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // After successful registration, fetch the updated list of patients
        fetchPatients()

        // Clear the form after submission
        setFormData({
          patientName: '',
          patientAge: '',
          patientGender: '',
          contactInfo: '',
          admissionDate: getCurrentDateTime(),
          address: '',
          ward: '',
          guardianContact: '',
          medicalHistory: '',
        })
      } else {
        console.error('Failed to register patient.')
      }
    } catch (error) {
      console.error('Error registering patient:', error)
    }
  }

  const printPatientAdmission = (patient) => {
    const printWindow = window.open('', '', 'height=600,width=800')
    printWindow.document.write('<html><head><title>Patient Admission</title></head><body>')
    printWindow.document.write(`<h1>Admission Details for ${patient.patientName}</h1>`)
    printWindow.document.write(`<p><strong>Age:</strong> ${patient.patientAge}</p>`)
    printWindow.document.write(`<p><strong>Gender:</strong> ${patient.patientGender}</p>`)
    printWindow.document.write(`<p><strong>Contact:</strong> ${patient.contactInfo}</p>`)
    printWindow.document.write(`<p><strong>Admission Date:</strong> ${patient.admissionDate}</p>`)
    printWindow.document.write(`<p><strong>Address:</strong> ${patient.address}</p>`)
    printWindow.document.write(`<p><strong>Ward:</strong> ${patient.ward}</p>`)
    printWindow.document.write(
      `<p><strong>Guardian Contact:</strong> ${patient.guardianContact}</p>`,
    )
    printWindow.document.write(`<p><strong>Medical History:</strong> ${patient.medicalHistory}</p>`)
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Patient Registration and Admission</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={3}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="patientName"
                    placeholder="Full name"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="patientAge">Age</CFormLabel>
                  <CFormInput
                    type="number"
                    id="patientAge"
                    placeholder="Age"
                    value={formData.patientAge}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="patientGender">Gender</CFormLabel>
                  <CFormSelect
                    id="patientGender"
                    value={formData.patientGender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="contactInfo">Contact Number</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="contactInfo"
                    placeholder="Contact number"
                    value={formData.contactInfo}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="admissionDate">Admission Date</CFormLabel>
                  <CFormInput
                    type="datetime-local"
                    id="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={5}>
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormTextarea
                    id="address"
                    rows="1"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="ward">Ward/Room</CFormLabel>
                  <CFormSelect id="ward" value={formData.ward} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="general">General Ward</option>
                    <option value="private">Private Room</option>
                    <option value="icu">ICU</option>
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="guardianContact">Guardian Contact</CFormLabel>
                  <CFormInput
                    type="text"
                    id="guardianContact"
                    placeholder="Guardian's contact"
                    value={formData.guardianContact}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={10}>
                  <CFormLabel htmlFor="medicalHistory">Medical History</CFormLabel>
                  <CFormTextarea
                    id="medicalHistory"
                    rows="2"
                    placeholder="Relevant medical history"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={2} className="d-flex align-items-end">
                  <CButton color="primary" type="submit" className="w-100">
                    Submit
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <strong>Patient List</strong>
          </CCardHeader>
          <CCardBody>
            {patients.length > 0 ? (
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Age</CTableHeaderCell>
                    <CTableHeaderCell>Gender</CTableHeaderCell>
                    <CTableHeaderCell>Contact</CTableHeaderCell>
                    <CTableHeaderCell>Admission Date</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Ward</CTableHeaderCell>
                    <CTableHeaderCell>Guardian Contact</CTableHeaderCell>
                    <CTableHeaderCell>Medical History</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {patients.map((patient, index) => (
                    <CTableRow key={patient._id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{patient.patientName || ''}</CTableDataCell>
                      <CTableDataCell>{patient.patientAge || ''}</CTableDataCell>
                      <CTableDataCell>{patient.patientGender || ''}</CTableDataCell>
                      <CTableDataCell>{patient.contactInfo || ''}</CTableDataCell>
                      <CTableDataCell>
                        {patient.admissionDate
                          ? new Date(patient.admissionDate).toLocaleString()
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell>{patient.address || ''}</CTableDataCell>
                      <CTableDataCell>{patient.ward || ''}</CTableDataCell>
                      <CTableDataCell>{patient.guardianContact || ''}</CTableDataCell>
                      <CTableDataCell>{patient.medicalHistory || ''}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="secondary" onClick={() => printPatientAdmission(patient)}>
                          Print
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>No patients found.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PatientRegistrationAdmission
