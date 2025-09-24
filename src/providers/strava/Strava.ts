export default class Strava {
  static #instance: Strava;
  private token?: string;
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): Strava {
    if (!Strava.#instance) {
      Strava.#instance = new Strava();
    }

    return Strava.#instance;
  }
  public putToken(token: string) {
    this.token = token;
  }
  public getToken(): string | void {
    return this.token;
  }
}
