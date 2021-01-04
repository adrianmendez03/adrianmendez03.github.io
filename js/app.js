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

const menuFunctionality = () => {
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
}

$navIcon.click(e => {
    menuFunctionality()
})

$("#menu").children().click(e => {
    menuFunctionality()
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
    let i = 0
    for (project of projects) {
        let j = i
        const $li = $("<li>").addClass(`${project.tech}`)
        const $div = $("<div>").addClass("project")
        const $content = $("<div>").addClass("project-content")
        $content.html(
            `
                <div class="project-content-top">
                    <p>${project.name}</p>
                    <p>${project.desc}<p>
                </div>
            `
        )
        const $button = $("<div>").addClass("project-content-bottom button").text("Learn More")
        $button.click(e => {
            renderModal(projects[j])
        })
        $content.append($button)
        $div.append($content)
        $li.css("background-image", `url(${project.img})`)
        $li.append($div)
        $projContainer.append($li)
        i++
    }
    $projects = $projContainer.children()
}

const renderModal = project => {
    const $modal = $("<div>").addClass("modal")
    const $modalContent = $("<div>").addClass("modal-container")
    $modalContent.html(
        `
            <img class="modal-image" src=${project.img}></img>
            <div class="modal-content">
                <div>
                    <p class="modal-header">${project.name}</p>
                    <p class="modal-desc">${project.desc}</p>
                </div>
                <div class="modal-links">
                    <a class="button" href="${project.live}" target="_blank">Live Demo</a>
                    <a class="button" href="${project.github}" target="_blank">View Code</a>
                </div>
            </div>
        `
    )
    $modalContent.click(e => e.stopPropagation())
    $modal.click(e => $modal.remove())
    $modal.append($modalContent)
    $("body").append($modal)
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