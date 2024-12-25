import App from "@/App.vue";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

export class CommandPaletteTest {
  private user = userEvent.setup();
  private container: Element | undefined;

  constructor() {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          components: {
            markdown: { template: "<div>Markdown View</div>" },
            preview: { template: "<div>Preview View</div>" },
          },
        },
      ],
    });

    const pinia = createPinia();
    const { container } = render(App, {
      global: {
        plugins: [router, pinia],
      },
    });
    this.container = container;
  }

  async openCommandPalette() {
    await this.user.keyboard("{Meta>}p{/Meta}");
    // Wait for the command palette to be visible and interactive
    await waitFor(() => {
      const input = screen.queryByPlaceholderText(
        "Type > to see available commands...",
      );
      if (!input) throw new Error("Command palette input not found");
      return input;
    });
  }

  async closeCommandPalette() {
    await this.user.keyboard("{Meta>}p{/Meta}");
    // Wait for the command palette to be hidden
    await waitFor(() => {
      const input = screen.queryByPlaceholderText(
        "Type > to see available commands...",
      );
      if (input) throw new Error("Command palette still visible");
      return true;
    });
  }

  async typeInCommandPalette(text: string) {
    const input = await waitFor(() => {
      const el = screen.queryByPlaceholderText(
        "Type > to see available commands...",
      );
      if (!el) throw new Error("Command palette input not found");
      return el;
    });
    await this.user.type(input, text);
    // Wait for commands to be filtered/displayed
    await waitFor(() => {
      const commands = screen.queryAllByRole("option");
      if (commands.length === 0) throw new Error("No commands visible");
      return true;
    });
  }

  async pressKey(key: string) {
    await this.user.keyboard(key);
  }

  async clickOutside() {
    if (this.container) {
      await this.user.click(this.container);
      // Wait for the command palette to be hidden
      await waitFor(() => {
        const input = screen.queryByPlaceholderText(
          "Type > to see available commands...",
        );
        if (input) throw new Error("Command palette still visible");
        return true;
      });
    }
  }

  isCommandPaletteVisible() {
    return (
      screen.queryByPlaceholderText("Type > to see available commands...") !==
      null
    );
  }

  isCommandVisible(commandName: string) {
    const listbox = screen.queryByRole("listbox");
    if (!listbox) return false;
    return (
      screen.queryByRole("option", { name: new RegExp(commandName) }) !== null
    );
  }

  getHighlightedCommand() {
    const commands = screen.getAllByRole("option");
    const highlightedCommand = commands.find(
      (command) =>
        command.classList.contains("bg-[#2a2a2a]") &&
        !command.classList.contains("hover:bg-[#2a2a2a]"),
    );
    const titleElement = highlightedCommand?.querySelector(".text-white");
    return titleElement?.textContent?.trim() || "";
  }

  async pressCommandN() {
    await this.user.keyboard("{Meta>}n{/Meta}");
    // Wait for the highlight to update
    await waitFor(() => {
      const commands = screen.queryAllByRole("option");
      if (commands.length === 0) throw new Error("No commands visible");
      return true;
    });
  }

  async verifyNavigationToNextCommand(currentCommand: string) {
    await this.pressCommandN();
    const nextCommand = await waitFor(() => {
      const command = this.getHighlightedCommand();
      if (!command || command === currentCommand)
        throw new Error("Command navigation failed");
      return command;
    });
    expect(nextCommand).toBeTruthy();
    expect(nextCommand).not.toBe(currentCommand);
    return nextCommand;
  }

  async verifyCommandListWrapping(startCommand: string, maxAttempts = 10) {
    let currentCommand = this.getHighlightedCommand();
    let attempts = maxAttempts;

    while (currentCommand !== startCommand && attempts > 0) {
      await this.pressCommandN();
      currentCommand = await waitFor(() => {
        const command = this.getHighlightedCommand();
        if (!command) throw new Error("No command highlighted");
        return command;
      });
      attempts--;
    }

    expect(currentCommand).toBe(startCommand);
    expect(attempts).toBeGreaterThan(0);
  }
}
