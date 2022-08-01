import { loggedOut, loginFailure, loginStart, loginSuccess} from "./userRedux";
import {publicRequest, userRequest} from '../requestMethods'
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure, 
    addProductStart,
    addProductSuccess,
    addProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure} from "./productsRedux";

export const login = async (dispatch, user) => {
    try {
        dispatch(loginStart());
        const res = await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure(error));
    }
}

export const logout = async(dispatch) => {
    dispatch(loggedOut());
}


export const getProducts = async (dispatch) => {
    try {
        dispatch(getProductStart());
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
}

export const deleteProducts = async (id,dispatch) => {
    try {
        dispatch(deleteProductStart());
        // const res = await userRequest.delete(`/products/:${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}

export const updateProducts = async (id, product,dispatch) => {
    try {
        dispatch(updateProductStart());
        const res = await userRequest.put(`/products/:${id}`);
        dispatch(updateProductSuccess({
            id, product
        }));
    } catch (error) {
        dispatch(updateProductFailure());
    }
}

export const addProducts = async (product,dispatch) => {
    try {
        dispatch(addProductStart());
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure());
    }
}