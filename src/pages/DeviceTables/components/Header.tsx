const Header = () => {
  return (
    <div className="flex flex-wrap justify-between gap-3 p-4">
      <div className="flex min-w-72 flex-col gap-3">
        <p className="text-[#FFFFFF] tracking-light text-[32px] font-bold leading-tight">
          Model details
        </p>
        <p className="text-[#C4C4C4] text-sm font-normal leading-normal">
          Manage and edit model details
        </p>
      </div>
    </div>
  );
};

export default Header;
