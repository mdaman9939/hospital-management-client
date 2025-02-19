import{q,r as a,j as e}from"./index-C8M8d5TP.js";import{C as p,a as i}from"./CRow-DwbOyR1O.js";import{C as R,a as H}from"./CCardBody-BC-1MHGB.js";import{C as z}from"./CCardHeader-Cy4Bd0Ol.js";import{C as L}from"./CForm-w6XIb02x.js";import{C as m}from"./CFormLabel-Dc_uzIQC.js";import{C as f}from"./CFormInput-Bd3bcSFW.js";import{C as N}from"./CFormSelect-DPn45vPc.js";import{C as O}from"./CFormTextarea-CI9dEni-.js";import{a as D}from"./index.esm-D35apfu2.js";import{C as G,a as J,b as k,c as s,d as M,e as c}from"./CTable-DhOiOdMA.js";import"./CFormControlWrapper-CObUvOP_.js";import"./CFormControlValidation-1FHZm8X5.js";const re=()=>{const g=q();a.useEffect(()=>{localStorage.getItem("token")||g("/login")},[g]),a.useState([]);const[h,b]=a.useState([]),[x,w]=a.useState([]),[y,v]=a.useState([]),[r,C]=a.useState({patientName:"",contactNumber:"",appointmentDate:"",doctor:"",reason:"",appointmentTime:""}),[u,A]=a.useState(null);a.useEffect(()=>{F(),S()},[]),a.useEffect(()=>{u&&E()},[u]);const F=()=>{const t=localStorage.getItem("token");if(t){const o=JSON.parse(atob(t.split(".")[1]));A(o.id)}},E=async()=>{try{const n=(await(await fetch("http://localhost:1000/api/appointments",{method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()).filter(l=>l.userId===u);b(n)}catch(t){console.error("Error fetching appointments:",t)}},S=async()=>{const t=localStorage.getItem("token");try{const o=await fetch("http://localhost:1000/api/doctor-profiles",{method:"GET",headers:{Authorization:`Bearer ${t}`}});if(o.ok){const n=await o.json();w(n)}else throw new Error("Error fetching doctor profiles")}catch(o){console.error("Error fetching doctor profiles:",o)}};a.useEffect(()=>{S()},[]);const I=()=>{const t=[];let o=new Date;for(o.setHours(10,0,0,0);o.getHours()<13;){const n=o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});t.push(n),o.setMinutes(o.getMinutes()+15)}return t},T=t=>{const o=h.filter(j=>j.appointmentDate===t),l=I().filter(j=>!o.some($=>$.appointmentTime===j));v(l)},d=t=>{const{id:o,value:n}=t.target;C({...r,[o]:n})},B=async t=>{if(t.preventDefault(),h.some(n=>n.appointmentDate===r.appointmentDate&&n.appointmentTime===r.appointmentTime)){alert("This time slot is already booked. Please choose another one.");return}try{const n=await fetch("http://localhost:1000/api/appointments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({...r,userId:u})});if(n.ok){const l=await n.json();b([...h,l.appointment]),C({patientName:"",contactNumber:"",appointmentDate:"",doctor:"",reason:"",appointmentTime:""}),T(r.appointmentDate)}else{const l=await n.json();alert(l.message||"Failed to book appointment.")}}catch(n){console.error("Error booking appointment:",n),alert("Error occurred while booking the appointment.")}},P=t=>{const o=window.open("","_blank","width=800,height=600");o.document.write(`
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
            <tr><th>Patient Name</th><td>${t.patientName}</td></tr>
            <tr><th>Contact Number</th><td>${t.contactNumber}</td></tr>
            <tr><th>Appointment Date</th><td>${t.appointmentDate}</td></tr>
            <tr><th>Appointment Time</th><td>${t.appointmentTime}</td></tr>
            <tr><th>Doctor</th><td>${t.doctor}</td></tr>
            <tr><th>Reason</th><td>${t.reason}</td></tr>
          </table>
        </body>
      </html>
    `),o.document.close(),o.print()};return e.jsx(p,{children:e.jsx(i,{xs:12,children:e.jsxs(R,{className:"mb-4",children:[e.jsx(z,{children:e.jsx("strong",{children:"Appointment Scheduling"})}),e.jsxs(H,{children:[e.jsxs(L,{onSubmit:B,children:[e.jsxs(p,{children:[e.jsxs(i,{md:4,children:[e.jsx(m,{htmlFor:"patientName",children:"Patient Name"}),e.jsx(f,{type:"text",id:"patientName",placeholder:"Full name",value:r.patientName,onChange:d,required:!0})]}),e.jsxs(i,{md:4,children:[e.jsx(m,{htmlFor:"contactNumber",children:"Contact Number"}),e.jsx(f,{type:"tel",id:"contactNumber",placeholder:"Contact number",value:r.contactNumber,onChange:d,required:!0})]}),e.jsxs(i,{md:4,children:[e.jsx(m,{htmlFor:"appointmentDate",children:"Appointment Date"}),e.jsx(f,{type:"date",id:"appointmentDate",value:r.appointmentDate,onChange:t=>{d(t),T(t.target.value)},required:!0})]})]}),e.jsxs(p,{className:"mt-3",children:[e.jsxs(i,{md:4,children:[e.jsx(m,{htmlFor:"appointmentTime",children:"Appointment Time"}),e.jsxs(N,{id:"appointmentTime",value:r.appointmentTime,onChange:d,required:!0,children:[e.jsx("option",{value:"",children:"Select Time"}),y.map((t,o)=>e.jsx("option",{value:t,children:t},o))]})]}),e.jsxs(i,{md:4,children:[e.jsx(m,{htmlFor:"doctor",children:"Doctor"}),e.jsxs(N,{id:"doctor",value:r.doctor,onChange:d,required:!0,children:[e.jsx("option",{value:"",children:"Select Doctor"}),x&&x.length>0?x.map(t=>e.jsx("option",{value:t.doctorName,children:t.doctorName},t._id)):e.jsx("option",{children:"Loading doctors..."})]})]}),e.jsxs(i,{md:4,children:[e.jsx(m,{htmlFor:"reason",children:"Reason for Appointment"}),e.jsx(O,{id:"reason",rows:"1",placeholder:"Brief reason for visit",value:r.reason,onChange:d,required:!0})]})]}),e.jsx(p,{className:"mt-4",children:e.jsx(i,{md:12,className:"text-center",children:e.jsx(D,{color:"primary",type:"submit",className:"w-25",children:"Schedule Appointment"})})})]}),e.jsx(p,{className:"mt-5",children:e.jsx(i,{md:12,children:e.jsxs(G,{striped:!0,hover:!0,responsive:!0,children:[e.jsx(J,{children:e.jsxs(k,{children:[e.jsx(s,{children:"S.No."}),e.jsx(s,{children:"Patient Name"}),e.jsx(s,{children:"Contact Number"}),e.jsx(s,{children:"Appointment Date"}),e.jsx(s,{children:"Appointment Time"}),e.jsx(s,{children:"Doctor"}),e.jsx(s,{children:"Reason"}),e.jsx(s,{children:"Actions"})]})}),e.jsx(M,{children:h.map((t,o)=>e.jsxs(k,{children:[e.jsx(c,{children:o+1}),e.jsx(c,{children:t.patientName}),e.jsx(c,{children:t.contactNumber}),e.jsx(c,{children:t.appointmentDate}),e.jsx(c,{children:t.appointmentTime}),e.jsx(c,{children:t.doctor}),e.jsx(c,{children:t.reason}),e.jsx(c,{children:e.jsx(D,{color:"success",size:"sm",onClick:()=>P(t),children:"Print"})})]},o))})]})})})]})]})})})};export{re as default};
