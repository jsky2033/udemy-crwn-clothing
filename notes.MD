# Sass

Note that Sass is an extension of CSS. The browser cannot understand Sass by itself so there needs to be a module that is installed for this to work. 

# Routes

## Outlet

The Outlet is a means of utilizing routes to ensure conditional placement of Components based on the navigation path in the URL. 

It allows you to decide where on the parent component the child component will appear based on the URL. For example, here:

<Route path="/home" element={<Home />}>
    <Route path="shop" element={<Shop />} />
</Route>

In the Home component:

<div>
    <Outlet />
    <Directory categories={categories} />
</div>

The Shop Component will always appear at the place chosen in the Home component when the user visits /home/shop! S;/omewhat similar to slots in Web Components but more related to navigation paths. 

There is a much more sensible example in the app Home page itself! It makes much more sense to place the Outlet in the Nav Bar. 

# Fragments

Fragments are essentially hollow divs that can be used when you have a div element that serves no other purpose than to wrap element. It CANNOT be styled. 

# Firebase

Firebase is a Google tool that allows you to set up a database for your front end apps. 

- Authentication through Google

1. browser -> credentials -> Google Servers
2. Google Servers -> auth_token -> browser
3. browser -> auth_token -> Firebase
4. Firebase -> auth_token -> Google Servers
5. Google Servers -> verification_token -> Firebase
6. Firebase -> access_token -> browser

Actual Crud Request:

7. browser -> access_token + CRUD Request -> Firebase

This access token needs to be stored in the frontend as it is what allows the application to send verifiable CRUD requests to the Firebase database. 

## Document Model

- The document is the unit object. In this case it is a product item. It can of course contain nested objects as well. 
- A collection is a set of documents. 
- The data is the entire database. 

Remember to set your Rules: allow read, read if true

## Creating the user

Creating the user is done using the user model. First we check if it does exists by using its reference (remember you can get the reference as a byproduct of the object creation). 

## Google Redirect

A challenge with using Google Redirect for logins is that the returned data from the request is lost as React has unmounted and then remounted the components when we leave and return to the URL in question. 

Thus we make use of Hooks and the redirect result. Note that the 'auth' instance tracks our login states across the application. 

<script>
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

  // HOOKS
  useEffect(() => {
    const getRedirect = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };
    getRedirect();
  }, []);
</script>

## Creating the user

Creating the user is a two step process here:

1. Create a user with email and password.
2. Fill the user profile with data utilizing the authentication object returned from a succesful user creation. 


Note that buttons inside of a Form will automatically be of type submit unless specified otherwise. 