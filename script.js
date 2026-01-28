// 1. CLICK TO ENTER & MUSIC CONTROL
const clickScreen = document.getElementById("click-screen");
const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-control");
const musicIcon = musicBtn.querySelector("i");

// Réglage du volume
audio.volume = 0.25;

// Démarrer la musique au clic sur l'écran d'accueil
clickScreen.addEventListener("click", () => {
    playMusic();
    
    // Disparition de l'écran noir
    clickScreen.style.opacity = "0";
    setTimeout(() => {
        clickScreen.style.display = "none";
    }, 600);
});

// Gérer le clic sur le petit bouton flottant
musicBtn.addEventListener("click", () => {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

// Fonctions utilitaires
function playMusic() {
    audio.play();
    musicBtn.classList.remove("paused");
    musicIcon.classList.remove("fa-play");
    musicIcon.classList.add("fa-pause");
}

function pauseMusic() {
    audio.pause();
    musicBtn.classList.add("paused");
    musicIcon.classList.remove("fa-pause");
    musicIcon.classList.add("fa-play");
}
// Réglage du volume (0.25 = 25%)
audio.volume = 0.25;

clickScreen.addEventListener("click", () => {
    // Tenter de jouer l'audio
    audio.play().catch(err => {
        console.log("Erreur lecture audio:", err);
    });

    // Animation de disparition
    clickScreen.style.opacity = "0";
    
    // Suppression complète après l'animation (600ms)
    setTimeout(() => {
        clickScreen.style.display = "none";
    }, 600);
});


// 2. GESTION DU MENU MOBILE
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

// Ouvrir/Fermer le menu
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});


// 3. EFFET MACHINE À ÉCRIRE (Typewriter)
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Index du mot courant
        const current = this.wordIndex % this.words.length;
        // Mot complet
        const fullTxt = this.words[current];

        // Vérifier si on efface ou on écrit
        if (this.isDeleting) {
            // Effacer
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Écrire
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insérer le texte
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Vitesse d'écriture
        let typeSpeed = 150;

        if (this.isDeleting) {
            typeSpeed /= 2; // Effacer plus vite
        }

        // Si le mot est complet
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait; // Pause à la fin
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500; // Pause avant le nouveau mot
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Lancer le typewriter au chargement
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    if(txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}


// 4. ANIMATION AU SCROLL (Apparition douce)
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85; // Déclenche à 85% de l'écran

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal(); // Lancer une fois au début


// 5. GESTION DU FORMULAIRE (Webhook Make)
const contactForm = document.querySelector('.contact-form');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Remplace l'URL ci-dessous par celle que tu as copiée sur Make
        fetch('https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            alert('Message envoyé ! Merci de m\'avoir contacté.');
            contactForm.reset();
        })
        .catch(error => console.error('Erreur:', error));
    });
}

// 6. GESTION DE L'ACCORDÉON (Compétences)
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(acc => {
    acc.addEventListener('click', () => {
        // Optionnel : Fermer les autres quand on en ouvre un
        /* accordions.forEach(otherAcc => {
            if(otherAcc !== acc) {
                otherAcc.classList.remove('active');
            }
        });
        */

        // Basculer l'état ouvert/fermé
        acc.classList.toggle('active');
    });
});

// 7. GESTION DE LA MODALE PROJET
const modal = document.getElementById('project-modal');
const modalImg = modal.querySelector('.modal-img');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const modalTag = modal.querySelector('.modal-tag');
const modalTechs = modal.querySelector('.tech-list');
const modalLink = modal.querySelector('.modal-link');
const closeModal = document.querySelector('.close-modal');

const projectItems = document.querySelectorAll('.project-item');

// Ouvrir la modale
projectItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Récupérer les données data-...
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        const img = item.getAttribute('data-img');
        const tag = item.getAttribute('data-tag');
        const link = item.getAttribute('data-link');
        const techs = item.getAttribute('data-techs');

        // Remplir la modale
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalImg.src = img;
        modalTag.textContent = tag;
        modalLink.href = link;

        // Générer les badges de technos (séparés par des virgules)
        modalTechs.innerHTML = ''; // On vide d'abord
        if (techs) {
            const techArray = techs.split(',');
            techArray.forEach(tech => {
                const span = document.createElement('span');
                span.classList.add('tech-badge');
                span.textContent = tech.trim();
                modalTechs.appendChild(span);
            });
        }

        // Afficher la modale
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll derrière
    });
});

// Fermer la modale (Croix)
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Réactiver le scroll
});

// Fermer la modale (Clic en dehors)
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});