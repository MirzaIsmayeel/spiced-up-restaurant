let menu = document.querySelector(".menu")
let close = document.querySelector(".close")
let sidebar = document.querySelector("#sidebar")
let layer = document.querySelector("#layer")
let navbtn = document.querySelector(".nav-btn")
let sidebtn = document.querySelector(".side-btn")
let sidehome = document.querySelector("#home")
let sideabout = document.querySelector("#about")
let sidetestimonial = document.querySelector("#testimo")
let sidecontact = document.querySelector("#contact")
// click on menu icon to open sidebar
menu.addEventListener("click", function open() {
   sidebar.classList.toggle("sidebar-open")
   layer.classList.add("layer-open")
   document.body.style.overflow = "hidden"
}
)
// Sidebar onclick remove function
let sidebarremover =()=>{
   layer.classList.toggle("layer-open")
   sidebar.classList.toggle("sidebar-open")
   document.body.style.overflow ="auto"
}
sidehome.addEventListener("click",sidebarremover)
sideabout.addEventListener("click",sidebarremover)
sidetestimonial.addEventListener("click",sidebarremover)
sidecontact.addEventListener("click",sidebarremover)
// Open function that is used to open and close the sidebar
let open = (key)=>{
   layer.classList.toggle("layer-open")
   sidebar.classList.toggle("sidebar-open")
   document.body.style.overflow = "auto"
}
// click on close icon to close sidebar
close.addEventListener("click",open)
document.addEventListener("keydown",function close(event) {
  if(event.key === "Escape"){
   open()
  }
})
// click on layer icon to close sidebar
layer.addEventListener("click", open)
// navbar to redirect menu section
navbtn.addEventListener("click", ()=>{
   window.location.href = "menu.html"
})
// sidebar to redirect menu section
sidebtn.addEventListener("click", ()=>{
   window.location.href = "menu.html"
})