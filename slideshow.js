function automaticSlides(){
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    index++
    if(index > slides.length){
        index = 1;
    }
    slides[index -1].style.display = "block";
    setTimeout(automaticSlides,3000);
}

function showSlides(n){
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {index = 1;}
    if (n < 1) {index = slides.length;}
    for (let i = 0; i < slides.length; i++) {
        console.log("fmm");
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[index-1].style.display = "block";
    dots[index-1].className += " active";
}

let index=1;
showSlides(index);
function plusSlides(n) {
    showSlides(index += n);
    console.log('next');
}
function currentSlide(n) {
    showSlides(index = n);
}
  
  
 //window.onload = showSlides(index);