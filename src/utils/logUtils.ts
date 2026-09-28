
export const logDebug = (debugMode: boolean, message: string, data: unknown) => {

    // add better filtering here
    if (debugMode) {
        console.log(message, data);
    }
};