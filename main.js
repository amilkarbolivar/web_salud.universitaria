function slider() {
    const contenedor_slider = document.querySelector(".contenedor2");
     const contenedor1= document.querySelectorAll(".contenedor1")
    const boton_left = document.querySelector(".izq");
    const boton_right = document.querySelector(".derecha");

    let desplazamiento = 0; // Valor inicial de desplazamiento
    let contador =contenedor1.length*100;
    boton_right.addEventListener("click", () => {
        console.log("contador: "+contador+"despla: "+desplazamiento);
        if(desplazamiento!=-300){
        desplazamiento -= 100; // Mueve 100px hacia la izquierda
        contenedor_slider.style.transform = `translateX(${desplazamiento}%)`;
        }else{
            console.log("desplazamiaento bloqueado")
        } // Aplicar el desplazamiento en píxeles
    });

    boton_left.addEventListener("click", () => {
        console.log("contador: "+contador+"despla: "+desplazamiento);
        if(desplazamiento!=0){
        desplazamiento += 100; // Mueve 100px hacia la izquierda
        contenedor_slider.style.transform = `translateX(${desplazamiento}%)`;
        }else{
            console.log("desplazamiaento bloqueado")
        } // Aplicar el desplazamiento en píxeles
    });
}

slider();

