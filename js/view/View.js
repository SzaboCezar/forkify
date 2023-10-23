import icons from "url:../../img/icons.svg";

export default class View {
    _data;
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    // Render spinner
    renderSpinner() {
        const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    renderError(errorMsg = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMsg}</p>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    renderMessage(succesMsg) {
        const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${succesMsg}</p>
      </div>
    
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}