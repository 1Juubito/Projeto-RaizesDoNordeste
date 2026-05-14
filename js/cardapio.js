document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.getElementById('filters-container');
    const allCards = document.querySelectorAll('.product-card');

    if (filtersContainer) {
        filtersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-filter')) {
                document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const filterValue = e.target.dataset.filter;

                allCards.forEach(card => {
                    const cardCategory = card.dataset.categoria;
                    if (filterValue === 'todos' || filterValue === cardCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    }

    if (typeof atualizarBadgeGlobal === 'function') {
        atualizarBadgeGlobal();
    }
});