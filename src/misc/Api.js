const API = "https://api.tvmaze.com";

export async function GetApi(getapi )  {
   const responce =  fetch(`${API}${getapi}`).then(r => r.json())
     return responce;
}