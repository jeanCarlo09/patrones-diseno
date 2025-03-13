import { COLORS } from "../../constants/colors.ts";
/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
  private _cpu: string = "cpu - not defined";
  private _ram: string = "ram - not defined";
  private _storage: string = "storage - not defined";
  private _gpu?: string;

  constructor() {}

  get cpu(): string {
    return this._cpu;
  }

  set cpu(cpu: string) {
    this._cpu = cpu;
  }

  get ram(): string {
    return this._ram;
  }

  set ram(ram: string) {
    this._ram = ram;
  }

  get storage(): string {
    return this._storage;
  }

  set storage(storage: string) {
    this._storage = storage;
  }

  get gpu(): string | undefined {
    return this._gpu;
  }

  set gpu(gpu: string) {
    this._gpu = gpu;
  }

  displayConfiguration(): void {
    console.log(
      `CPU: ${this._cpu},
       RAM: ${this._ram}, 
       Storage: ${this._storage}, 
       GPU: ${this._gpu ?? ""}`
    );
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setRam(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  display(): Computer {
    return this.computer;
  }
}

(() => {
  const basicComputer = new ComputerBuilder()
    .setCPU("Intel i3")
    .setRam("8GB")
    .setStorage("1TB")
    .display();

  console.log("%Computadora básica", COLORS.blue);
  basicComputer.displayConfiguration();

  const gamingComputer = new ComputerBuilder()
    .setCPU("Intel i7")
    .setRam("16GB")
    .setStorage("2TB")
    .setGPU("Nvidia RTX 5090")
    .setGPU("Nvidia RTX 3080") // Overwrite GPU
    .display();

  console.log("%Computadora gaming", COLORS.green);
  gamingComputer.displayConfiguration();
})();
