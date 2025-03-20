let start = 0;
let count = 0;

export default async function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  try {
    generateTeaserDom(block, props)
  } catch (error) {
    console.log(" Error to load Teaser Api Block ", error)
  }
}

async function generateTeaserDom(block, props) {
  block.innerHTML = "";
  const [apiURl, btnT, btnCount,modalLinkDiv] = props;
  let url = apiURl?.textContent.trim();
  let btnText = btnT?.textContent.trim();
  let loadMoreCount = Number(btnCount?.textContent.trim());
  let modalLink = modalLinkDiv?.textContent.trim();
  // count = Number(loadMoreCount);
  let teaserHtmlDom = await imageDOM(block, url, loadMoreCount,modalLink)
  let gallaryImagesHTML = document.createElement("div");
  gallaryImagesHTML.classList.add("gallery-images")
  let buttonDiv = document.createElement("div");
  buttonDiv.classList.add("gallery__btn")
  gallaryImagesHTML.innerHTML = teaserHtmlDom;
  buttonDiv.innerHTML = ` <a role="button" id="gallery_btn">${btnText}<span class="icon-plus-o"></span></a>`
  block.append(gallaryImagesHTML)
  block.append(buttonDiv)
  // window.onload = function(){
  //   block.querySelectorAll(".gallery-filter__book-consultation").forEach((e)=>{
  //     console.log("linked")
  //     e.target.href = "/bh-eds/modals/sitevisitpopup"
  // })
  // }
  let loadMoreBTN = block.querySelector(".gallery__btn a")
  loadMoreBTN.addEventListener("click", () => loadmoreCards(block, apiURl, loadMoreCount,modalLink))
  
  // let popupBTN = block.querySelectorAll(".gallery-filter >a")
  // popupBTN.forEach((eachBTN)=>{
  //   eachBTN.addEventListener("click",(e)=> {
  //     e.prevenDefault();
  //     }
  // )
  // })
}

async function imageDOM(block, url, loadMoreCount=undefined, modalLink) {
  const response = await CFApiCall(url);
  let htmlContent = '';
  response.grouped.title.groups.slice(0, loadMoreCount).forEach((val) => {
    // const imgURL = val.doclist?.docs[0]?.featuredImg[0]?.split("$$$")[0]
    // const imgTitle = val.doclist?.docs[0]?.featuredImg[0]?.split("$$$")[1]
    // const title = val.doclist?.docs[0]?.title
    // const url = val.doclist?.docs[0]?.url
    // let btn = val.doclist?.docs[0]?.btn
    let {featuredImg,title,url,btn} = val.doclist?.docs[0];
    let [imgURL, imgTitle] = featuredImg[0]?.split("$$$");
    btn = "Book Free Site Visit";
    htmlContent += `
    <div onclick="" class="gallery-filter">
      <div class="redirection_link">     
        <a href="${url}" ></a>
      </div>
     <img src="https://static.asianpaints.com${imgURL+".transform/bh-gallery-listing/image.jpeg"+"?width=500&height=500&format=webply&optimize=medium"}" alt="${imgTitle}" title="${imgTitle}" loading="lazy" class="gallery-room-img" width="500" 
     height="500" >
     <h2 class="gl-filter-image-content">${title}</h2>
     <a href = "${modalLink?modalLink:"/modals/sitevisitpopup"}" class="gallery-filter__book-consultation"><span>${btn}</span></a>
</div>`
  })
  return htmlContent;
}

async function loadmoreCards(block, apiUrl, authCount,modalLink) {
  let url = `https://www.beautifulhomes.asianpaints.com/solr/BH-Revamp-gallery/select?q=identifier:gallery%20%20AND%20room:%22Study%20Room%22&start=${start}&rows=${authCount}&group=true&group.field=title&sort=publishedDate%20desc`;
  let imageDomH = await imageDOM(block, url, undefined, modalLink)
  console.log(imageDomH);
  
  let div= block.querySelector(".gallery-images")
  let btn = block.querySelector(".gallery__btn")
  div.innerHTML += imageDomH;
  block.append(div)
  block.append(btn)
  
  // count = count + Number(authCount);
  count = count + authCount;
  start=count;
  if(start >= 68){
    btn.querySelector("a").style.pointerEvents = "none";
    btn.querySelector("a").style.opacity = "0.5";
  }
}

export async function CFApiCall(cfurl) {
  const response = await fetchAPI('GET', cfurl);
  const responseJson = await response.json();
  return responseJson;
}

export function fetchAPI(method, url, data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (method === 'GET') {
        const resp = await fetch(url);
        resolve(resp);
      } else if (method === 'POST') {
        data.headerJson = data.headerJson || {
          'Content-Type': 'application/json',
        };

        if (data.headerJson['Content-Type'] == 'remove') {
          data.headerJson['Content-Type'] = '';
        } else {
          data.headerJson['Content-Type'] = data.headerJson['Content-Type'] ? data.headerJson['Content-Type'] : 'application/json';
        }

        /* Optimzie Code */
        /* data.headerJson = data.headerJson || {};
        data.headerJson["Content-Type"] = data.headerJson["Content-Type"] === 'remove' ? '' : data.headerJson["Content-Type"] || "application/json"; */

        const request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(data.requestJson),
          headers: data.headerJson,
        });
        const response = await fetch(request);
        const json = await response.json();
        resolve({ responseJson: json });
      }
    } catch (error) {
      console.warn(error);
      reject(error);
    }
  });
}

