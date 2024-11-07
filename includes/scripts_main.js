document.addEventListener("DOMContentLoaded", function() {
    const visitDate = document.getElementById("visitDate");
    const todayCheckbox = document.getElementById("todayCheckbox");
    const carBrand = document.getElementById("carBrand");
    const carModel = document.getElementById("carModel");
    const serviceProvided = document.getElementById("serviceProvided");
  
    // Handle "Hoy" checkbox functionality
    todayCheckbox.addEventListener("change", () => {
      if (todayCheckbox.checked) {
        visitDate.valueAsDate = new Date();
        visitDate.disabled = true;
      } else {
        visitDate.value = "";
        visitDate.disabled = false;
      }
    });
  
    // Load car brands and models
    fetch("../json/brands.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(brand => {
          const option = document.createElement("option");
          option.value = brand.name;
          option.textContent = brand.name;
          carBrand.appendChild(option);
        });
      });
  
    carBrand.addEventListener("change", function() {
      carModel.innerHTML = "<option value=''>Seleccione un modelo</option>";
      fetch("../json/brands.json")
        .then(response => response.json())
        .then(data => {
          const selectedBrand = data.find(brand => brand.name === carBrand.value);
          if (selectedBrand) {
            selectedBrand.models.forEach(model => {
              const option = document.createElement("option");
              option.value = model;
              option.textContent = model;
              carModel.appendChild(option);
            });
          }
        });
    });
  
    // Load services as checkboxes
    fetch("../json/services.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(service => {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `service-${service.name}`;
          checkbox.name = "serviceProvided";
          checkbox.value = service.name;
  
          const label = document.createElement("label");
          label.htmlFor = `service-${service.name}`;
          label.textContent = service.name;
  
          const container = document.createElement("div");
          container.classList.add("service-option");
          container.appendChild(checkbox);
          container.appendChild(label);
  
          serviceProvided.appendChild(container);
        });
      });
  
    // Form submission
    document.getElementById("visitForm").addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Gather selected services
      const selectedServices = Array.from(document.querySelectorAll('input[name="serviceProvided"]:checked'))
                                    .map(checkbox => checkbox.value);
  
      const formData = {
        visitDate: visitDate.value,
        fullName: document.getElementById("fullName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        birthDate: document.getElementById("birthDate").value,
        licensePlate: document.getElementById("licensePlate").value,
        carBrand: carBrand.value,
        carModel: carModel.value,
        serviceProvided: selectedServices,
        mileage: document.getElementById("mileage").value,
        observations: document.getElementById("observations").value
      };
  
      console.log("JSON Data to Send:", JSON.stringify(formData));
      // Aquí puedes implementar la lógica para enviar el JSON a una hoja de cálculo
    });
  });
  