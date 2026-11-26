import T from "@/i18n/T";

// Site footer: thin `subtext` top border, medium-weight credit line aligned left in the
// same column as the Navbar and page content.
export default function Footer() {
  return (
    <footer className="mt-auto bg-background">
      <div className="border-t border-subtext mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
        <p className="text-footer font-medium text-subtext">
          <T k="footerCredit" />
        </p>
      </div>
    </footer>
  );
}
