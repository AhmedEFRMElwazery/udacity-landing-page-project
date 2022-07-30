/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sectionsCollection = document.querySelectorAll('section');
let navBarList = document.querySelector("#navbar__list");
let headerBar = document.querySelector('.page__header');
let heroSection = document.querySelector('.main__hero');
let scrollToTopButton = document.querySelector("#scrollToTop")
let scrollingInactive;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**  
 *a function that is called upon click on the "hamberger" when visible,...
  toggling between "hamburger" and "cross" icons
*/
function responsiveMenuToggle() {

    var linksMenu = document.querySelector(".navbar__menu");
    var iconType = document.querySelector('i')
    if (linksMenu.className === "navbar__menu") {
        linksMenu.classList.add("responsive");
        iconType.classList.remove('fa-solid', 'fa-bars');
        iconType.classList.add('fa-solid', 'fa-x');
    } else {
        linksMenu.classList.remove("responsive");
        iconType.classList.remove('fa-solid', 'fa-x');
        iconType.classList.add('fa-solid', 'fa-bars');
    }
  }


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function createAnchorElement(sectionIdValue, liTitle){
    //creating "a" HTML element
    anchorElement = document.createElement('a');
    //setting the class attribute for the "a" element to be "menu__link"
    anchorElement.setAttribute('class', 'menu__link');
    //setting the href attribute for the "a" element and linking it to each section
    anchorElement.setAttribute('href', `#${sectionIdValue}`);
    //adding the contained text within the "a" element
    anchorElement.textContent = `${liTitle}`;

    return anchorElement;
}

function createLiElement(section){
    let liTitle = section.getAttribute('data-nav');
    //getting the id from each secion
    let sectionIdValue = section.getAttribute('id');
    
    //create "li" HTML element
    let liElement = document.createElement('li');
    //adding retrieved info as title to "li" HTML element
    liElement.setAttribute('title', `${liTitle}`);
    
    //calling the "createAnchorElement" function to create and return an "a" element
    let anchorElm = createAnchorElement(sectionIdValue, liTitle);

    //appending the generated "a" element to the "li" element
    liElement.appendChild(anchorElm);

    //attaching a listner event for a click to the "li" element
    liElement.addEventListener('click', (event)=>{
        event.preventDefault();
        //once a click is deteceted, responsive menu is closed, and moves to target section 
        responsiveMenuToggle();
        //and scroll to the target section
        section.scrollIntoView({behavior: 'smooth'})
    });

    return liElement;
}



/**
 * building the navbar "li" and "a" elements for each section, 
 * and appending them to the navbar menu located inside the "header" element
*/
sectionsCollection.forEach(section => {
    /**
     * calling the "createLiElement" function, and its dependant  
     * "createAnchorElement" function, on each section
     */
   let createdLiElement = createLiElement(section);
    //appending each of the generated "li" elements to  to the navbar
    navBarList.appendChild(createdLiElement);
})



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Event listening for a scroll 
// Adding a class 'active' to section when near top of viewport
window.addEventListener('scroll', (event)=>{
    event.preventDefault();
    //once a scroll is detected, the scrollingInactive variable is reset...
    window.clearTimeout(scrollingInactive);
    //...and the menu is shown, by removing the "hidden" class
    headerBar.classList.remove('hidden');

    //checking how far each section top is from the top of the viewport
    for(section of sectionsCollection){
        //getting the section top coordinate
        let sectionRect = section.getBoundingClientRect();
        //checks if the section top is near or close to the top
        if(sectionRect.top >= 0 && sectionRect.top < 150){
            //if this is the case, an "active" class is added to the section
            section.classList.add('active');
        } else {
            //if it is NOT the case, and if the section contains a class "active", it is removed 
            section.classList.remove('active');
        }   
    }
    
    scrollingInactive = setTimeout(()=>{
        /**
         * checks if the viewport is at the top of the page or not,
         * by using the hero section as a reference point
         */
        if(heroSection.getBoundingClientRect().top < 0){
        //if the viewport is not at the top of the page, the header is hidden
            headerBar.classList.add('hidden');
        }
    }, 3000)
});

// Event lsitening to a button click to scroll to the top of the page
scrollToTopButton.addEventListener('click', ()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
})


