class SearchView {
    #parentEL = document.querySelector('.search');

    getQuery() {
        const query = this.#parentEL.querySelector('.search__field').value;
        this.#clear();
        return query;
    }

    addHandler(handle) {
        this.#parentEL.addEventListener('submit', function (e) {
            e.preventDefault();
            handle();
        });
    }
    #clear() {
        this.#parentEL.querySelector('.search__field').value = '';
    }
}

export default new SearchView();