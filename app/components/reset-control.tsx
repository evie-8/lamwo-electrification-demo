/* The `ResetControl` class implements a custom Mapbox GL JS control with a button that triggers a
specified event handler when clicked. */
import { Map, IControl } from "mapbox-gl";

class ResetControl implements IControl {
  private _eventHandler: (map: Map) => void;
  private _btn: HTMLButtonElement | undefined;
  private _iconContainer: HTMLDivElement | undefined;
  private _container: HTMLDivElement | undefined;

  constructor({
    eventHandler = () => {},
  }: {
    eventHandler?: (map: Map) => void;
  }) {
    this._eventHandler = eventHandler;
  }

  onAdd(map: Map): HTMLElement {
    if (!this._container) {
      // Create the button
      this._btn = document.createElement("button");
      this._btn.className = "mapboxgl-ctrl-icon";
      this._btn.type = "button";
      this._btn.style.display = "flex";
      this._btn.style.alignItems = "center";
      this._btn.style.justifyContent = "center";
      this._btn.onclick = () => this._eventHandler(map);
      this._btn.title ='recenter'

      this._iconContainer = document.createElement("div");
      this._iconContainer.innerHTML = `
       <svg fill="#333333" height="20px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 35.219 35.219" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.612,0C11.005,0,5.648,5.321,5.648,11.885c0,3.358,3.294,9.374,3.294,9.374l8.229,13.96l8.586-13.797 c0,0,3.814-5.74,3.814-9.537C29.572,5.321,24.216,0,17.612,0z M17.556,18.431c-3.784,0-6.849-3.065-6.849-6.853 c0-3.783,3.064-6.846,6.849-6.846c3.782,0,6.85,3.063,6.85,6.846C24.406,15.366,21.338,18.431,17.556,18.431z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg> `;

      this._btn.appendChild(this._iconContainer);

      // Create control container
      this._container = document.createElement("div");
      this._container.className =
        "mapboxgl-ctrl-group mapboxgl-ctrl flex items-center justify-center";
      this._container.appendChild(this._btn);
    }
    return this._container;
  }

  onRemove(): void {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  }
}

export default ResetControl;
