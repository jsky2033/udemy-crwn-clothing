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

The Shop Component will always appear at the place chosen in the Home component when the user visits /home/shop! Somewhat similar to slots in Web Components but more related to navigation paths. 

There is a much more sensible example in the app Home page itself! It makes much more sense to place the Outlet in the Nav Bar. 

# Fragments

Fragments are essentially hollow divs that can be used when you have a div element that serves no other purpose than to wrap element. It CANNOT be styled. 