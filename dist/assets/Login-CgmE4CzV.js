import{r as t,q as b,j as e,L as w}from"./index-C8M8d5TP.js";import{b as v,c as m,a as o}from"./index.esm-D35apfu2.js";import{C as p,a as i}from"./CRow-DwbOyR1O.js";import{C as L}from"./CCardGroup-BUqPdLB8.js";import{C as x,a as h}from"./CCardBody-BC-1MHGB.js";import{C as S}from"./CForm-w6XIb02x.js";import{C as j,a as u}from"./CInputGroupText-P31hptYY.js";import{c as k,a as I}from"./cil-user-Dlmw-Gem.js";import{C as g}from"./CFormInput-Bd3bcSFW.js";import"./CFormControlWrapper-CObUvOP_.js";import"./CFormControlValidation-1FHZm8X5.js";import"./CFormLabel-Dc_uzIQC.js";const z=()=>{const[n,C]=t.useState(""),[l,y]=t.useState(""),[c,r]=t.useState(""),f=b(),N=async s=>{s.preventDefault(),r("");try{const a=await fetch("http://localhost:1000/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:l})}),d=await a.json();a.ok?(localStorage.setItem("token",d.token),f("/dashboard")):r(d.error||"Login failed, please try again")}catch{r("Network error, please try again later.")}};return e.jsx("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:e.jsx(v,{children:e.jsx(p,{className:"justify-content-center",children:e.jsx(i,{md:8,children:e.jsxs(L,{children:[e.jsx(x,{className:"p-4",children:e.jsx(h,{children:e.jsxs(S,{onSubmit:N,children:[e.jsx("h1",{children:"Login"}),e.jsx("p",{className:"text-body-secondary",children:"Sign In to your account"}),c&&e.jsx("div",{className:"text-danger mb-3",children:c}),e.jsxs(j,{className:"mb-3",children:[e.jsx(u,{children:e.jsx(m,{icon:k})}),e.jsx(g,{value:n,onChange:s=>C(s.target.value),placeholder:"Email",autoComplete:"email"})]}),e.jsxs(j,{className:"mb-4",children:[e.jsx(u,{children:e.jsx(m,{icon:I})}),e.jsx(g,{type:"password",value:l,onChange:s=>y(s.target.value),placeholder:"Password",autoComplete:"current-password"})]}),e.jsxs(p,{children:[e.jsx(i,{xs:6,children:e.jsx(o,{type:"submit",color:"primary",className:"px-4",children:"Login"})}),e.jsx(i,{xs:6,className:"text-right",children:e.jsx(o,{color:"link",className:"px-0",children:"Forgot password?"})})]})]})})}),e.jsx(x,{className:"text-white bg-primary py-5",style:{width:"44%"},children:e.jsx(h,{className:"text-center",children:e.jsxs("div",{children:[e.jsx("h2",{children:"Sign up"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),e.jsx(w,{to:"/register",children:e.jsx(o,{color:"primary",className:"mt-3",active:!0,tabIndex:-1,children:"Register Now!"})})]})})})]})})})})})};export{z as default};
