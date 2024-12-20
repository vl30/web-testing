    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        document.querySelector('.scroll-progress').style.height = `${scrollPercentage}%`;
    });

    document.addEventListener('mousemove', (e) => {
        const icons = document.querySelectorAll('.floating-icon');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        icons.forEach(icon => {
            const speed = parseFloat(icon.getAttribute('data-speed') || 1);
            const x = (mouseX - 0.5) * 100 * speed;
            const y = (mouseY - 0.5) * 100 * speed;
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    let currentPosition = 0;
    const wrapper = document.querySelector('.gallery-wrapper');
    const cards = document.querySelectorAll('.experience-card');
    const cardWidth = cards[0].offsetWidth + 40; 

    function slideGallery(direction) {
        const maxPosition = -(cards.length * cardWidth - document.querySelector('.gallery-container').offsetWidth);
        
        if (direction === 'next') {
            currentPosition = Math.max(currentPosition - cardWidth, maxPosition);
        } else {
            currentPosition = Math.min(currentPosition + cardWidth, 0);
        }

        wrapper.style.transform = `translateX(${currentPosition}px)`;
    }

    
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    wrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            slideGallery('next');
        } else if (touchEndX - touchStartX > 50) {
            slideGallery('prev');
        }
    });

    document.querySelectorAll('.animated-circle').forEach(circle => {
        setInterval(() => {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        }, 5000);
    });

    const audio = document.getElementById('audio');
    const musicDisc = document.querySelector('.music-disc');
    const playPauseBtn = document.getElementById('playPauseBtn');
    let isPlaying = false;

    const playlist = [
        { title: 'kamu & kenangan', artist: 'Maudy ayunda', url: 'https://youtu.be/7oV2ctudwrg?si=W-1l6c8l5O7hT1ZQ' },
        { title: 'blue', artist: 'Yung kai', url: 'https://example.com/song2.mp3' },
        { title: 'my heart', artist: 'Acha septriasa, irwansyah', url: 'https://example.com/song3.mp3' }
    ];

    let currentTrackIndex = 0;

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            musicDisc.classList.remove('playing');
            playPauseBtn.textContent = '▶️';
        } else {
            audio.play();
            musicDisc.classList.add('playing');
            playPauseBtn.textContent = '⏸️';
        }
        isPlaying = !isPlaying;
    }

    function updateTrackInfo() {
        const currentTrack = playlist[currentTrackIndex];
        document.querySelector('.music-title').textContent = currentTrack.title;
        document.querySelector('.music-artist').textContent = currentTrack.artist;
        audio.src = currentTrack.url;
        if (isPlaying) {
            audio.play();
        }
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        updateTrackInfo();
    }

    function previousTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        updateTrackInfo();
    }

    // Handle audio events
    audio.addEventListener('ended', () => {
        nextTrack();
    });


    