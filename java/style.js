
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notification = document.createElement("div");
        notification.classList.add("notification", type);
        notification.innerText = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Buscador de productos
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll(".producto").forEach(producto => {
            const title = producto.querySelector("h3").innerText.toLowerCase();
            producto.style.display = title.includes(term) ? "block" : "none";
        });
    });

    // Animaciones de hover en productos
    document.querySelectorAll(".producto").forEach(producto => {
        producto.addEventListener("mouseenter", () => {
            producto.style.transform = "scale(1.05)";
            producto.style.transition = "0.3s";
        });
        producto.addEventListener("mouseleave", () => {
            producto.style.transform = "scale(1)";
        });
    });


    // Sección Thingiverse
    const thingiverseSection = document.querySelector(".thingiverse");
    if (thingiverseSection) {
        thingiverseSection.style.opacity = "1";
        thingiverseSection.style.transform = "translateY(0)";
    }

    const btnThingiverse = document.querySelector(".btn-thingiverse");
    if (btnThingiverse) {
        btnThingiverse.addEventListener("mouseenter", () => {
            btnThingiverse.style.transform = "scale(1.1)";
            btnThingiverse.style.transition = "0.3s";
        });

        btnThingiverse.addEventListener("mouseleave", () => {
            btnThingiverse.style.transform = "scale(1)";
        });
    }

    // Sección de encabezado y menú desplegable
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Cambio de fondo en scroll
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // Menú desplegable en móviles
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Enviar formulario de contacto
    document.querySelector("form")?.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que la página se recargue

        const serviceID = "service_25qvob4"; // Reemplaza con tu Service ID
        const templateID = "template_jatz9ir"; // Reemplaza con tu Template ID

        const params = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            mensaje: document.getElementById("mensaje").value,
            date: document.getElementById("date").value,
            archivo: document.getElementById("archivo").value,
        };

        emailjs.send(serviceID, templateID, params)
            .then(response => {
                alert("📩 ¡Mensaje enviado con éxito!");
                document.querySelector("form").reset();
            })
            .catch(error => {
                console.error("❌ Error al enviar el correo:", error);
                alert("⚠️ Hubo un problema al enviar el mensaje.");
            });
    });

    let currentPage = 1;
    const productsPerPage = 8;
    
    const products = [
      { name: "Llavero", price: "$5", image: "img/llavero.jpg" },
      { name: "Pulpo", price: "$2", image: "img/pulpo2.jpg" },
      { name: "Pistola De 6 Discos", price: "$55", image: "img/pistola6disco.jpg" },
      { name: "Sudadera con capucha", price: "$40", image: "https://via.placeholder.com/150" },
      { name: "Chaqueta de mezclilla", price: "$60", image: "https://via.placeholder.com/150" },
      { name: "Gorra negra", price: "$12", image: "https://via.placeholder.com/150" },
      { name: "Bolso de mano", price: "$25", image: "https://via.placeholder.com/150" },
      { name: "Reloj digital", price: "$70", image: "https://via.placeholder.com/150" },
      { name: "Lentes de sol", price: "$20", image: "https://via.placeholder.com/150" },
      { name: "Bufanda de lana", price: "$18", image: "https://via.placeholder.com/150" },
      { name: "Cinturón de cuero", price: "$22", image: "https://via.placeholder.com/150" },
      { name: "Zapatos de vestir", price: "$80", image: "https://via.placeholder.com/150" }
    ];
    
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    function displayProducts(page) {
      const container = document.getElementById("product-container");
      container.innerHTML = "";
      container.style.display = "grid";
      container.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
      container.style.gap = "1.5rem";
      container.style.padding = "2rem";
    
      const start = (page - 1) * productsPerPage;
      const end = Math.min(start + productsPerPage, totalProducts);
    
      for (let i = start; i < end; i++) {
        const productData = products[i];
    
        const product = document.createElement("div");
        product.className = "product";
        product.style.background = "#f3f4f6";
        product.style.borderRadius = "12px";
        product.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        product.style.padding = "1rem";
        product.style.textAlign = "center";
    
        product.innerHTML = `
          <img src="${productData.image}" alt="${productData.name}" class="product-image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 0.5rem;" />
          <h3 class="product-name" style="font-size: 1.1rem; color: #1f2937;">${productData.name}</h3>
          <p class="product-price" style="color: #10b981; font-weight: bold;">${productData.price}</p>
        `;
    
        container.appendChild(product);
      }
    }
    
    function setupPagination() {
      const paginationContainer = document.getElementById("pagination");
      paginationContainer.innerHTML = "";
      paginationContainer.style.textAlign = "center";
      paginationContainer.style.marginBottom = "2rem";
    
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.className = "page-link";
        button.dataset.page = i;
        button.textContent = i;
    
        button.style.margin = "0 5px";
        button.style.padding = "0.5rem 1rem";
        button.style.border = "none";
        button.style.borderRadius = "8px";
        button.style.backgroundColor = "#3b82f6";
        button.style.color = "white";
        button.style.cursor = "pointer";
        button.style.fontWeight = "bold";
        button.style.transition = "0.3s";
    
        button.addEventListener("mouseenter", () => {
          button.style.backgroundColor = "#2563eb";
        });
        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "#3b82f6";
        });
    
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const scrollPosition = window.scrollY;
    
          const page = parseInt(e.target.dataset.page);
          if (!isNaN(page)) {
            currentPage = page;
            displayProducts(currentPage);
            window.scrollTo(0, scrollPosition);
          }
        });
    
        paginationContainer.appendChild(button);
      }
    }
    
    // Inicialización
    setupPagination();
    displayProducts(currentPage);