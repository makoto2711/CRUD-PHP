window.addEventListener("DOMContentLoaded", () => 
{
        "use strict"
        const $form = document.getElementById("form")
        const $template = document.getElementById("template").content
        const $fragmento = document.createDocumentFragment()
        const $tbody = document.getElementById("tbody")

        const $t = document.getElementById("title")
        const $b = document.getElementById("body")
        const $btn = document.getElementById("btn")

        let clonar = null, process = null, id_edit = null, booleano = false;

        const tr = document.createElement("tr")
        const th = document.createElement("th")
        th.colSpan = "4"
        th.classList.add("py-5")
        const div = document.createElement("div")
        div.classList.add("text-center")
        const div2 = document.createElement("div")
        div2.classList.add("spinner-border")
       
        mostrar();

        $form.addEventListener("submit", e => 
        {
            e.preventDefault();
            !booleano ? guardar($form) : editarFila($form)
            $form.reset();
        });


        window.addEventListener("click", e => 
        {
            const objetivo = e.target
  
            if (objetivo.classList.contains("btn-warning") || objetivo.classList.contains("btn-danger")) 
            {
                const id_db = e.target.parentNode.parentNode.querySelector(".id").textContent

                switch (objetivo.textContent)
                {
                    case "Editar":  editar(id_db);  break;
                    case "Borrar":  borrar(id_db); break;
                }
            }
        });


        async function editar(id) 
        {
            const sabe = process.filter( item => item.id == id)
            id_edit = sabe[0].id
            $t.value = sabe[0].title
            $b.value = sabe[0].body
            $btn.textContent = "Actualizar"
            booleano = true
        }


        async function editarFila($form) 
        {
            const datos = new FormData($form)
            const update_title = datos.get("title")
            const update_body = datos.get("body")

            const send = await fetch("update.php",
                {
                    method: "POST",
                    body: JSON.stringify({
                            id_edit,
                            update_title,
                            update_body,
                    })
                });

            const rpta = await send.json()    
          
            if (rpta == "actualizado") mostrar()
            else 
            {
                alert("error")
                console.log(rpta);
            }

            $btn.textContent = "Enviar"
            booleano = false
        }

 
        async function borrar(id) 
        {
            Swal.fire({
                        title: 'Estas seguro que quieres borrarlo?',
                        showCancelButton: true,
                        confirmButtonText: `Save`, 
                    })
            .then(async (result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) 
                        {
                            const data = await fetch("delete.php", {
                                method: "POST",
                                body: id
                            });

                            const rpta = await data.json()

                            if (rpta == "good") 
                            {
                                Swal.fire('Nice!', 'Se elimino correctamente', 'success')
                                mostrar();
                            }
                            else  alert("HUBO UN ERROR")
                        } 
                    })
        }

 
        async function guardar($form)
        {
            const datos = new FormData($form);
            const send = await fetch("prepared.php",
                {
                    method: "POST",
                    body: datos
                });
            
            const pro = await send.json()
                
            switch (pro)
            {
                case "empty":
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Rellena todos los campos!',
                            });
                    break;
                    
                case "good":
                            Swal.fire({
                                icon: 'success',
                                title: 'Nice..',
                                text: 'Datos guardados!',
                            });

                             mostrar();
                    break;

                default: alert("ALGO FALLO")
            }
        }


        async function mostrar() 
        {
            while ($tbody.firstChild) $tbody.removeChild($tbody.firstChild)

            loadingData()
            const data = await fetch("fetch.php")
            process = await data.json()
            tr.remove()

            process.forEach(item => 
            {
                clonar = $template.cloneNode(true);
                clonar.querySelector(".id").textContent = item.id
                clonar.querySelector(".t").textContent = item.title
                clonar.querySelector(".b").textContent = item.body
                $fragmento.appendChild(clonar)
            });

            $tbody.appendChild($fragmento);
        }


        function loadingData() 
        {
            tr.appendChild(th)
            th.appendChild(div)
            div.appendChild(div2)
            $fragmento.appendChild(tr)
            $tbody.appendChild($fragmento)
        }
});