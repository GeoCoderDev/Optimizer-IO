export class ChatEvent {
  #listeners = new Map<number, <T>(args: T) => void>();
  #EventID = 1;

  /**
   *
   * @param {<T>(args:T)=>void} callback
   * @returns {number} Esta funcion devuelve el ID del listener agregado
   */
  addEventListener(callback: <T>(args: T) => void) {
    this.#listeners.set(this.#EventID, callback);
    return this.#EventID++;
  }

  /**
   * Esta funcion elimina un listener por su ID
   * @param {number} eventID
   */
  removeEventListener(eventID: number) {
    this.#listeners.delete(eventID);
  }

  /**
   * Esta funcion ejecuta todos los listeners que estan registrados en este evento
   * @param args
   */
  dispatchEvent<T>(args: T) {
    for (const callback of this.#listeners.values()) {
      callback<typeof args>(args);
    }
  }
}
