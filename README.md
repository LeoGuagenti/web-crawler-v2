# web-crawler-v2
A Small Web Crawler made with TypeScript

## Usage
This webcrawler takes a starting url and collects urls relative to the domain. The crawler will visit all possible relative urls.<br>
The starting url location can be changed at the bottom of `index.ts`

To compile and run the application, you must first have `NodeJS` and `TypeScript` installed<br><br>

### Installing TypeScript
To install TypeScript, run the command:<br>
```shell
npm i -g typescript
```

### Compiling To JavaScript
To compile the TypeScript into JavaScript, run the command:<br>
```shell
tsc index.ts
```
The command will output a file called `index.js`

### Running the Final Application
To run the compiled application run the command:<br>
```shell
node index.js
```
