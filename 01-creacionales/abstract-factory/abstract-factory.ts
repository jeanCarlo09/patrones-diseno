/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../../constants/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburger {
  prepare(): void;
}

interface Drink {
  pour(): void;
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

class Water implements Drink {
  pour(): void {
    console.log("Pouring %cwater", COLORS.blue);
  }
}

class Soda implements Drink {
  pour(): void {
    console.log("Pouring %csoda", COLORS.green);
  }
}

interface RestaurantFactory {
  createHamburger(): Hamburger;
  createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefBurger();
  }

  createDrink(): Drink {
    return new Soda();
  }
}

class HealthyRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new ChickenBurger();
  }

  createDrink(): Drink {
    return new Water();
  }
}

// (() => {
//   type RestaurantType = "fastFood" | "healthy";

//   const restaurantType: RestaurantType = prompt(
//     "What type of restaurant do you want to visit? (fastFood/healthy)"
//   ) as RestaurantType;

//   const mapRestaurant: Record<RestaurantType, RestaurantFactory> = {
//     fastFood: new FastFoodRestaurantFactory(),
//     healthy: new HealthyRestaurantFactory(),
//   };

//   const restaurant: RestaurantFactory = mapRestaurant[restaurantType];

//   if (restaurant) {
//     const hamburger = restaurant.createHamburger();
//     hamburger.prepare();

//     const drink = restaurant.createDrink();
//     drink.pour();

//     return;
//   }

//   console.log("%cInvalid restaurant type", COLORS.red);
// })();

function main(reataurant: RestaurantFactory) {
  const hamburger: Hamburger = reataurant.createHamburger();
  hamburger.prepare();

  const drink: Drink = reataurant.createDrink();
  drink.pour();
}

console.log("\n%cFast food restaurant:", COLORS.blue);
main(new FastFoodRestaurantFactory());

console.log("\n\n%cHealthy restaurant:", COLORS.green);
main(new HealthyRestaurantFactory());
