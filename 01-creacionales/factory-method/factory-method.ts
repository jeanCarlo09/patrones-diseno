/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../../constants/colors.ts";

interface Hamburger {
  prepare(): void;
}

class ChickenBurger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cchicken burger", COLORS.yellow);
  }
}

class BeefBurger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cbeef burger", COLORS.red);
  }
}

class BeanBurger implements Hamburger {
  prepare(): void {
    console.log("Preparing %cbean burger", COLORS.brown);
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): Hamburger; // Protected para ofuscar el método de las instancias de la factory

  orderHamburger() {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new ChickenBurger();
  }
}

class BeefRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new BeefBurger();
  }
}

class VegetarianRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new BeanBurger();
  }
}

(() => {
  // In run-time we can change the type of restaurant
  let restaurant: Restaurant;

  type BurgerType = "chicken" | "beef" | "bean";

  const orderHamburger = prompt(
    "What type of hamburger do you want? (chicken/beef/bean)"
  ) as BurgerType;

  const mapActions: Record<BurgerType, () => Restaurant> = {
    chicken: () => new ChickenRestaurant(),
    beef: () => new BeefRestaurant(),
    bean: () => new VegetarianRestaurant(),
  };

  const action = mapActions[orderHamburger];

  if (action) {
    restaurant = action();
    restaurant.orderHamburger();
  }
})();
