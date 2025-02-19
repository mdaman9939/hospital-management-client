import{r as m,j as e}from"./index-C8M8d5TP.js";import{C as u,a as n}from"./CRow-DwbOyR1O.js";import{C as T,a as q}from"./CCardBody-BC-1MHGB.js";import{C as g}from"./CCardHeader-Cy4Bd0Ol.js";import{C as N}from"./CForm-w6XIb02x.js";import{C as h}from"./CFormLabel-Dc_uzIQC.js";import{C as x}from"./CFormInput-Bd3bcSFW.js";import{a as C}from"./index.esm-D35apfu2.js";import{C as F,a as w,b as j,c as i,d as E,e as a}from"./CTable-DhOiOdMA.js";import"./CFormControlWrapper-CObUvOP_.js";import"./CFormControlValidation-1FHZm8X5.js";const U=()=>{const[c,v]=m.useState([]),[r,p]=m.useState({description:"",quantity:1,rate:0}),[y,S]=m.useState(0),b=()=>{const t=[...c,{...r,total:r.quantity*r.rate}];v(t),f(t),p({description:"",quantity:1,rate:0})},f=t=>{const s=t.reduce((o,d)=>o+d.total,0);S(s)},l=t=>{const{name:s,value:o}=t.target;p(d=>({...d,[s]:o}))};return e.jsx(u,{children:e.jsx(n,{xs:12,children:e.jsxs(T,{className:"mb-4",children:[e.jsx(g,{children:e.jsx("strong",{children:"Invoice Generation"})}),e.jsxs(q,{children:[e.jsx(N,{children:e.jsxs(u,{children:[e.jsxs(n,{md:4,children:[e.jsx(h,{htmlFor:"description",children:"Service Description"}),e.jsx(x,{type:"text",id:"description",name:"description",value:r.description,onChange:l,placeholder:"Enter service description"})]}),e.jsxs(n,{md:2,children:[e.jsx(h,{htmlFor:"quantity",children:"Quantity"}),e.jsx(x,{type:"number",id:"quantity",name:"quantity",value:r.quantity,onChange:l,min:"1",placeholder:"Enter quantity"})]}),e.jsxs(n,{md:3,children:[e.jsx(h,{htmlFor:"rate",children:"Rate per Unit"}),e.jsx(x,{type:"number",id:"rate",name:"rate",value:r.rate,onChange:l,min:"0",placeholder:"Enter rate"})]}),e.jsx(n,{md:3,className:"d-flex align-items-end",children:e.jsx(C,{color:"primary",onClick:b,className:"w-100",children:"Add Service"})})]})}),e.jsxs("div",{className:"mt-4",children:[e.jsx("h5",{children:"Services"}),e.jsxs(F,{striped:!0,hover:!0,responsive:!0,children:[e.jsx(w,{children:e.jsxs(j,{children:[e.jsx(i,{children:"#"}),e.jsx(i,{children:"Service Description"}),e.jsx(i,{children:"Quantity"}),e.jsx(i,{children:"Rate"}),e.jsx(i,{children:"Total"})]})}),e.jsxs(E,{children:[c.map((t,s)=>e.jsxs(j,{children:[e.jsx(a,{children:s+1}),e.jsx(a,{children:t.description}),e.jsx(a,{children:t.quantity}),e.jsxs(a,{children:["$",t.rate]}),e.jsxs(a,{children:["$",t.total]})]},s)),c.length===0&&e.jsx(j,{children:e.jsx(a,{colSpan:"5",className:"text-center",children:"No services added"})})]})]})]}),e.jsxs("div",{className:"text-end mt-3",children:[e.jsxs("h5",{children:["Total Amount: $",y.toFixed(2)]}),e.jsx(C,{color:"success",children:"Generate Invoice"})]})]})]})})})};export{U as default};
