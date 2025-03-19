/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../../constants/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }

  displayState() {
    console.log(
      `
            Content: ${this.content}
            Cursor Position: ${this.cursorPosition}
            Unsaved Changes: ${this.unsavedChanges}
        `
    );
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex >= 0) {
      this.currentIndex--;

      return this.history[this.currentIndex];
    }

    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex >= this.history.length - 1) {
      return null;
    }

    this.currentIndex++;
    return this.history[this.currentIndex];
  }
}

(() => {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("const a = 1;", 2, false); // Se puede hacer que el editor maneje el tema de la inicialización e clonación de los estado

  history.save(editorState);

  console.log("\n%cEstado inicial del editor de texto:", COLORS.orange);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "const a = 1; const b = 2;",
    cursorPosition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);

  console.log("\n%cSegundo estado del editor de texto:", COLORS.orange);
  editorState.displayState();

  editorState = editorState.copyWith({
    cursorPosition: 2,
  });
  history.save(editorState);

  console.log("\n%cTercer estado del editor de texto:", COLORS.orange);
  editorState.displayState();

  editorState = history.undo()!;
  console.log("\n%cDespués del undo:", COLORS.orange);
  editorState.displayState();

  editorState = history.redo()!;
  console.log("\n%cDespués del redo:", COLORS.orange);
  editorState.displayState();
})();
