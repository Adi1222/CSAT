import jwt_decode from "jwt-decode";

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
};

export const getUserFromCookie = () => {
  var cookie = getCookie("usertoken"); // usertoken is the key its value is the token that we want

  if (cookie !== "") {
    return jwt_decode(cookie).identify.name;
  }

  return "";
};

export const setUserTokenCookie = (cvalue) => {
  var now = new Date();
  now.setTime(now.getTime() + 30 * 60 * 1000); // 30  inu from now
  var expiry = "expires=" + now.toUTCString();
  document.cookie = "usertoken=" + cvalue + ";" + expiry + ";path=/";
};

//****************  cookie Gude *****************

/*... cookies are in this format--> 
eg: document.cookie = 'name=kyle; expires=' + new Date(2020,0,1).toUTCString();

here we created 3 functions 
1) to get the cookie based on the key name i.e userToken 
2) Once we get the userToken cookie value i.e we got the token, we'll decode the token and return the active user
3) we want to set the sertoken cookie whoose value is token.
*/
