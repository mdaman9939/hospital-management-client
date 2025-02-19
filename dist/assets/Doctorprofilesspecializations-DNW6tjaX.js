import{q as v,r as h,j as e}from"./index-C8M8d5TP.js";import{C as d,a}from"./CRow-DwbOyR1O.js";import{C as F,a as S}from"./CCardBody-BC-1MHGB.js";import{C as q}from"./CCardHeader-Cy4Bd0Ol.js";import{C as I}from"./CForm-w6XIb02x.js";import{C as c}from"./CFormLabel-Dc_uzIQC.js";import{C as m}from"./CFormInput-Bd3bcSFW.js";import{C as x}from"./CFormTextarea-CI9dEni-.js";import{a as z}from"./index.esm-D35apfu2.js";import{C as w,a as A,b as g,c as i,d as P,e as t}from"./CTable-DhOiOdMA.js";import"./CFormControlWrapper-CObUvOP_.js";import"./CFormControlValidation-1FHZm8X5.js";const G=()=>{const j=v();h.useEffect(()=>{localStorage.getItem("token")||j("/login")},[j]);const[o,u]=h.useState({doctorName:"",qualification:"",experience:"",specializations:"",contactInfo:"",clinicAddress:"",biography:""}),[p,f]=h.useState([]),C="http://localhost:1000/api/doctor-profiles",y=async()=>{try{const r=localStorage.getItem("token"),l=await(await fetch(C,{method:"GET",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}})).json();f(l)}catch(r){console.error("Error fetching profiles:",r)}},b=async r=>{r.preventDefault();try{const s=localStorage.getItem("token"),l=await fetch(C,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(o)});if(l.ok){const N=await l.json();f([...p,N.data]),u({doctorName:"",qualification:"",experience:"",specializations:"",contactInfo:"",clinicAddress:"",biography:""})}else console.error("Failed to save profile")}catch(s){console.error("Error submitting profile:",s)}};h.useEffect(()=>{y()},[]);const n=r=>{const{id:s,value:l}=r.target;u({...o,[s]:l})};return e.jsx(d,{children:e.jsx(a,{xs:12,children:e.jsxs(F,{className:"mb-4",children:[e.jsx(q,{children:e.jsx("strong",{children:"Doctor Profiles and Specializations"})}),e.jsxs(S,{children:[e.jsxs(I,{onSubmit:b,children:[e.jsxs(d,{children:[e.jsxs(a,{md:4,children:[e.jsx(c,{htmlFor:"doctorName",children:"Doctor Name"}),e.jsx(m,{type:"text",id:"doctorName",placeholder:"Full name",required:!0,value:o.doctorName,onChange:n})]}),e.jsxs(a,{md:4,children:[e.jsx(c,{htmlFor:"qualification",children:"Qualification"}),e.jsx(m,{type:"text",id:"qualification",placeholder:"e.g., MBBS, MD",required:!0,value:o.qualification,onChange:n})]}),e.jsxs(a,{md:4,children:[e.jsx(c,{htmlFor:"experience",children:"Years of Experience"}),e.jsx(m,{type:"number",id:"experience",placeholder:"e.g., 10",required:!0,value:o.experience,onChange:n})]})]}),e.jsxs(d,{className:"mt-3",children:[e.jsxs(a,{md:6,children:[e.jsx(c,{htmlFor:"specializations",children:"Specializations"}),e.jsx(x,{id:"specializations",rows:"2",placeholder:"e.g., Cardiology, Neurology",required:!0,value:o.specializations,onChange:n})]}),e.jsxs(a,{md:6,children:[e.jsx(c,{htmlFor:"contactInfo",children:"Contact Information"}),e.jsx(m,{type:"tel",id:"contactInfo",placeholder:"Phone number or email",required:!0,value:o.contactInfo,onChange:n})]})]}),e.jsx(d,{className:"mt-3",children:e.jsxs(a,{md:12,children:[e.jsx(c,{htmlFor:"clinicAddress",children:"Clinic/Hospital Address"}),e.jsx(x,{id:"clinicAddress",rows:"3",placeholder:"Enter clinic or hospital address",required:!0,value:o.clinicAddress,onChange:n})]})}),e.jsx(d,{className:"mt-3",children:e.jsxs(a,{md:12,children:[e.jsx(c,{htmlFor:"biography",children:"Biography"}),e.jsx(x,{id:"biography",rows:"4",placeholder:"Provide a short biography about the doctor",required:!0,value:o.biography,onChange:n})]})}),e.jsx(d,{className:"mt-4",children:e.jsx(a,{md:12,className:"text-center",children:e.jsx(z,{color:"primary",type:"submit",className:"w-25",children:"Save Profile"})})})]}),p.length>0&&e.jsxs(w,{className:"mt-4",responsive:!0,striped:!0,bordered:!0,children:[e.jsx(A,{children:e.jsxs(g,{children:[e.jsx(i,{children:"#"}),e.jsx(i,{children:"Doctor Name"}),e.jsx(i,{children:"Qualification"}),e.jsx(i,{children:"Experience"}),e.jsx(i,{children:"Specializations"}),e.jsx(i,{children:"Contact Info"}),e.jsx(i,{children:"Clinic Address"}),e.jsx(i,{children:"Biography"})]})}),e.jsx(P,{children:p.map((r,s)=>e.jsxs(g,{children:[e.jsx(t,{children:s+1}),e.jsx(t,{children:r.doctorName}),e.jsx(t,{children:r.qualification}),e.jsx(t,{children:r.experience}),e.jsx(t,{children:r.specializations}),e.jsx(t,{children:r.contactInfo}),e.jsx(t,{children:r.clinicAddress}),e.jsx(t,{children:r.biography})]},s))})]})]})]})})})};export{G as default};
