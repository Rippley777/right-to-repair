import { MouseEventHandler } from "react";
import { TbHexagonFilled, TbHexagon } from "react-icons/tb";

const Icon = ({ isVisible, onClick, size }: { isVisible: boolean; onClick: MouseEventHandler<SVGElement>; size: number }) => (
    isVisible ? (
        <TbHexagonFilled onClick={onClick} className="inline mr-2" size={size} />
    ) : (
        <TbHexagon onClick={onClick} className="inline mr-2" size={size} />
    )
);

export default Icon;