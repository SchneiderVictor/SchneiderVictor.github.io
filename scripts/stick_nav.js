// JavaScript source code
"use strict"

let navBar = document.querySelector(".oldNav");

const sticky = document.querySelector("#stickyNavContainer").offsetTop;

window.onscroll = function () {
    if (window.pageYOffset >= sticky) {
        navBar.classList.remove("oldNav");
        navBar.classList.add("stickyNav");
    } else {
        navBar.classList.add("oldNav");
        navBar.classList.remove("stickyNav");
        
    }
}