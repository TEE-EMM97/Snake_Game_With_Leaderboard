# Snake_Game_With_Leaderboard
Simple Javascript snake game with MySQL and Node.JS integration

MySQL Database holds user name, password, and score.

Node.JS Server communicates between client and database.
* Used to route requests and responses.


Client webpages for logging in, creating a new user, and accessing the game page.
* Log in page
	* requests server for log in credentials
	* alerts user if credentials are incorrect
* New user page
	* requests for new user assuming they don't already exist
	* includes form validation for error/text checking on password
* Game page allows user to:
    * play the game
    * view leaderboard and high scores
    * update/change password
    * delete user account

Javascript snake game taken from http://zetcode.com/javascript/snake/ and adapted.
* Added leaderboard, highscore, and counter to game.
