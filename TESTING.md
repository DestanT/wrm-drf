### Testing TODO

This document will grow along with the project. It will contain the testing plan, test cases, and in some cases, even the results.

For now; this is more of a reminder to myself what tests I need to write once the project is more mature. The structure of this document may very well change in the future, as unit testing alone will not be enough, and I will need to include integration and possibly end-to-end testing as well.

#### Axios Interceptor Testing

These tests were performed to ensure that the Axios interceptor functions as expected. The interceptor is responsible for adding the user's JWT token to the headers of every request made to the server. It also checks for an expired access token and refreshes it if necessary.

Request Interceptor:

- [ ] Test that the request interceptor adds the JWT token to the auth headers of every request.
- [ ] Test that the request interceptor does not add the JWT token to the auth headers of requests if no "session" is in progress, ie user is not logged in.
- [ ] Test that the access token is refreshed if it is expired.
- [ ] Test that the access token is not refreshed if it is not expired.

Response Interceptor:
Note: The response interceptor is not yet implemented. It will be responsible for checking the response status code and refreshing the access token if necessary.

<p align="right">
  <a href="#">Back to the top</a>
</p>
