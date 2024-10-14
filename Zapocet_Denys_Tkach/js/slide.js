const initSlider =()=>{
    const imgGalerie = document.querySelector(".slider .img-galerie");
    const slideTlacitka = document.querySelectorAll(".slider .slide-tlacitko");
    const Scroll = document.querySelector(".conteiner .scroll");
    const scrollBar = Scroll.querySelector(".scroll-bar");
    const maxScrollLeft = imgGalerie.scrollWidth -imgGalerie.clientWidth;

    scrollBar.addEventListener("mousedown", (e) =>{
        const startX = e.clientX;
        const BarPosition = scrollBar.offsetLeft;
        const maxBarPosition = Scroll.getBoundingClientRect().width- scrollBar.offsetWidth;

        const handleMouseMove =(e) =>{
            const deltaX =e.clientX - startX;
            const newBarPosition = BarPosition + deltaX;

            const boundPosition = Math.max(0, Math.min(maxBarPosition, newBarPosition));
            const scrollPosition = (boundPosition / maxBarPosition) * maxScrollLeft;

            scrollBar.style.left = `${boundPosition}px`;
            imgGalerie.scrollLeft = scrollPosition;
            
        }

        const handleMouseup =() =>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseup);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseup);
    });

    slideTlacitka.forEach(button =>{
        button.addEventListener("click", () => {
            const direction = button.id === "prev" ? -1 : 1;
            const scrollAmout = imgGalerie.clientWidth * direction;
            imgGalerie.scrollBy({left: scrollAmout, behavior: "smooth"});
        });
    });

    

    const handleSlideButtons = () =>{
        slideTlacitka[0].style.display = imgGalerie.scrollLeft <= 0 ? "none" :"flex";
        slideTlacitka[1].style.display = imgGalerie.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    const updateScrollBarPosition = () =>{
        const scrollPosition = imgGalerie.scrollLeft;
        const BarPosition =(scrollPosition/ maxScrollLeft)* (Scroll.clientWidth -
        scrollBar.offsetWidth);
        scrollBar.style.left = `${BarPosition}px`;
    }

    imgGalerie.addEventListener("scroll", () =>{
        updateScrollBarPosition();
        handleSlideButtons();
    });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);