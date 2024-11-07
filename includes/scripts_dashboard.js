
    const brandsTable = document.querySelector("#brandsTable tbody");
    const servicesTable = document.querySelector("#servicesTable tbody");
  
    // Fetch and display brands and models
    fetch("../json/brands.json")
      .then(response => response.json())
      .then(data => loadBrands(data));
  
    // Fetch and display services
    fetch("../json/services.json")
      .then(response => response.json())
      .then(data => loadServices(data));
  
    // Load brands into table
    function loadBrands(data) {
      brandsTable.innerHTML = "";
      data.forEach((brand, index) => {
        const row = document.createElement("tr");
  
        // Brand name cell
        const brandCell = document.createElement("td");
        const brandInput = document.createElement("input");
        brandInput.type = "text";
        brandInput.value = brand.name;
        brandInput.addEventListener("change", () => updateBrand(index, brandInput.value));
        brandCell.appendChild(brandInput);
  
        // Models cell
        const modelsCell = document.createElement("td");
        brand.models.forEach((model, modelIndex) => {
          const modelInput = document.createElement("input");
          modelInput.type = "text";
          modelInput.value = model;
          modelInput.addEventListener("change", () => updateModel(index, modelIndex, modelInput.value));
          modelsCell.appendChild(modelInput);
        });
        const addModelBtn = document.createElement("button");
        addModelBtn.textContent = "+";
        addModelBtn.addEventListener("click", () => addModel(index));
        modelsCell.appendChild(addModelBtn);
  
        // Actions cell
        const actionsCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar Marca";
        deleteBtn.addEventListener("click", () => deleteBrand(index));
        actionsCell.appendChild(deleteBtn);
  
        row.appendChild(brandCell);
        row.appendChild(modelsCell);
        row.appendChild(actionsCell);
  
        brandsTable.appendChild(row);
      });
    }
  
    // Load services into table
    function loadServices(data) {
      servicesTable.innerHTML = "";
      data.forEach((service, index) => {
        const row = document.createElement("tr");
  
        // Service name cell
        const serviceCell = document.createElement("td");
        const serviceInput = document.createElement("input");
        serviceInput.type = "text";
        serviceInput.value = service.name;
        serviceInput.addEventListener("change", () => updateService(index, serviceInput.value));
        serviceCell.appendChild(serviceInput);
  
        // Actions cell
        const actionsCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar Servicio";
        deleteBtn.addEventListener("click", () => deleteService(index));
        actionsCell.appendChild(deleteBtn);
  
        row.appendChild(serviceCell);
        row.appendChild(actionsCell);
  
        servicesTable.appendChild(row);
      });
    }
  
    // Add, update, and delete functions for brands
    function updateBrand(index, newName) {
      console.log(`Actualizando marca en el índice ${index} a ${newName}`);
    }
  
    function addModel(brandIndex) {
      console.log(`Añadiendo modelo a la marca en el índice ${brandIndex}`);
    }
  
    function updateModel(brandIndex, modelIndex, newModel) {
      console.log(`Actualizando modelo en índice ${modelIndex} de la marca ${brandIndex} a ${newModel}`);
    }
  
    function deleteBrand(index) {
      if (brandsTable.rows.length > 1) {
        console.log(`Eliminando marca en el índice ${index}`);
      } else {
        alert("Debe haber al menos una marca en la lista.");
      }
    }
  
    // Add, update, and delete functions for services
    function updateService(index, newName) {
      console.log(`Actualizando servicio en el índice ${index} a ${newName}`);
    }
  
    function deleteService(index) {
      if (servicesTable.rows.length > 1) {
        console.log(`Eliminando servicio en el índice ${index}`);
      } else {
        alert("Debe haber al menos un servicio en la lista.");
      }
    }
  
    document.getElementById("addBrandBtn").addEventListener("click", () => {
      console.log("Añadiendo nueva marca");
    });
  
    document.getElementById("addServiceBtn").addEventListener("click", () => {
      console.log("Añadiendo nuevo servicio");
    });

  