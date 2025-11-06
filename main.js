document.addEventListener('DOMContentLoaded', function() {
    // Toggle hamburger menu 
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        menu.classList.toggle('active');
        
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        this.setAttribute('aria-label', isExpanded ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });
}

// Tutup menu ketika klik di luar
document.addEventListener('click', function(e) {
    if (menu.classList.contains('active') && 
        !e.target.closest('.menu') && 
        !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Buka menu navigasi');
    }
});

document.querySelectorAll('.dropdown1, .dropdown2').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

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

            const whatsappNumber = '625641111877';
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
    const ppdbForm = document.getElementById('ppdbForm');
    if (ppdbForm) {
        // ...existing code...
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
// Form validation for PPDB.html//

document.getElementById("ppdbForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll("#ppdbForm [required]");
    let valid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            valid = false;
            input.style.borderColor = "red";
        } else {
            input.style.borderColor = "#ccc";
        }
    });

    if (!valid) {
        alert("⚠️ Harap isi semua field wajib!");
        return;
    }

    // Ambil data form
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Kirim ke backend
    try {
        const res = await fetch('/api/ppdb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert('✅ Pendaftaran berhasil! Data sudah tersimpan.');
            this.reset();
        } else {
            alert('❌ Gagal menyimpan data: ' + (result.message || 'Unknown error'));
        }
    } catch (err) {
        alert('❌ Gagal mengirim data ke server.');
    }
});
});

// KLIK GAMBAR THUMBNAIL DI GALERI //

function changeImage(element) {
   
    const caption = element.getAttribute('data-caption');
    const mainImage = document.getElementById('mainImage');
    mainImage.src = element.src;
    mainImage.alt = element.alt;
    
    document.getElementById('imageCaption').textContent = caption;

    const thumbnails = document.querySelectorAll('.thumbnail-row img');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail-row img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            changeImage(this);
        });
    });
});


// STAF PENGAJAR SLIDE SHOW //

document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.staff-slideshow-container');
    const slides = document.querySelectorAll('.staff-slide');
    const dotsContainer = document.querySelector('.slideshow-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // Generate dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-slide', i);
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }
        
        const offset = -currentSlide * 100;
        slideshowContainer.style.transform = `translateX(${offset}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
        
        resetAutoPlay();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 3000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Klik dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    // Swipe gesture (mobile)
    let startX = 0;
    let endX = 0;
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slideshowContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            goToSlide(currentSlide + 1); // geser kiri → next
        } else if (endX - startX > 50) {
            goToSlide(currentSlide - 1); // geser kanan → prev
        }
    });

    // Drag gesture (desktop)
    let isDragging = false;
    let dragStartX = 0;

    slideshowContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
    });

    slideshowContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        let dragEndX = e.clientX;

        if (dragStartX - dragEndX > 50) {
            goToSlide(currentSlide + 1);
        } else if (dragEndX - dragStartX > 50) {
            goToSlide(currentSlide - 1);
        }
    });

    // tampilkan slide pertama dulu
    goToSlide(0);

    // Auto play jalan
    startAutoPlay();


    // Pause saat hover
    const slideshow = document.querySelector('.staff-slideshow');
    slideshow.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    slideshow.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
});

// fasilitas 
  const fasilitasContainer = document.querySelector('.fasilitas-container');
  const fasilitasItems = document.querySelectorAll('.fasilitas-item');
  const nextBtn = document.querySelector('.fasilitas-next');
  const prevBtn = document.querySelector('.fasilitas-prev');

  let currentIndex = 0;
  const visibleItems = 2; // jumlah fasilitas yang tampil sekaligus
  let autoPlayInterval;

  function updateSlider() {
    const itemWidth = fasilitasItems[0].offsetWidth + 20; // lebar item + jarak antar item
    fasilitasContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  function nextSlide() {
    if (currentIndex < fasilitasItems.length - visibleItems) {
      currentIndex++;
    } else {
      currentIndex = 0; // kembali ke awal
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = fasilitasItems.length - visibleItems; // ke akhir
    }
    updateSlider();
  }

  // Klik tombol navigasi manual
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay(); // reset waktu autoplay biar gak bentrok
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Autoplay otomatis setiap 4 detik
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  // Hentikan sementara saat user hover (biar user bisa baca teks)
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Reset autoplay setelah user interaksi
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  fasilitasContainer.addEventListener('mouseenter', stopAutoPlay);
  fasilitasContainer.addEventListener('mouseleave', startAutoPlay);

  // Jalankan autoplay pertama kali
  startAutoPlay();

  // Responsif: reset posisi saat resize
  window.addEventListener('resize', updateSlider);


