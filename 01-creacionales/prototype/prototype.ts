/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
  title: string;
  private content: string;
  author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(
      `
        Title: ${this.title}
        Content: ${this.content}
        Author: ${this.author}
        `
    );
  }
}

(() => {
  const originalDocument = new Document(
    "Cotización",
    "Valor 500 dólares",
    "Jean"
  );

  console.log({ originalDocument });
  originalDocument.displayInfo();

  //   const document2 = { ...originalDocument }; // structureClone(originalDocument);
  //   document2.title = "Factura";
  //   console.log({ document2 });

  const document2 = originalDocument.clone();
  document2.title = "Factura";
  console.log({ document2 });
  document2.displayInfo();
})();
