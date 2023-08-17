import cookie from 'js-cookie';


// set in cookie
export const setCookie = (key, value) => {
    if(window){
        cookie.set(key, value,{
            expires: 1
        })
    }
}

// remove from cookie
export const removeCookie = (key) => {
    if(window){
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key) => {
    if(window){
       return cookie.get(key)
    }
}


// set in local storage
export const setLocalStorage = (key, value) => {
    if(window){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
    if(window){
        localStorage.removeItem(key)
    }
}

// authenicate user by passing data to cookie and localstorage during signin
export const authenicate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next();
}

// access user info form localstorage

export const isAuth = () => {
    if(window){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }
        } else {
            // console.log('not auth')
            return false;
        }
    }
}

export const isUser = () => {
    if(window){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            let user = JSON.parse(localStorage.getItem('user'));
            if(user){
                return user.role === 'user' && user;
            }
        } else {
            return false;
        }
    }
}

export const isAdmin = () => {
    if(window){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            let user = JSON.parse(localStorage.getItem('user'));
            if(user){
                return user.role === 'admin' && user;
            }
        } else {
            return false;
        }
    }
}

export const signOut = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}