import { is } from "@electron-toolkit/utils";
import { BaseWindow, WebContentsView } from "electron";
import { join } from "path";

export class BerryFlow {
  private webContentsView: WebContentsView;
  private baseWindow: BaseWindow;
  private isVisible: boolean = false;

  constructor(baseWindow: BaseWindow) {
    this.baseWindow = baseWindow;
    this.webContentsView = this.createWebContentsView();
    this.setupBounds();
  }

  private createWebContentsView(): WebContentsView {
    const webContentsView = new WebContentsView({
      webPreferences: {
        preload: join(__dirname, "../preload/berryflow.js"),
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
      },
    });

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      const berryflowUrl = new URL(
        "/berryflow/",
        process.env["ELECTRON_RENDERER_URL"]
      );
      webContentsView.webContents.loadURL(berryflowUrl.toString());
    } else {
      webContentsView.webContents.loadFile(
        join(__dirname, "../renderer/berryflow.html")
      );
    }

    return webContentsView;
  }

  private setupBounds(): void {
    if (!this.isVisible) return;

    const bounds = this.baseWindow.getBounds();
    this.webContentsView.setBounds({
      x: 0,
      y: 88,
      width: bounds.width,
      height: bounds.height - 88,
    });
  }

  updateBounds(): void {
    if (this.isVisible) {
      this.setupBounds();
    }
  }

  get view(): WebContentsView {
    return this.webContentsView;
  }

  show(): void {
    if (!this.isVisible) {
      this.baseWindow.contentView.addChildView(this.webContentsView);
      this.isVisible = true;
      this.setupBounds();
      this.webContentsView.setVisible(true);
      this.webContentsView.webContents.send("berryflow-opened");
    }
  }

  hide(): void {
    if (this.isVisible) {
      this.baseWindow.contentView.removeChildView(this.webContentsView);
      this.isVisible = false;
      this.webContentsView.webContents.send("berryflow-closed");
    }
  }

  toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  getIsVisible(): boolean {
    return this.isVisible;
  }
}
