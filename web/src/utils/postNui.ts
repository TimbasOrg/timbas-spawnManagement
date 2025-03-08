//Função responsável por enviar eventos para o NUI.
export async function postNui<T = any>(
  eventName: string,
  data?: any
): Promise<T> {
  //Obtem o nome do recurso pai do NUI.
  const resourceName = (window as any).GetParentResourceName();

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`https://${resourceName}/${eventName}`, options);

  const responseJson = await response.json();

  return responseJson;
}
