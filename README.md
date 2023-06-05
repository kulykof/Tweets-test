# Project "Tweets"

Welcome to our social media application!
This project is a React-based web site that allows users to view a list of users and interact with the number of followers.
The project consists of two pages: "Home" and "Tweets".

**Features**

- Displays user cards with follow/unfollow buttons.
- Clicking the follow button changes the button text to "Following" and updates the follower count.
- Clicking the button again reverts the text and color to the initial state, and the follower count decreases by 1.
- The final user actions are persisted even after refreshing the page using LocalStorage.
- The user data is fetched from the mockapi.io backend with pagination support.
- The app is implemented on two pages using React-router-dom 6