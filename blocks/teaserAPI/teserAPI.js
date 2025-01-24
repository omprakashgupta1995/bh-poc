export default async function decorate(block){
    const props = [...block.children].map((row) => row.firstElementChild);
    const [apiURl, btnText, btnLink ] = props;
    const url = apiURl.textContent.trim();
  const cfRepsonse = await CFApiCall(url);
  const repsonseData = cfRepsonse.data;
}

export async function CFApiCall(cfurl) {
    const response = await fetchAPI('GET', cfurl);
    const responseJson = await response.json();
    return responseJson;
  }