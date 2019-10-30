// Every custom element needs to extend HTMLElement
class Tooltip extends HTMLElement {
  constructor(){ // called when element is created, use this function for basic initializatoins
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = "Some dummy tooltip text";
    this.attachShadow({mode: "open" });
    const template = document.querySelector("#tooltip-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() { // DOM initializations, called when elements are mounted to page
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener("mouseleave", this._hideToolTip.bind(this));
    this.shadowRoot.appendChild(this._tooltipIcon);
    this._render();
  }

  // observed attribute updates
  attributeChangedCallback(name, oldValue, newValue){
    console.log(name, oldValue, newValue);
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

// accessible form outside, but not settable from outside
  static get observedAttributes() {
    return['text', 'class']; // will watch for changes in text and class
  }

  // called when element is detached from DOM
  disconnectedCallback(){
    console.log("Disconnected");
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._showTooltip);

  }

  _render(){
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible ) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

// Naming convention for functions called within a class
  _showTooltip(){
    this._tooltipVisible = true;
    this._render();
  }

  _hideToolTip(){
    this._tooltipVisible = false;
    this._render();
  }

}


// REGISTERING CUSTOM ELEMENT
// RULE: needs to have 2 words separated by a dash, because all built-in HTML elements are single words
// this prevents us from accidentallty overwriting existing HTML elements
customElements.define("basic-tooltip", Tooltip);
