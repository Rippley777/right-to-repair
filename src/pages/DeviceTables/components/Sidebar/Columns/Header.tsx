import { TbChevronDown, TbChevronRight } from "react-icons/tb";

const Header: React.FC<{ columnsExpanded: boolean; onClick: () => void }> = ({
    columnsExpanded,
    onClick,
}) => (
    <h3
        onClick={onClick}
        className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
    >
        Columns
        {columnsExpanded ? (
            <TbChevronDown className="inline" />
        ) : (
            <TbChevronRight className="inline" />
        )}
    </h3>
);

export default Header;
