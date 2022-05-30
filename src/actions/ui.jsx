import { types } from "../types/types"


export const openModal = () => {
    return {
        type: types.uiOpenModal
    }
}

export const closeModa = () => {
    return {
        type: types.uiCloseModal
    }
}