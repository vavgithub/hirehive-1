import { ChevronDown, ChevronUp } from "lucide-react";
import StyledCard from "../Cards/StyledCard";

export const AccordionItem = ({ title, content, isOpen, toggleOpen , preIcon}) => (
    <StyledCard backgroundColor={"bg-background-80"} extraStyles="mb-4 overflow-hidden">
        <div className='flex items-center gap-3'>
            {preIcon}
            <button
                className="w-full  text-left typography-h3 flex justify-between items-center"
                onClick={toggleOpen}
            >
                {title}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
        </div>
        {isOpen && <div className="p-4 bg-background-80 text-font-gray typography-body">{content}</div>}
    </StyledCard>
);