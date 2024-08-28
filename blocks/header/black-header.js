export function toggleActiveLogo(block) {

   block.closest(".section.nav-black-header > div.default-content-wrapper > ul > li:nth-child(2) > ul > li:nth-child(2) > a").classList.add("logo-active");
    // bhActive.classList.add("logo-active");
    //toggle logo icon
    block.closest('.section.nav-black-header > div.default-content-wrapper > ul > li:nth-child(2) > ul li a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove 'active' class from all links
            block.closest('.section.nav-black-header > div.default-content-wrapper > ul > li:nth-child(2) > ul li a').forEach(link => link.classList.remove('logo-active'));

            // Add 'active' class to the clicked link
            this.classList.add('logo-active');
        });
    });
}
