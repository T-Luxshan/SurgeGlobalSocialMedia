// Function to get a specific cookie value by its name
export const GetCookie = (cookieName) => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Get the token from the 'token' cookie
// const token = getCookie('token');

// // Check if token exists
// if (token) {
//     console.log('Token from cookies:', token);
// } else {
//     console.error('Token not found incookies');
// }