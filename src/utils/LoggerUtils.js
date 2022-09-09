module.exports = class LoggerUtils{

    static info(log){
        console.log("[INFO] " + log);
    }

    static error(log){
        console.error("[ERROR] " + log);
    }

    static debug(log){
        console.debug("[DEBUG] " + log);
    }

    static warn(log){
        console.warn("[WARN] " + log);
    }
}