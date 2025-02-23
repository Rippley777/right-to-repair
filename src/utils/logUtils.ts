
export const logDebug = (debugMode: boolean, message: string, data: any) => {

    // add better filtering here
    if (debugMode) {
        console.log(message, data);
    }
};