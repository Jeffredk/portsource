document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("themeToggle");
    const icon = toggle.querySelector("i");
    const logo = document.getElementById("logo");
    const body = document.body;
    
    // Fonction pour changer le logo selon le thème
    function updateLogo(isDark) {
        logo.style.opacity = "0";
        setTimeout(() => {
            logo.src = isDark ? "Assets/logo/logoNanoDevbeige.png" : "Assets/logo/logoNanoDev.png";
            logo.style.opacity = "1";
        }, 400);
    }

    // Appliquer automatiquement le thème selon l’heure si aucun thème n’est enregistré
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        icon.classList.replace("fa-moon", "fa-sun");
        updateLogo(true);
    } else if (savedTheme === "light") {
        body.classList.remove("dark-mode");
        icon.classList.replace("fa-sun", "fa-moon");
        updateLogo(false);
    } else {
        const hour = new Date().getHours();
        const isDarkByHour = hour >= 22 || hour < 6;
        if (isDarkByHour) {
            body.classList.add("dark-mode");
            icon.classList.replace("fa-moon", "fa-sun");
            updateLogo(true);
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            updateLogo(false);
        }
    }

    toggle.addEventListener("click", function (e) {
        e.preventDefault();

        const wipe = document.createElement('div');
        wipe.className = 'theme-wipe';
        body.appendChild(wipe);

        const isDark = !body.classList.contains("dark-mode");

        const buttonRect = toggle.getBoundingClientRect();
        const startX = buttonRect.left + buttonRect.width / 2;
        const startY = buttonRect.top + buttonRect.height / 2;

        wipe.style.clipPath = `circle(0px at ${startX}px ${startY}px)`;
        wipe.style.backgroundColor = isDark ? '#101524' : '#ffffff';

        const maxDim = Math.max(
            Math.max(startX, window.innerWidth - startX) * 2,
            Math.max(startY, window.innerHeight - startY) * 2
        );

        // Déclencher l'animation
        requestAnimationFrame(() => {
            wipe.style.clipPath = `circle(${maxDim}px at ${startX}px ${startY}px)`;

            // Changer le thème à mi-chemin de l'animation
            setTimeout(() => {
                body.classList.toggle("dark-mode", isDark);
                icon.classList.toggle("fa-moon", !isDark);
                icon.classList.toggle("fa-sun", isDark);
                localStorage.setItem("theme", isDark ? "dark" : "light");
                updateLogo(isDark);

                // Nettoyer après la fin de l'animation
                setTimeout(() => {
                    wipe.style.opacity = '0';
                    setTimeout(() => {
                        body.removeChild(wipe);
                    }, 500);
                }, 700);
            }, 400);
        });
    });
});     
        

document.querySelectorAll('.skills-categories .category').forEach(category => {
    category.addEventListener('click', () => {
        // Supprimer l'état actif de toutes les catégories
        document.querySelectorAll('.skills-categories .category').forEach(cat => cat.classList.remove('active'));
        // Ajouter l'état actif à la catégorie cliquée
        category.classList.add('active');

        // Récupérer la catégorie sélectionnée
        const selectedCategory = category.getAttribute('data-category');

        // Afficher uniquement la grille correspondante
        document.querySelectorAll('.skills-grid').forEach(grid => {
            if (grid.getAttribute('data-grid') === selectedCategory) {
                grid.classList.add('active');
            } else {
                grid.classList.remove('active');
            }
        });
    });
});


document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Activer le bon bouton
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filtrer les projets
        document.querySelectorAll('.project-card').forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== FONCTION NAVIGATION =====
// Fonction showSection pour gérer la navigation entre sections
function showSection(targetSection) {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Retirer l'état actif de tous les éléments de navigation
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // Ajouter l'état actif à l'élément de navigation correspondant
    const activeNavItem = document.querySelector(`[data-section="${targetSection}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Cacher toutes les sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section ciblée avec animation
    const targetElement = document.querySelector(`[data-section="${targetSection}"].content-section`);
    if (targetElement) {
        setTimeout(() => {
            targetElement.classList.add('active');
        }, 150);
    }
}

// Exposer la fonction showSection globalement
window.showSection = showSection;
