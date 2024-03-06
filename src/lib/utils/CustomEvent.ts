export class CustomEvent {
  #listeners = new Map<number, <T>(args: T) => void>();
  #listenerID = 1;

  /**
   * Esta funcion agrega un listener a este evento
   * @param {<T>(args:T)=>void} callback
   * @returns {number} Esta funcion devuelve el ID del listener agregado
   */
  addlistenerListener(callback: <T>(args: T) => void) {
    // Agregando el listener al Map de listeners
    this.#listeners.set(this.#listenerID, callback);
    return this.#listenerID++;
  }

  /**
   * Esta funcion elimina los listeners con los IDs pasados como argumento
   * @param {number | number[]} listenerID
   */
  removelistenerListener(listenerID: number | number[]) {
    // Si es un array de IDs se eliminara  todos los listeners correspondientes a ese arreglo
    if (Array.isArray(listenerID))
      return listenerID.forEach((id) => this.#listeners.delete(id));

    // De lo contrario se eliminara el unico listener que corresponde al id pasado
    this.#listeners.delete(listenerID);
  }

  /**
   * Esta funcion ejecuta todos los listeners que estan registrados en este Evento 
   * o los listeners con los IDs pasados como argumentos(opcional).
   * @param args
   * @param {number | number[]} listenerID
   */
  dispatchlistener<T>(args: T, listenerID?: number | number[]) {

    // En caso se haya pasado un solo numero y no un array de IDs se procede a ejecutar ese unico listener mediante su ID
    if (!Array.isArray(listenerID))
      return this.#listeners.get(listenerID!)?.<typeof args>(args);
    // En caso se haya pasado un array de IDs se ejecutaran los listeneres que coincidan con esos IDs
    else if (listenerID)
      return listenerID.forEach((id) =>
        this.#listeners.get(id)?.<typeof args>(args)
      );

    // Si no se paso el argumento listenerID se ejecutaran todos los listeners sin excepcion
    for (const callback of this.#listeners.values()) {
      callback<typeof args>(args);
    }
  }
}
