import { api } from "./client.js";

async function getArticles() {
  console.log("Hola mundo!");
  let url = 'https://newsapi.ecn.cl/NewsApi/inversiones/subseccion/acciones?size=10';
  let data;
  try {
    data = await api(url);
  } catch (error) {
    console.error("Error", error);
  }

  console.log(data);

}



getArticles();