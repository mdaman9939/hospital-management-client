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

const AppointmentScheduling = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [doctors, setDoctors] = useState([])
  const [bookedSlots, setBookedSlots] = useState([])
  const [doctorProfiles, setDoctorProfiles] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    appointmentDate: '',
    doctor: '',
    reason: '',
    appointmentTime: '',
  })

  const [userId, setUserId] = useState(null) // Store the user ID from the token

  useEffect(() => {
    fetchUserId()
    fetchDoctors()
  }, [])

  useEffect(() => {
    if (userId) {
      fetchAppointments() // Fetch appointments once userId is set
    }
  }, [userId])

  // Extract the userId from the JWT token stored in localStorage
  const fetchUserId = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])) // Decode the JWT to get userId
      setUserId(decoded.id) // Assuming the JWT contains user ID in the 'id' field
    }
  }

  // Fetch all appointments for the specific user
  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      // Filter the appointments by the logged-in user's userId
      const filteredAppointments = data.filter((appointment) => appointment.userId === userId)
      setBookedSlots(filteredAppointments)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  // Fetch doctors from the API
  const fetchDoctors = async () => {
    const token = localStorage.getItem('token') // Get the token from local storage
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/doctor-profiles', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      })

      if (response.ok) {
        const data = await response.json()
        setDoctorProfiles(data) // Assuming you have this state
      } else {
        throw new Error('Error fetching doctor profiles')
      }
    } catch (error) {
      console.error('Error fetching doctor profiles:', error)
    }
  }

  useEffect(() => {
    fetchDoctors() // Fetch the doctor profiles when the component mounts
  }, [])

  const generateTimeSlots = () => {
    const slots = []
    let currentTime = new Date()
    currentTime.setHours(10, 0, 0, 0)

    while (currentTime.getHours() < 13) {
      const timeString = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
      slots.push(timeString)
      currentTime.setMinutes(currentTime.getMinutes() + 15)
    }

    return slots
  }

  const updateAvailableSlots = (selectedDate) => {
    const bookedForDate = bookedSlots.filter((slot) => slot.appointmentDate === selectedDate)
    const allTimeSlots = generateTimeSlots()
    const availableSlots = allTimeSlots.filter(
      (timeSlot) => !bookedForDate.some((slot) => slot.appointmentTime === timeSlot),
    )
    setAvailableTimeSlots(availableSlots)
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const existingBooking = bookedSlots.some(
      (slot) =>
        slot.appointmentDate === formData.appointmentDate &&
        slot.appointmentTime === formData.appointmentTime,
    )
    if (existingBooking) {
      alert('This time slot is already booked. Please choose another one.')
      return
    }

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach JWT token in the header
        },
        body: JSON.stringify({
          ...formData,
          userId: userId, // Add userId to the appointment data
        }),
      })

      if (response.ok) {
        const newAppointment = await response.json()
        setBookedSlots([...bookedSlots, newAppointment.appointment])
        setFormData({
          patientName: '',
          contactNumber: '',
          appointmentDate: '',
          doctor: '',
          reason: '',
          appointmentTime: '',
        })
        updateAvailableSlots(formData.appointmentDate)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Failed to book appointment.')
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Error occurred while booking the appointment.')
    }
  }

  const handlePrint = (appointment) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Appointment</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Appointment Details</h2>
          <table>
            <tr><th>Patient Name</th><td>${appointment.patientName}</td></tr>
            <tr><th>Contact Number</th><td>${appointment.contactNumber}</td></tr>
            <tr><th>Appointment Date</th><td>${appointment.appointmentDate}</td></tr>
            <tr><th>Appointment Time</th><td>${appointment.appointmentTime}</td></tr>
            <tr><th>Doctor</th><td>${appointment.doctor}</td></tr>
            <tr><th>Reason</th><td>${appointment.reason}</td></tr>
          </table>
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
            <strong>Appointment Scheduling</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={4}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="patientName"
                    placeholder="Full name"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="contactNumber">Contact Number</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="contactNumber"
                    placeholder="Contact number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="appointmentDate">Appointment Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={(e) => {
                      handleInputChange(e)
                      updateAvailableSlots(e.target.value)
                    }}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="appointmentTime">Appointment Time</CFormLabel>
                  <CFormSelect
                    id="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Time</option>
                    {availableTimeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="doctor">Doctor</CFormLabel>
                  <CFormSelect
                    id="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctorProfiles && doctorProfiles.length > 0 ? (
                      doctorProfiles.map((doctor) => (
                        <option key={doctor._id} value={doctor.doctorName}>
                          {doctor.doctorName}
                        </option>
                      ))
                    ) : (
                      <option>Loading doctors...</option>
                    )}
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="reason">Reason for Appointment</CFormLabel>
                  <CFormTextarea
                    id="reason"
                    rows="1"
                    placeholder="Brief reason for visit"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4">
                <CCol md={12} className="text-center">
                  <CButton color="primary" type="submit" className="w-25">
                    Schedule Appointment
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
            <CRow className="mt-5">
              <CCol md={12}>
                <CTable striped hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>S.No.</CTableHeaderCell>
                      <CTableHeaderCell>Patient Name</CTableHeaderCell>
                      <CTableHeaderCell>Contact Number</CTableHeaderCell>
                      <CTableHeaderCell>Appointment Date</CTableHeaderCell>
                      <CTableHeaderCell>Appointment Time</CTableHeaderCell>
                      <CTableHeaderCell>Doctor</CTableHeaderCell>
                      <CTableHeaderCell>Reason</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {bookedSlots.map((slot, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{slot.patientName}</CTableDataCell>
                        <CTableDataCell>{slot.contactNumber}</CTableDataCell>
                        <CTableDataCell>{slot.appointmentDate}</CTableDataCell>
                        <CTableDataCell>{slot.appointmentTime}</CTableDataCell>
                        <CTableDataCell>{slot.doctor}</CTableDataCell>
                        <CTableDataCell>{slot.reason}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color="success" size="sm" onClick={() => handlePrint(slot)}>
                            Print
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
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

export default AppointmentScheduling
