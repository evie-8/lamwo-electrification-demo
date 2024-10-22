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

      this._iconContainer = document.createElement("div");
      this._iconContainer.innerHTML = `
         <svg width="35px" height="35px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
           <path d="M25 38c-5.1 0-9.7-3-11.8-7.6l1.8-.8c1.8 3.9 5.7 6.4 10 6.4 6.1 0 11-4.9 11-11s-4.9-11-11-11c-4.6 0-8.5 2.8-10.1 7.3l-1.9-.7c1.9-5.2 6.6-8.6 12-8.6 7.2 0 13 5.8 13 13s-5.8 13-13 13z"/>
           <path d="M20 22h-8v-8h2v6h6z"/>
         </svg>
      `;

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
