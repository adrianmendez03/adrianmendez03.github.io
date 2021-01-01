////////////////////////
// PULL AND RENDER DATA
///////////////////////

$.ajax("https://spreadsheets.google.com/feeds/list/1uX9LdKDyy8BIS8HXQAoLBCbUqhaZgM5nNaFaelV8A0o/1/public/full?alt=json")
    .then(data => {
        const rawProjects = data.feed.entry

        const projects = rawProjects.map(project => {
            return {
                name: project.gsx$name.$t,
                img: project.gsx$img.$t,
                desc: project.gsx$description.$t,
                live: project.gsx$live.$t, 
                github: project.gsx$github.$t,
                tech: project.gsx$tech.$t
            }
        })
        renderProj(projects)
    })

//////////////////////////////
//// Mobile Nav Functionality
/////////////////////////////

const $logo = $("#logo")
const $navIcon = $("#nav-icon")
const $menu = $("#menu")
let menuOpen = false

$navIcon.click(e => {
    if (menuOpen) {
        $menu.removeClass("open")
        $logo.removeClass("black-text")
        $navIcon.removeClass("open-color")
        menuOpen = false
    } else {
        $menu.addClass("open")
        $logo.addClass("black-text")
        $navIcon.addClass("open-color")
        menuOpen = true
    }
})

/////////////////////////////
/// NAVIGATION ANIMATION
/////////////////////////////

///////////////////////////////
//// PROJECT RENDERING 
///////////////////////////////

const $projContainer = $(".projects-container")
let $projects

const renderProj  = projects => {
    for (project of projects) {
        const $li = $("<li>").addClass(`${project.tech}`)
        const $div = $("<div>").addClass("project")
        $div.html(
            `
                <div class="project-content">
                    <div class="project-content-top">
                        <p>${project.name}</p>
                        <p>${project.desc}<p>
                    </div>
                    <div class="project-content-bottom">Learn More</div>
                </div>
   
            `
        )
        $li.css("background-image", `url(${project.img})`)
        $li.append($div)
        $projContainer.append($li)
    }
    $projects = $projContainer.children()
}


///////////////////////////////////////
/// PROJECT NAV FUNCTIONALITY ANIMATION
///////////////////////////////////////

const $projNav = $(".proj-nav").children()
const $underline = $("hr")

for (let i = 0; i < 4; i++) {
    $projNav.eq(i).click(e => {
        updateProjNav(e.target.id)
        filterProjects(e.target.id)
    })
}

const updateProjNav = id => {
    $underline.removeAttr('id')
    $underline.attr('id', `_${id}`)
}

const filterProjects = category => {
    for (let i = 0; i < $projects.length; i++) {
        const $project = $projects.eq(i)
        if ($project.hasClass(category) || category === "all") {
            $project.removeClass("gone")
        } else {
            $project.addClass("gone")
        }
    }
}

////////////////////////
/// SCROLLING 
////////////////////////

const $secondaryBgPos = $("#secondary-bg").position().top

$(window).scroll(() => {
    let $scrollPos = $(window).scrollTop()
    if ($scrollPos + 54 > $secondaryBgPos) {
        $logo.addClass("dark-text")
        $navIcon.addClass("black-text")
    } else {
        $logo.removeClass("dark-text")
        $navIcon.removeClass("black-text")
    }
})