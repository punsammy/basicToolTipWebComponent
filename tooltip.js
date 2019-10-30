// Every custom element needs to extend HTMLElement
class Tooltip extends HTMLElement {
  constructor(){ // called when element is created, use this function for basic initializatoins
    super();
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text";
  }

  connectedCallback() { // DOM initializations, called when elements are mounted to page
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideToolTip.bind(this));
    this.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

// Naming convention for functions called within a class
  _showTooltip(){
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.zIndex = "10";
    this.appendChild(this._tooltipContainer);
  }

  _hideToolTip(){
    this.removeChild(this._tooltipContainer);
  }

  // called when element is detached from DOM
  // disconnectedCallback(){}

  // observed attribute updated
  // attributeChangedCallback(){}
}


// REGISTERING CUSTOM ELEMENT
// RULE: needs to have 2 words separated by a dash, because all built-in HTML elements are single words
// this prevents us from accidentallty overwriting existing HTML elements
customElements.define("basic-tooltip", Tooltip);
