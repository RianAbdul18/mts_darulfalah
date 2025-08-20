document.addEventListener('DOMContentLoaded', function() {
    // Toggle hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
            hamburger.setAttribute('aria-label', hamburger.classList.contains('active') ? 'Tutup menu navigasi' : 'Buka menu navigasi');
        });
    }

    // Toggle dropdown1 submenu on click
    const dropdowns1 = document.querySelectorAll('.dropdown1');
    dropdowns1.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            link.setAttribute('aria-expanded', dropdown.classList.contains('active'));
            document.querySelectorAll('.dropdown2').forEach(d => d.classList.remove('active'));
        });
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
                link.setAttribute('aria-expanded', dropdown.classList.contains('active'));
            }
        });
    });

    // Toggle dropdown2 submenu on click
    const dropdowns2 = document.querySelectorAll('.dropdown2');
    dropdowns2.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            link.setAttribute('aria-expanded', dropdown.classList.contains('active'));
            document.querySelectorAll('.dropdown1').forEach(d => d.classList.remove('active'));
        });
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
                link.setAttribute('aria-expanded', dropdown.classList.contains('active'));
            }
        });
    });

    // Close all submenus function
    function closeAllSubmenus() {
        [dropdowns1, dropdowns2].forEach(dropdowns => {
            dropdowns.forEach(d => {
                d.classList.remove('active');
                const link = d.querySelector('a');
                if (link) link.setAttribute('aria-expanded', 'false');
            });
        });
        if (window.innerWidth <= 768 && hamburger && menu) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            hamburger.setAttribute('aria-label', 'Buka menu navigasi');
        }
    }

    // Handle submenu1 clicks
    const submenu1Links = document.querySelectorAll('.submenu1 a');
    submenu1Links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = link.getAttribute('href');
            const targetId = href.split('#')[1];
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                document.querySelectorAll('[class*="profile-section-"]').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active');
                });
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, null, `#${targetId}`);
            } else {
                window.location.href = href;
            }
            closeAllSubmenus();
        });
    });

    // Handle submenu2 clicks
    const submenu2Links = document.querySelectorAll('.submenu2 a');
    submenu2Links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = link.getAttribute('href');
            const targetId = href.split('#')[1];
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                document.querySelectorAll('.ekskul-section').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active');
                });
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, null, `#${targetId}`);
            } else {
                window.location.href = href;
            }
            closeAllSubmenus();
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown1') && !e.target.closest('.dropdown2')) {
            closeAllSubmenus();
        }
    });

    // Section switching for profil.html
    if (window.location.pathname.includes('profil.html')) {
        const profileSections = document.querySelectorAll('[class*="profile-section-"]');
        if (profileSections.length > 0) {
            profileSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            const hash = window.location.hash.substring(1);
            const targetSection = hash ? document.getElementById(hash) : document.getElementById('profil-sekolah') || profileSections[0];
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Section switching for ekskul.html
    if (window.location.pathname.includes('ekskul.html')) {
        const ekskulSections = document.querySelectorAll('.ekskul-section');
        if (ekskulSections.length > 0) {
            ekskulSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            const hash = window.location.hash.substring(1);
            const targetSection = hash ? document.getElementById(hash) : document.getElementById('pramuka') || ekskulSections[0];
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Slider for index.html
    const sliderContainer = document.querySelector('.slider-container');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    if (sliderContainer && sliderItems.length > 0) {
        const totalImages = sliderItems.length;
        let currentIndex = 0;
        let slideInterval;

        const updateSlider = () => {
            sliderContainer.style.transition = `transform 0.3s ease-in-out`;
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            sliderItems.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
        };

        const slideNext = () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        };

        const slidePrev = () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        };

        const startSlider = () => {
            slideInterval = setInterval(slideNext, 5000);
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        updateSlider();
        startSlider();

        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);

        if (prevButton && nextButton) {
            nextButton.addEventListener('click', () => {
                stopSlider();
                slideNext();
                startSlider();
            });
            prevButton.addEventListener('click', () => {
                stopSlider();
                slidePrev();
                startSlider();
            });
        }

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stopSlider() : startSlider();
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                backToTop.classList.toggle('show', window.scrollY > 300);
            }, 100);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lightbox for galeri.html
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryLinks = document.querySelectorAll('[data-lightbox="gallery"]');
    if (lightbox && lightboxImg && lightboxClose && galleryLinks.length > 0) {
        galleryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                lightboxImg.src = this.href;
                lightboxImg.alt = this.querySelector('img').alt;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        lightbox.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        });
    }

    // Form Validation and WhatsApp Submission for kontak.html
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const feedback = document.getElementById('form-feedback');

            const existingError = contactForm.querySelector('.error-message');
            if (existingError) existingError.remove();

            if (!name || !email || !phone || !message) {
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = 'red';
                errorMsg.textContent = 'Semua kolom harus diisi!';
                errorMsg.setAttribute('aria-live', 'polite');
                contactForm.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = 'red';
                errorMsg.textContent = 'Email tidak valid!';
                errorMsg.setAttribute('aria-live', 'polite');
                contactForm.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
                return;
            }

            const whatsappNumber = '6287818040971';
            const formattedMessage = `*Pesan dari Formulir Kontak MTs Darul Falah*\n` +
                                    `*Nama:* ${name}\n` +
                                    `*Email:* ${email}\n` +
                                    `*Nomor Telepon:* ${phone}\n` +
                                    `*Pesan:* ${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
            window.open(whatsappUrl, '_blank');

            feedback.style.display = 'block';
            feedback.textContent = 'Pesan berhasil disiapkan untuk dikirim ke WhatsApp!';
            contactForm.reset();
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 5000);
        });
    }

    // Form Validation and Submission for daftar.html
    const ppdbForm = document.getElementById('ppdb-form');
    if (ppdbForm) {
        ppdbForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value.trim();
            const birthDate = document.getElementById('birth-date').value.trim();
            const address = document.getElementById('address').value.trim();
            const parentName = document.getElementById('parent-name').value.trim();
            const parentPhone = document.getElementById('parent-phone').value.trim();
            const documents = document.getElementById('documents').files;
            const feedback = document.getElementById('form-feedback');

            const existingError = ppdbForm.querySelector('.error-message');
            if (existingError) existingError.remove();

            if (!fullName || !birthDate || !address || !parentName || !parentPhone || documents.length === 0) {
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = 'red';
                errorMsg.textContent = 'Semua kolom dan dokumen harus diisi!';
                errorMsg.setAttribute('aria-live', 'polite');
                ppdbForm.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
                return;
            }
            if (!/^\d{10,13}$/.test(parentPhone)) {
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = 'red';
                errorMsg.textContent = 'Nomor telepon harus berisi 10-13 angka!';
                errorMsg.setAttribute('aria-live', 'polite');
                ppdbForm.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
                return;
            }

            // Simulasi pengiriman ke WhatsApp (disesuaikan dengan data PPDB)
            const whatsappNumber = '6287818040971';
            const formattedMessage = `*Pendaftaran PPDB MTs Darul Falah*\n` +
                                    `*Nama Lengkap:* ${fullName}\n` +
                                    `*Tanggal Lahir:* ${birthDate}\n` +
                                    `*Alamat:* ${address}\n` +
                                    `*Nama Orang Tua:* ${parentName}\n` +
                                    `*Nomor Telepon Orang Tua:* ${parentPhone}\n` +
                                    `*Jumlah Dokumen:* ${documents.length} file diunggah`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
            window.open(whatsappUrl, '_blank');

            feedback.style.color = 'green';
            feedback.style.display = 'block';
            feedback.textContent = 'Formulir pendaftaran berhasil dikirim!';
            ppdbForm.reset();
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 5000);
        });
    }
    // jerona galeri seperti daftar,dokumentasi,kegiatan //
    let thumbnails = document.querySelectorAll(".thumbnail-row img");
    let mainImage = document.getElementById("mainImage");
    let currentIndex = 0;
    let autoSlide;

    function changeImage(element, manual = false) {
        mainImage.classList.add("fade");

        setTimeout(() => {
            mainImage.src = element.src;

            thumbnails.forEach(img => img.classList.remove("active"));
            element.classList.add("active");

            mainImage.classList.remove("fade");
        }, 400); // setengah durasi transition

        currentIndex = Array.from(thumbnails).indexOf(element);

        if (manual) {
            resetSlideshow();
        }
    }

    function startSlideshow() {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            changeImage(thumbnails[currentIndex]);
        }, 3000);
    }

    function resetSlideshow() {
        clearInterval(autoSlide);
        startSlideshow();
    }

    window.onload = () => {
        startSlideshow();
    };
}); 
