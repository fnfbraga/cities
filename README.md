
# cities

Simple search example with NodeJS and Svelte

To install the node server go ahead and install all the node packages under the ***server*** directory

````
cd /server && npm i && cd ..
````

After this completes installing navigate to the ***client*** forder and run 
````
cd /client/cities && npm i && cd ..
`````

Then open 2 terminal windows (1 to run the server in DEV mode and another one for the Svelte Compiler)

Window 1: Start node server:

`````
cd /server && npm start
`````

Window 2: Start Svelte compiler:

`````
cd /client/cities && npm run dev
`````

Finally, go to 

``````
localhost:5000
