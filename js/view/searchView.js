class SearchView {
    _parentEL = document.querySelector('.search');

    getQuery() {
        const query = this._parentEL.querySelector('.search__field').value;
        this._clear();
        return query;
    }

    addHandler(handle) {
        this._parentEL.addEventListener('submit', function (e) {
            e.preventDefault();
            handle();
        });
    }
    _clear() {
        this._parentEL.querySelector('.search__field').value = '';
    }
}

export default new SearchView();