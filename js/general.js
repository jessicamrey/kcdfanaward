document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const brand = document.querySelector(".navbar-brand");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const sections = document.querySelectorAll("section[id]");

  const darkSections = ["thanks", "fundraising"];

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
		  		
		navLinks.forEach(link => link.classList.remove("text-warning"));
		navLinks.forEach(link => link.classList.remove("text-warning-br"));
		
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        if (darkSections.includes(id)) {
          navLinks.forEach(link => {
            link.classList.add("nav-link-br");
          });

          brand.classList.add("brand-br");
          brand.classList.remove("brand-white");
		  
		  
		
		navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("text-warning-br");
          }
        });

        } else {
          navLinks.forEach(link => {
            link.classList.add("nav-link");
            link.classList.remove("nav-link-br");
          });

          brand.classList.add("brand-white");
          brand.classList.remove("brand-br");
		  
			navLinks.forEach(link => {
			  if (link.getAttribute("href") === `#${id}`) {
				link.classList.add("text-warning");
			  }
			});
        }

		
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(section => observer.observe(section));
});
