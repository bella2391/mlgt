# todoapp

## Feature

Can log in via google, twitter, discord.  
![alt text](https://github.com/bella2391/branding/blob/master/explain/learning/js_ts/login_form.png)  
After login successfully, redirecting.  
![alt text](https://github.com/bella2391/branding/blob/master/explain/learning/js_ts/redirect.png)  
Can write todo list.  
![alt text](https://github.com/bella2391/branding/blob/master/explain/learning/js_ts/todo.png)

## Run
```
npm run start:todoapp:dev
```

## Comment
Many things I added after the fact to make it usable in a production environment.  
For example, I think csrf countermeasure is perfect.  
Want to know more about middleware quickly: [src/middlewares](src/middlewares)

## Env & Database
see [example.env](example.env) and [create_tables.sql](create_tables.sql).

## Inspired
[”Introduction to Creating Web Applications with Node.js”](https://zenn.dev/wkb/books/node-tutorial).  

## License
[MIT](License.txt)

## Credits
This project uses other external assets someone creates - see the [CREDITS.txt](CREDITS.txt)
