import HomeHeaderSection from "../Home/components/header";
import TableFrame from "./TableFrame";
import "./table.css";

function DeviceTables() {
  // saving this code to use for user login
  // const { data:device, loading, error } = useDevices();

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  // if (status === "failed") {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div className="relative flex size-full min-h-screen w-screen flex-col bg-[#141414] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <HomeHeaderSection />
        <TableFrame />
      </div>
    </div>
  );
}

export default DeviceTables;
