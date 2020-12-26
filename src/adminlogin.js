const width = screen.width;
let a = document.querySelector('.css');
if (width >= 1200) {
    a.removeAttribute("href");
    a.setAttribute("href","src/adminloginXL.css");
}