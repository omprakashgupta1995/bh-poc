/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const isMobile = window.matchMedia('(max-width: 767px)');

    if (isMobile.matches && block.closest(".section.columns-container")) {
      const label = row.children[0];
      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';
      summary.append(...label.childNodes);
      // decorate accordion item body
      const body = row.children[1];
      body.className = 'accordion-item-body';
      // decorate accordion item
      const details = document.createElement('details');
      details.className = 'accordion-item';
      details.append(summary, body);
      row.replaceWith(details);
    }
    else if(!block.closest(".section.columns-container")){
      const label = row.children[0];
      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';
      summary.append(...label.childNodes);
      // decorate accordion item body
      const body = row.children[1];
      body.className = 'accordion-item-body';
      // decorate accordion item
      const details = document.createElement('details');
      details.className = 'accordion-item';
      details.append(summary, body);
      row.replaceWith(details);
    }
  });
  if(block.closest(".section.accordian-image")){
    let allSummary = block.querySelectorAll("summary");
    let firstSummary = allSummary[0].closest("details");
    firstSummary.setAttribute('open', '')
    allSummary.forEach((summary)=>{
      let details = summary.closest("details[open]");
        summary.addEventListener("click",(e)=>{
          let details = summary.closest("details[open]");
          if(details){
            details.setAttribute('open', '')
            e.stopImmediatePropagation();
            e.preventDefault();
            return
          }
          else{
            allSummary.forEach((summary)=>{
              summary.closest("details").removeAttribute("open");
            })
          }
        })
    })
  }
}
