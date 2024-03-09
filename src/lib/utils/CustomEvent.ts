import { IDCounter } from "../../interfaces/IDCounter";

export class CustomEvent<T> implements IDCounter {
  #listeners = new Map<number, (args: T) => void>();
  IDCounter: number = 1;

  /**
   * Esta funcion agrega un listener a este evento
   * @param {<T>(args:T)=>void} callback
   * @returns {number} Esta funcion devuelve el ID del listener agregado
   */
  addListener(callback: (args: T) => void) {
    // Agregando el listener al Map de listeners
    this.#listeners.set(this.IDCounter, callback);
    return this.IDCounter++;
  }

  /**
   * Esta funcion elimina los listeners con los IDs pasados como argumento
   * @param {number | number[]} listenerID
   */
  removeListener(listenerID: number | number[]) {
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
  dispatchEvent(args: T, listenerID?: number | number[]) {
    // En caso se haya pasado un solo numero y no un array de IDs se procede a ejecutar ese unico listener mediante su ID
    if (!Array.isArray(listenerID))
      return this.#listeners.get(listenerID!)?.(args);
    // En caso se haya pasado un array de IDs se ejecutaran los listeneres que coincidan con esos IDs
    else if (listenerID)
      return listenerID.forEach((id) => this.#listeners.get(id)?.(args));

    // Si no se paso el argumento listenerID se ejecutaran todos los listeners sin excepcion
    for (const callback of this.#listeners.values()) {
      callback(args);
    }
  }
}
