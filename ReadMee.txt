Docs:
Folder tree:
Images: it will contain all the image assets of our website.



public: ignore this folder it will contain code if we have static website but we are using dynamic so we can leave it blank or we can use it for testing purposes.
Src: this will hold all our backend stuff such as database, JS,EJS,NODEJS code and the main function exist there in the app.js file 
Templates: this is where all our frontend stuff goes and it has sub folders that will hold all the html, css stuff 
	Partial: Folder contains the code that is repetitive In multiple html files you can drop the code there and call that code in the html file by using {{>filename}} and this will import the code inside that html file
	views: this folder will host html files for all the different pages that we will have
Package.json: this are configuration files do not mess with it unless you know what you are doing.