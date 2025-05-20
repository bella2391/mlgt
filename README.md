# mlgta - multi login todo app

## Feature

Can log in via google, x, discord.  
![alt text](https://raw.githubusercontent.com/verazza/branding/refs/heads/master/repo/mlgta/login_form.png)  
After login successfully, redirecting.  
![alt text](https://raw.githubusercontent.com/verazza/branding/refs/heads/master/repo/mlgta/redirect.png)  
Can write todo list.  
![alt text](https://raw.githubusercontent.com/verazza/branding/refs/heads/master/repo/mlgta/todo.png)

## Run
```
npm run dev
```

## Comment
Many things I added after the fact to make it usable in a production environment.  
For example, I think csrf countermeasure is perfect.  
Want to know more about middleware quickly: [src/middlewares](src/middlewares)

## Config & Database
see [data/config.json.example](data/config.json.example) and [create_tables.sql](create_tables.sql).

## Inspired
[”Introduction to Creating Web Applications with Node.js”](https://zenn.dev/wkb/books/node-tutorial).  

## Credits
This project uses other external assets someone creates - see the [CREDITS](CREDITS)

## License
[MIT](LICENSE)
