import { useDebugMode } from "@/hooks/dev/useDevHandlers";

export const debugStyle = (className: string) => {
    const debugMode = useDebugMode();

    if (!debugMode) return '';

    // add better filtering here
    if (debugMode) {
        return className;
    }
};