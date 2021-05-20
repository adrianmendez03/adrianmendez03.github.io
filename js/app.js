$(() => {

    /////////////////////////////////////
    /// FETCH PROJECTS FROM PROJECTS API
    ////////////////////////////////////

    let projects;

    $.ajax("https://your-projects-api.herokuapp.com/projects")
        .then(data => {
            projects = data.map(project => {
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

    const $logo = $("#logo")
    const $navIcon = $("#nav-icon")
    const $menu = $("#menu")
    let menuOpen = false, $scrollPos = $(window).scrollTop()

    /////////////////////////////////////
    /// MENU FUNCTIONALITY 
    ////////////////////////////////////
    
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
    
    /////////////////////////////////////
    /// RENDER THE PROJECTS
    ////////////////////////////////////

    const $projContainer = $(".projects-container")
    let $projects
        
    const renderProj  = projects => {
        projects.forEach((project, index) => {
            const $li = $("<li>").addClass("cube")
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
                renderModal(project)
            })
            $content.append($button)
            $face2.append($content)
            $face1.css("background-image", `url(${project.img})`)
            $li.append($face1)
            $li.append($face2)
            $projContainer.append($li)
        })
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

    //////////////////////
    /// SKILLS ANIMATIONS
    //////////////////////

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

    ////////////////////
    /// WINDOW SCROLL 
    ////////////////////

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

    window.addEventListener('resize', async () => {
        renderProj(projects)
        $("#frontend").empty()
        $("#backend").empty()
        generateSpeed()
        await sleep(speed.delay * Math.max(frontEnd.length, backEnd.length))
        $("#frontend").append($frontEnd)
        $("#backend").append($backEnd)
    })
})