// import CW from 'chatwork.core'
// import RM from 'chatwork.room'

class CWExtension {
    init() {
        if (typeof window.CW === "undefined" || typeof window.RM === "undefined") {
            return false
        }
        return true
    }
}

export default CWExtension
