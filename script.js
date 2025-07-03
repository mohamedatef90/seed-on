// Only keep code that is referenced or needed for the current index.html functionality
// (This file is intentionally left blank as all interactive code is now in index.html or not needed for the current page.) 

document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.getElementById('mainNavbar');
  const scrollThreshold = 100; // Start changing navbar after 100px scroll
  
  function handleNavbarScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll);
  
  // Services view more functionality (show 6 by default)
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const serviceItems = document.querySelectorAll('.service-item');
  let isExpanded = false;
  let defaultVisible = 6;
  
  function updateServiceVisibility() {
    serviceItems.forEach((item, idx) => {
      if (idx < defaultVisible) {
        item.classList.remove('service-hidden');
        item.classList.add('show');
      } else {
        if (!isExpanded) {
          item.classList.add('service-hidden');
          item.classList.remove('show');
        } else {
          item.classList.remove('service-hidden');
          setTimeout(() => item.classList.add('show'), (idx-defaultVisible)*100);
        }
      }
    });
    if (viewMoreBtn) viewMoreBtn.textContent = isExpanded ? 'عرض أقل' : 'عرض المزيد';
  }
  
  if (viewMoreBtn) {
    updateServiceVisibility();
    viewMoreBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      updateServiceVisibility();
    });
  }
  
  // Get Service button functionality
  const serviceContactModal = document.getElementById('serviceContactModal');
  const serviceContactService = document.getElementById('serviceContactService');
  document.querySelectorAll('.get-service').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const card = this.closest('.service-card');
      if (card && serviceContactService) {
        const title = card.querySelector('.card-title')?.textContent || '';
        serviceContactService.value = title;
      }
      if (serviceContactModal) {
        const modal = new bootstrap.Modal(serviceContactModal);
        modal.show();
      }
    });
  });
  
  // Service contact form handling
  const serviceContactForm = document.getElementById('serviceContactForm');
  if (serviceContactForm) {
    serviceContactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('serviceContactName').value;
      const email = document.getElementById('serviceContactEmail').value;
      const mobile = document.getElementById('serviceContactMobile').value;
      const service = document.getElementById('serviceContactService').value;
      if (!name || !email || !mobile) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
      }
      const mobileRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
      if (!mobileRegex.test(mobile.replace(/\s/g, ''))) {
        alert('يرجى إدخال رقم جوال صحيح');
        return;
      }
      // Success feedback
      const submitBtn = serviceContactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>تم الإرسال بنجاح';
      submitBtn.disabled = true;
      serviceContactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        const modal = bootstrap.Modal.getInstance(serviceContactModal);
        if (modal) modal.hide();
      }, 2500);
      // Here you would typically send the data to your server
      console.log('Service form submitted:', { name, email, mobile, service });
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - (navbar.classList.contains('scrolled') ? 80 : 20);
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      }
      // If not an anchor link, let the browser navigate normally
    });
  });
  
  // Active navigation state on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const mobile = document.getElementById('contactMobile').value;
      
      // Basic validation
      if (!name || !email || !mobile) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
      }
      
      // Mobile validation (Saudi format)
      const mobileRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
      if (!mobileRegex.test(mobile.replace(/\s/g, ''))) {
        alert('يرجى إدخال رقم جوال صحيح');
        return;
      }
      
      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>تم الإرسال بنجاح';
      submitBtn.disabled = true;
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
      
      // Here you would typically send the data to your server
      console.log('Form submitted:', { name, email, mobile });
    });
  }
  
  // Service details modal for services page
  const serviceModal = document.getElementById('serviceModal');
  if (serviceModal) {
    const modalTitle = document.getElementById('serviceModalLabel');
    const modalDesc = document.getElementById('serviceModalDesc');
    const modalImg = document.getElementById('serviceModalImg');
    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const card = this.closest('.service-card');
        if (card) {
          modalTitle.textContent = card.getAttribute('data-title');
          modalDesc.textContent = card.getAttribute('data-desc');
          modalImg.src = card.getAttribute('data-img');
          modalImg.alt = card.getAttribute('data-title');
          const modal = new bootstrap.Modal(serviceModal);
          modal.show();
        }
      });
    });
  }
  
  // Project details modal for portfolio page (event delegation)
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    const modalTitle = document.getElementById('projectModalLabel');
    const modalDesc = document.getElementById('projectModalDesc');
    const modalImg = document.getElementById('projectModalImg');
    document.body.addEventListener('click', function(e) {
      const btn = e.target.closest('.view-project-details');
      if (btn) {
        const card = btn.closest('.project-card');
        if (card) {
          modalTitle.textContent = card.getAttribute('data-title');
          modalDesc.textContent = card.getAttribute('data-desc');
          modalImg.src = card.getAttribute('data-img');
          modalImg.alt = card.getAttribute('data-title');
          const modal = new bootstrap.Modal(projectModal);
          modal.show();
          console.log('Project modal opened:', card.getAttribute('data-title'));
        } else {
          console.log('No project card found for modal.');
        }
      }
    });
  }
}); 