import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";

export default function MainHeader() {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <MainDesktopNavigation />
      <MainMobileNavigation />
    </div>
  );
}
