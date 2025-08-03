// ===== TIMELINE CIRCULAIRE INTERACTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Auto-progression de la timeline (optionnel)
    let timelineAutoInterval;
    let isTimelineHovered = false;

    function startTimelineAuto() {
        const timelineInputs = document.querySelectorAll('input[name="timeline-item"]');
        let currentIndex = 0;

        // Trouver l'élément actuellement sélectionné
        timelineInputs.forEach((input, index) => {
            if (input.checked) currentIndex = index;
        });

        timelineAutoInterval = setInterval(() => {
            if (!isTimelineHovered) {
                currentIndex = (currentIndex + 1) % timelineInputs.length;
                timelineInputs[currentIndex].checked = true;
            }
        }, 4000); // Change toutes les 4 secondes
    }

    function stopTimelineAuto() {
        clearInterval(timelineAutoInterval);
    }

    // Gestion du hover sur la timeline
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
        timelineSection.addEventListener('mouseenter', () => {
            isTimelineHovered = true;
        });

        timelineSection.addEventListener('mouseleave', () => {
            isTimelineHovered = false;
        });
    }

    // Démarrer l'auto-progression quand on arrive sur la section timeline
    const timelineNavItem = document.querySelector('[data-section="timeline"]');
    if (timelineNavItem) {
        timelineNavItem.addEventListener('click', () => {
            setTimeout(() => {
                startTimelineAuto();
            }, 1000);
        });
    }

    // Arrêter l'auto-progression quand on quitte la section timeline
    const otherNavItems = document.querySelectorAll('.nav-item:not([data-section="timeline"])');
    otherNavItems.forEach(item => {
        item.addEventListener('click', stopTimelineAuto);
    });

    // Gestion des clics sur les labels de timeline
    const timelineLabels = document.querySelectorAll('input[name="timeline-item"]');
    timelineLabels.forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                // Arrêter l'auto-progression temporairement
                stopTimelineAuto();
                // Redémarrer après 6 secondes
                setTimeout(() => {
                    if (document.querySelector('.timeline-section').classList.contains('active')) {
                        startTimelineAuto();
                    }
                }, 6000);
            }
        });
    });

    // Navigation avec les flèches du clavier dans la timeline
    document.addEventListener('keydown', (e) => {
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection || !timelineSection.classList.contains('active')) return;

        const timelineInputs = document.querySelectorAll('input[name="timeline-item"]');
        let currentIndex = 0;

        // Trouver l'élément actuellement sélectionné
        timelineInputs.forEach((input, index) => {
            if (input.checked) currentIndex = index;
        });

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % timelineInputs.length;
            timelineInputs[nextIndex].checked = true;
            stopTimelineAuto();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + timelineInputs.length) % timelineInputs.length;
            timelineInputs[prevIndex].checked = true;
            stopTimelineAuto();
        }
    });
});