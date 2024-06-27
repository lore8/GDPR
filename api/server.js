const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
