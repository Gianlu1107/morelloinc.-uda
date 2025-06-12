// Caricamento dei sogni
$(document).ready(function() {
    // Carica i sogni al caricamento della pagina
    loadDreams();

    // Funzione per caricare i sogni
    function loadDreams(searchTag = '') {
        $('#dreams-container').html('<div class="dream-placeholder"><p>Caricamento sogni...</p></div>');
        $.ajax({
            url: 'php/get_dreams.php',
            type: 'GET',
            data: { tag: searchTag },
            success: function(data) {
                let dreams = JSON.parse(data);
                $('#dreams-container').html('');
                if (dreams.length > 0) {
                    dreams.forEach(function(dream) {
                        $('#dreams-container').append(`
                            <div class="dream">
                                <p><strong>${dream.title}</strong></p>
                                <p>${dream.description}</p>
                                <div class="dream-footer">
                                    <button class="delete-btn" data-id="${dream.id}">Elimina</button>
                                    <div class="like-dislike">
                                        <span class="like-btn" data-id="${dream.id}">👍 ${dream.likes}</span>
                                        <span class="dislike-btn" data-id="${dream.id}">👎 ${dream.dislikes}</span>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                } else {
                    $('#dreams-container').html('<p>Nessun sogno trovato.</p>');
                }
            }
        });
    }

    // Gestione ricerca e filtro
    $('#filter-btn').click(function() {
        let searchTag = $('#search-bar').val();
        loadDreams(searchTag);
    });

    // Eliminazione di un sogno
    $(document).on('click', '.delete-btn', function() {
        let dreamId = $(this).data('id');
        Swal.fire({
            title: 'Sei sicuro?',
            text: "Questo sogno verrà eliminato definitivamente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Elimina',
            cancelButtonText: 'Annulla'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'php/delete_dream.php',
                    type: 'POST',
                    data: { id: dreamId },
                    success: function(response) {
                        if (response === 'success') {
                            Swal.fire('Eliminato!', 'Il sogno è stato eliminato.', 'success');
                            loadDreams(); // ricarica i sogni
                        } else {
                            Swal.fire('Errore!', 'Non è stato possibile eliminare il sogno.', 'error');
                        }
                    }
                });
            }
        });
    });
});