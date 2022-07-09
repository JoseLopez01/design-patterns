export interface Button {
  onClick: (callback: VoidFunction) => void;
  render: () => void;
}

export abstract class Dialog {
  abstract createButton(): Button;

  render() {
    const okButton = this.createButton();
    okButton.onClick(() => {});
    okButton.render();
  }
}

export class WindowsButton implements Button {
  onClick(callback: VoidFunction) {
    callback();
  }

  render() {
    console.log('Windows Button');
  }
}

export class HTMLButton implements Button {
  onClick(callback: VoidFunction) {
    callback();
  }

  render() {
    console.log('Web Button');
  }
}

export class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

export class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}

export class Aplication {
  dialog!: Dialog;

  init() {
    const isWindows = Deno.build.os === 'windows';

    if (isWindows) {
      this.dialog = new WindowsDialog();
    } else {
      this.dialog = new WebDialog();
    }
  }

  main() {
    this.init();
    this.dialog.render();
  }
}

const app = new Aplication();
app.main();
