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
    const speed  = {
        animation: 9000,
        delay: 1100
    }
    const $frontEnd = $("#frontend li"), $backEnd = $("#backend li")
    let frontEnd, backEnd;

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const generateSpeed = () => {
        const width = $("#frontend").width(), 
            difference = width - 230,
            round = Math.floor(difference / 30)
        speed.animation = width * (30 - round * .6)
        speed.delay = width * (3.75 - round * .1375)
    }

    const generateArr = ul => {
        const arr = []
        for (let i = 0; i < ul.length; i++) {
            arr.push("#" + ul.eq(i)[0].id)
        }
        return arr
    }

    const loop = (li, direction, pos, arr) => {
        const $width = li.width() * 2
        li.css({ [direction]: $width * -1, transform: `translateY(${pos}) rotate(45deg)` })
        li.animate({ [direction]: $("#frontend").width() + $width }, speed.animation, 'linear', () => {
            arr.push("#" + li[0].id)
        })
    }

    const applyAnimations = async (arr, direction) => {
        generateSpeed()
        let pos = '-35px', nullCount = 0
        while (arr) {
            const id = arr.shift() 
            let li;
            if (id) {
                li = $(id)
            } else {
                const div = $("<div>").append("<div>")
                li = $("<li>").attr('id', direction + nullCount).addClass('null-li').append(div)
                if (direction === 'left') $("#frontend").append(li)
                else $("#backend").append(li)
                nullCount++
            }
            loop(li, direction, pos, arr)
            await sleep(speed.delay)
            pos = pos === '-35px' ? '35px' : '-35px'
        }
    } 

    frontEnd = generateArr($frontEnd), backEnd = generateArr($backEnd)

    applyAnimations(frontEnd, 'left')
    applyAnimations(backEnd, 'right')

    window.addEventListener('resize', async () => {
        $("#frontend").empty()
        $("#backend").empty()
        generateSpeed()
        await sleep(speed.delay * Math.max(frontEnd.length, backEnd.length))
        $("#frontend").append($frontEnd)
        $("#backend").append($backEnd)
    })
})

///////////////////////////////
//// PROJECT RENDERING 
///////////////////////////////

const $projContainer = $(".projects-container")
let $projects

const renderProj  = projects => {
    let i = 0
    for (let project of projects) {
        const $li = $("<li>").addClass("cube left-end x")
        const $face1 = $("<div>").addClass(`face ${project.tech}`)
        const $face2 = $("<div>").addClass("face project")
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
            renderModal(projects[i])
        })
        $content.append($button)
        $face2.append($content)
        $face1.css("background-image", `url(${project.img})`)
        $li.append($face1)
        $li.append($face2)
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