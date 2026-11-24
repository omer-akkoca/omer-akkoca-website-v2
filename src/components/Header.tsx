import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-end gap-3 px-4 pt-4 sm:px-6">
      <LanguageSwitcher />
      <ThemeToggle />
    </header>
  );
}
