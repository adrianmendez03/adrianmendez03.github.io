////////////////////////
// PULL AND RENDER DATA
///////////////////////

$.ajax("https://your-projects-api.herokuapp.com/projects")
    .then(data => {
        const projects = data.map(project => {
            return {
                name: project.name,
                img: project.image,
                desc: project.description,
                live: project.demo, 
                github: project.repo,
                tech: project.tech
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
let menuOpen = false, $scrollPos = $(window).scrollTop()

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
/// SKILLS SCROLL
/////////////////////////////

$(() => {
    const width = window.innerWidth

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const loop = (li, direction) => {
        li.css({ [direction]: '-100px' })
        li.animate({ [direction]: width }, 5000, 'linear', () => {
            loop(li, direction)
        })
    }

    const applyAnimations = async (lis, direction) => {
        const q = [...lis]
        let time = 0
        while (q.length > 0) {
            console.log(q)
        }
        // for (let i = 0; i < lis.length; i++) {
        //     setTimeout(() => {
        //         loop(lis.eq(i), direction)
        //     }, time)
        //     time += 2000
        // }
    } 

    const frontEnd = $("#frontend li")
    const backEnd = $("#backend li")

    applyAnimations(frontEnd, 'left')
    applyAnimations(backEnd, 'right')
})

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
    const $modalContent = $("<div>").addClass("modal-container").css("background", `url(${project.img})`)
    $modalContent.html(
        `
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
    console.log(category)
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

const $landingPagePos = window.innerHeight
const $secondaryBgPos = $("#secondary-bg").position().top

$(window).scroll(() => {
    $scrollPos = $(window).scrollTop()

    if ($scrollPos > $landingPagePos) {
        $("nav").addClass("blur")
    } else {
        $("nav").removeClass("blur")
    }

    if ($scrollPos + 54 > $secondaryBgPos && !menuOpen) {
        $logo.addClass("dark-text")
        $navIcon.addClass("black-text")
    } else {
        $logo.removeClass("dark-text")
        $navIcon.removeClass("black-text")
    }
})