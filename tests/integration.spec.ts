import { test, expect } from "@playwright/test";

// Home Page: Load
test("Home page should load successfully", async ({ page }) => {
    // Go to the home page
    await page.goto("http://localhost:3000/");

    // Check if the hero image is loaded
    const heroImage = await page.waitForSelector("img");
    expect(heroImage).toBeTruthy();
});

// Admin Page: Should redirect to login
test("Admin page should redirect to login page", async ({ page }) => {
    // Go to the admin page
    await page.goto("http://localhost:3000/admin");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Cart Page: Should redirect to login
test("Cart page should redirect to login page", async ({ page }) => {
    // Go to the cart page
    await page.goto("http://localhost:3000/cart");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Chinese Menu Page: Load
test("Chinese menu page should load successfully", async ({ page }) => {
    // Go to the chinese menu page
    await page.goto("http://localhost:3000/chinese");

    // Check if the menu page is loaded
    const menuPage = await page.waitForSelector("h1");
    expect(menuPage).toBeTruthy();
});

// Forgot Password Page: Load
test("Forgot password page should load successfully", async ({ page }) => {
    // Go to the forgot password page
    await page.goto("http://localhost:3000/forgot-password");

    // Check if the forgot password page is loaded
    const forgotPasswordPage = await page.waitForSelector("form");
    expect(forgotPasswordPage).toBeTruthy();
});

// Italian Menu Page: Load
test("Italian menu page should load successfully", async ({ page }) => {
    // Go to the italian menu page
    await page.goto("http://localhost:3000/italian");

    // Check if the menu page is loaded
    const menuPage = await page.waitForSelector("h1");
    expect(menuPage).toBeTruthy();
});

// Login Page: Load
test("Login page should load successfully", async ({ page }) => {
    // Go to the login page
    await page.goto("http://localhost:3000/login");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Profile Page: Should redirect to login
test("Profile page should redirect to login page", async ({ page }) => {
    // Go to the profile page
    await page.goto("http://localhost:3000/profile");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Shop Page: Should redirect to login
test("Shop page should redirect to login page", async ({ page }) => {
    // Go to the shop page
    await page.goto("http://localhost:3000/shop");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Shop Orders Page: Should redirect to login
test("Shop orders page should redirect to login page", async ({ page }) => {
    // Go to the shop orders page
    await page.goto("http://localhost:3000/shop-order");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Signup Page: Load
test("Signup page should load successfully", async ({ page }) => {
    // Go to the signup page
    await page.goto("http://localhost:3000/signup");

    // Check if the signup page is loaded
    const signupPage = await page.waitForSelector("form");
    expect(signupPage).toBeTruthy();
});

// Something Wrong Page: Load
test("Something wrong page should load successfully", async ({ page }) => {
    // Go to the something wrong page
    await page.goto("http://localhost:3000/something-wrong");

    // Check if the something wrong page is loaded
    const somethingWrongPage = await page.waitForSelector("h1");
    expect(somethingWrongPage).toBeTruthy();
});

// Sri-Lankan Menu Page: Load
test("Sri-Lankan menu page should load successfully", async ({ page }) => {
    // Go to the sri-lankan menu page
    await page.goto("http://localhost:3000/sri-lankan");

    // Check if the menu page is loaded
    const menuPage = await page.waitForSelector("h1");
    expect(menuPage).toBeTruthy();
});

// track-order Page: Redirect to login
test("track-order page should redirect to login page", async ({ page }) => {
    // Go to the track-order page
    await page.goto("http://localhost:3000/track-order");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});

// Wishlist Page: Should redirect to login
test("Wishlist page should redirect to login page", async ({ page }) => {
    // Go to the wishlist page
    await page.goto("http://localhost:3000/wishlist");

    // Check if the login page is loaded
    const loginPage = await page.waitForSelector("form");
    expect(loginPage).toBeTruthy();
});
