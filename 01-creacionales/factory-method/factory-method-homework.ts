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
 */

/**
 * 	!Descripción:
  1.	Completen las clases SalesReport e InventoryReport para implementar 
      la interfaz Report, generando el contenido de cada reporte en el método generate.
	  
  2.	Implementen las clases SalesReportFactory e InventoryReportFactory 
      para crear instancias de SalesReport y InventoryReport, respectivamente.

	3.	Prueben el programa generando diferentes tipos de reportes usando
      el prompt para seleccionar el tipo de reporte.
 */

import { COLORS } from "../../constants/colors.ts";

// 1. Definir la interfaz Report
interface Report {
  generate(): void;
}

// 2. Clases concretas de Reportes
// Implementar SalesReport e InventoryReport

class SalesReport implements Report {
  generate(): void {
    console.log("Generating %csales report", COLORS.green);
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log("Generating %cinventory report", COLORS.blue);
  }
}

class SocialMediaReport implements Report {
  generate(): void {
    console.log("Generating %csocial media report", COLORS.purple);
  }
}

// 3. Clase Base ReportFactory con el Método Factory

abstract class ReportFactory {
  protected abstract createReport(): Report;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

// 4. Clases Concretas de Fábricas de Reportes

class SalesReportFactory extends ReportFactory {
  createReport(): Report {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Report {
    return new InventoryReport();
  }
}

class SocialMediaReportFactory extends ReportFactory {
  createReport(): Report {
    return new SocialMediaReport();
  }
}

// 5. Código Cliente para Probar

(() => {
  let reportFactory: ReportFactory;

  type ReportType = "sales" | "inventory" | "media";

  const reportType = prompt(
    "¿Qué tipo de reporte deseas? (sales/inventory/media)"
  ) as ReportType;

  const mapActions: Record<ReportType, () => ReportFactory> = {
    sales: () => new SalesReportFactory(),
    inventory: () => new InventoryReportFactory(),
    media: () => new SocialMediaReportFactory(),
  };

  const action = mapActions[reportType];

  if (action) {
    reportFactory = action();
    reportFactory.generateReport();
    return;
  }

  console.log("%cInvalid report type", COLORS.red);
})();
