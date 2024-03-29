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

# The Auth Object

Note that the auth object is the return of getAuth() function and simply returns the authentication instance to be used in the signin and authentication of user creation. 

This is NOT the userAuth object which is returned by the firebase API upon successful authentication or account creation!

# React Context

Why do we need Context? Well note that the userAuth object is only returned in the Sign In and Sign Up functions which fire in their respective components. 

However other components also need that object! The profile page, the history page etc. 

One way of doing this is sending up the user Object to the App Component to pass down to all its children. The latter part is called prop drilling and is somewhat wasteful as there is no need for a lot of these Components to have the user Object. 

React Context allows you to have one external storage space that any Component can read and write to directly. 

- setCurrentUser method is called
- any Component that now has the currentUser hook should now re-render as React detects (since the setter function has fired) that this hook has been updated.  

Context is esssentially just a Compoenent that leverages useState on a parent level. 

However rather than passing down props like parent components usually do, it passively gives access to all the child components that want to access it.  

## Important Notice

Any Component that is 'hooked' into a a Context will re-run whenever that context state changes regardless of whether the state change happens in another component or not.

This does NOT mean the whole component will be re-rendered in the DOM though! Rememeber that React uses the Virtual DOM to detect exactly what changed and will cause only that portion of the content to re-render. 

You can see exactly what is re-rendering by using the Paint Flashing tool under 'Rendering'

This still means the function is still being re-run though. This could potentially cause performance issues if there is a large amount of code before the render function. 

## Order of Contexts

We set up the order of React contexts by the relationship which should exist between the data in that context. For example, in this case we have products and users. 

Ask, does whatever you are wrapping need access to what you are providing? Because the child components will be the ones that need to be fed data (ideally). 

- The product context will need to be able to access the user who is logged in because they may decide to filter out which products to display for this user (based on geolocation, products already sold to this user etc.)
- The user context (sign in, sign out etc.) don't really need to have access to the products since it won't really do anything with this data. 

Since the direction of data is downwards, the User Provider will need to wrap around the Products Provider. 

# Consolidating Authentication Changes

Note that every time we want to change auth state and update user status, we have to use the setCurrentUser function and this results in our post-auth userState changes being spread out over multiple functions and components. 

In order to get around this, we use the observableListener which Firebase provides. 

The idea is that, this will listen to whenever the auth state changes (due to sign in or sign out) and will execute the code in it. 

In fact, Firebase is actually listening to our INSTANCE of crwn-clothing Auth and is keeping track on whether the user is logged in or not. 

## Where to Listen?

The best place for this listener to be made active would be the User Context. Since this has the currentUser state, and we know that it exists on a parent level to other components, we can simply have the listener in the useEffect function and have setUser fire when an auth state changes with the return of the latter. 

Note that the auth state change always returns the user object if succesful and returns null if not succesful so we can setUser here. 

Also note that Google Sign in can also be used to sign up people as the authentication object it contains has the name and email for that person. 

# Overall styling

Styling for the whole page (padding, margins etc.) should be placed in the index.css file!

# Cart

If you think about it, Context really is appropriate for the cart. Remember that the cart items need to be viewed on multiple components and pages! Therefore it makes sense to have the cart items be accessible across the aoo. 

In fact it makes sense for this to be a level below the products as the cart items selected are only a subset of the products. 

There is another reason to have this be a Context. Remember that we want to be able to open or close this based on if the user has clicked on a navigation button. 

We need to enable communication between the nav bar button and the cart component itself. We could do this via parent-child comms but it can also be done with Context!

## Setting/Updating Cart Items

Since this is a more complex item, we cannot simply use the setter function directly and must provide a helper function that can process the data before updating the context state.

- First we identify where the function will be used: it will be used in the product card so it should take in the product. 
- Then we write a function that takes in the product and processes out the data we want to update the cart items context with. 
- Finally we should set cart items with an updated array. 

Notice why we use a helper function to do the processing: Because we want to make sure that what we have is a series of PURE functions! We do NOT want to create functions that alter the data outside of it and as such it is much better practice to write a helper to return updated arrays instead of conditionally updating an existing array. 

# UseEffect Best practices

It is best to run multiple useEffects for each specific functionality rather than just have all the code in one useEffect. 

## UseEffect and Requests

It is always best to create a function inside useEffect and then fire it instead of making the useEffect function an async method itself.  

# The FireStore database

## Filling in the dummy data

To do this we utilize a method in Firbase that allows us to write our fake data to the Firestore database. Note that firing this multiple times is fine, because if Firebase detects that we already have this collection in the database, then it will not bother creating it again. 

# Handling the collection in the React App

The best way to handle this collection is to use it as an object with the items being each induvidual category. Note that it is labeled as being a map which it is technically not. 

# Previews

Notice that for previews we still use parent-child communication. So context is not always needed!

# Nested Route

When we use shop/* in the main App component, we are essentially saying:

- Whenever someone goes to whatever parameters of shop that follow, render the Shop. 
- Since there are additional routes inside the shop component, the navigation will follow that path. 

# Where to place event listeners for Context Changes

When using Context, it is clear that the best place to put the event listeners would be the modular item itself. The best example of this is the ProductCard component being able to change the Cart Context. 

This way, it does not matter where the ProductCard is placed in the app, people will always be able to add to card by clicking its button. 

# Styling Clashing

Note that using CSS styles involves potential clashes due to shared names. Of course we could use unique naming conventions to get around this. However there is a more reliable solution. 