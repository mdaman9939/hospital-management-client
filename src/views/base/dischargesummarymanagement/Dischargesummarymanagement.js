import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
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

const DischargeSummaryManagement = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  // State to store patient details and discharge summaries
  const [patientName, setPatientName] = useState('')
  const [admissionDate, setAdmissionDate] = useState('')
  const [dischargeDate, setDischargeDate] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [treatments, setTreatments] = useState('')
  const [medications, setMedications] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [notes, setNotes] = useState('')
  const [patients, setPatients] = useState([])
  const [dischargeSummaries, setDischargeSummaries] = useState([])
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true) // Initialize loading state

  // Extract userId from JWT
  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1])) // Decode JWT
        setUserId(decoded.id) // Assuming JWT contains user ID in the 'id' field
      }
    }
    fetchUserId()
  }, [])

  // Fetch patient data from the API based on user ID
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token') // Use actual token from localStorage
      try {
        const response = await fetch(`https://amankaserver.vercel.app/api/patient`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        setPatients(data)
        setLoading(false) // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }
    if (userId) {
      fetchPatients() // Only fetch patients after userId is available
    }
  }, [userId]) // Fetch patient data when userId changes

  // Handle patient name search and auto-fill admission date
  const handlePatientSearch = (e) => {
    const searchName = e.target.value
    setPatientName(searchName)

    // If loading, do nothing
    if (loading) return

    // Find the patient with the matching name
    const patient = patients.find(
      (patient) => patient.patientName.toLowerCase() === searchName.toLowerCase(),
    )

    if (patient) {
      setAdmissionDate(patient.admissionDate.split('T')[0]) // Set the admission date
    } else {
      setAdmissionDate('') // Clear admission date if patient not found
    }
  }

  // Set today's date as the default discharge date
  useEffect(() => {
    setDischargeDate(new Date().toISOString().split('T')[0])
  }, [])

  // Handle form submission to save discharge summary
  // Handle Save Summary
  const handleSaveSummary = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://amankaserver.vercel.app/api/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          patientName,
          admissionDate,
          dischargeDate,
          diagnosis,
          treatments,
          medications,
          followUp,
          notes,
          userId, // Include userId in the summary
        }),
      })

      if (response.ok) {
        const newSummary = await response.json()
        setDischargeSummaries([...dischargeSummaries, newSummary])
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Failed to save discharge summary.')
      }
    } catch (error) {
      console.error('Error saving the discharge summary:', error)
      alert('Error saving the discharge summary.')
    }

    // Clear form fields
    setPatientName('')
    setAdmissionDate('')
    setDischargeDate('')
    setDiagnosis('')
    setTreatments('')
    setMedications('')
    setFollowUp('')
    setNotes('')
  }

  // Fetch discharge summaries

  // Fetch Discharge Summaries by User ID
  useEffect(() => {
    if (userId) {
      fetchDischargeSummaries()
    }
  }, [userId])

  const fetchDischargeSummaries = async () => {
    try {
      const response = await fetch(`https://amankaserver.vercel.app/api/summary`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      // Filter the summaries by the logged-in user's userId
      const userSummaries = data.filter((summary) => summary.userId === userId)
      setDischargeSummaries(userSummaries)
    } catch (error) {
      console.error('Error fetching discharge summaries:', error)
    }
  }

  // Print individual summary
  const handlePrint = (summary) => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Discharge Summary</title>
        </head>
        <body>
          <h1>Discharge Summary</h1>
          <p><strong>Patient Name:</strong> ${summary.patientName}</p>
          <p><strong>Admission Date:</strong> ${summary.admissionDate}</p>
          <p><strong>Discharge Date:</strong> ${summary.dischargeDate}</p>
          <p><strong>Diagnosis:</strong> ${summary.diagnosis}</p>
          <p><strong>Treatments Given:</strong> ${summary.treatments}</p>
          <p><strong>Medications:</strong> ${summary.medications}</p>
          <p><strong>Follow-Up Instructions:</strong> ${summary.followUp}</p>
          <p><strong>Notes:</strong> ${summary.notes}</p>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Discharge Summary Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSaveSummary}>
              <CRow>
                {/* Patient Information */}
                <CCol md={4}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="patientName"
                    placeholder="Full name"
                    value={patientName}
                    onChange={handlePatientSearch}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="admissionDate">Admission Date</CFormLabel>
                  <CFormInput type="date" id="admissionDate" value={admissionDate} readOnly />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="dischargeDate">Discharge Date</CFormLabel>
                  <CFormInput type="date" id="dischargeDate" value={dischargeDate} readOnly />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Diagnosis */}
                <CCol md={6}>
                  <CFormLabel htmlFor="diagnosis">Diagnosis</CFormLabel>
                  <CFormTextarea
                    id="diagnosis"
                    rows="2"
                    placeholder="Diagnosis details"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </CCol>
                {/* Treatments Given */}
                <CCol md={6}>
                  <CFormLabel htmlFor="treatments">Treatments Given</CFormLabel>
                  <CFormTextarea
                    id="treatments"
                    rows="2"
                    placeholder="Treatments provided"
                    value={treatments}
                    onChange={(e) => setTreatments(e.target.value)}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Medications */}
                <CCol md={6}>
                  <CFormLabel htmlFor="medications">Medications</CFormLabel>
                  <CFormTextarea
                    id="medications"
                    rows="2"
                    placeholder="Prescribed medications"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                  />
                </CCol>
                {/* Follow-up Instructions */}
                <CCol md={6}>
                  <CFormLabel htmlFor="followUp">Follow-up Instructions</CFormLabel>
                  <CFormTextarea
                    id="followUp"
                    rows="2"
                    placeholder="Instructions for follow-up"
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Notes */}
                <CCol md={12}>
                  <CFormLabel htmlFor="notes">Additional Notes</CFormLabel>
                  <CFormTextarea
                    id="notes"
                    rows="3"
                    placeholder="Any additional information"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                {/* Submit Button */}
                <CCol md={12} className="text-center">
                  <CButton color="primary" type="submit" className="w-25">
                    Save Summary
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Table to display saved summaries */}
            {dischargeSummaries.length > 0 && (
              <CTable className="mt-4" bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Patient Name</CTableHeaderCell>
                    <CTableHeaderCell>Admission Date</CTableHeaderCell>
                    <CTableHeaderCell>Discharge Date</CTableHeaderCell>
                    <CTableHeaderCell>Diagnosis</CTableHeaderCell>
                    <CTableHeaderCell>Treatments</CTableHeaderCell>
                    <CTableHeaderCell>Medications</CTableHeaderCell>
                    <CTableHeaderCell>Follow-Up</CTableHeaderCell>
                    <CTableHeaderCell>Notes</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dischargeSummaries.map((summary, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{summary.patientName}</CTableDataCell>
                      <CTableDataCell>{summary.admissionDate}</CTableDataCell>
                      <CTableDataCell>{summary.dischargeDate}</CTableDataCell>
                      <CTableDataCell>{summary.diagnosis}</CTableDataCell>
                      <CTableDataCell>{summary.treatments}</CTableDataCell>
                      <CTableDataCell>{summary.medications}</CTableDataCell>
                      <CTableDataCell>{summary.followUp}</CTableDataCell>
                      <CTableDataCell>{summary.notes}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" size="sm" onClick={() => handlePrint(summary)}>
                          Print
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DischargeSummaryManagement
