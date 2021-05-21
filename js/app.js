$(() => {

    ///////////////////////////////////    
    /// GLOBAL HELPERES
    ///////////////////////////////////    

    const fetchDisplay = () => {
        const { innerWidth } = window
        if (innerWidth < 630) return 'phone'
        else if (innerWidth < 900) return 'tablet'
        else return 'desktop'
    }

    /////////////////////////////////////
    /// FETCH PROJECTS FROM PROJECTS API
    ////////////////////////////////////

    let projects, cubePossibilities, display = fetchDisplay();

    $.ajax("https://your-projects-api.herokuapp.com/projects")
        .then(data => {
            projects = data.map(project => {
                return {...project}
            })
            cubePossibilities = generateCubePossibilites(projects)
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


    // This function will create an obj that will look like this:
    // const possibilites = {
    //     phone: [pos, pos, pos]
    //     tablet: [pos, pos, pos]
    //     desktop: [pos, pos, pos]
    // }

    const generateCubePossibilites = () => {
        let tabletCount = 0, desktopCount = 0;
        const possibilites = { 
            phone: new Array(projects.length).fill('y middle-top'), 
            tablet: [], 
            desktop: [] 
        }, mid = Math.floor(projects.length / 2) - 1

        for (let i = 0; i < projects.length; i++) {
            const { tablet, desktop } = possibilites
            const topOrBottom = i <= mid ? 'middle-top' : 'middle-bottom'
            switch (tabletCount) {
                case 0:
                    tablet.push('x left-end')
                    break
                case 1: 
                    tablet.push('x right-end')
                    break
                default:
                    break
            }
            switch (desktopCount) {
                case 0:
                    desktop.push('x left-end')
                    break
                case 1:
                    desktop.push('y ' + topOrBottom)
                    break
                case 2:
                    desktop.push('x right-end')
                    break
            }
            tabletCount++, desktopCount++
            if (tabletCount > 1) tabletCount = 0
            if (desktopCount > 2) desktopCount = 0
        }
        for (let i = 0; i < projects.length % 3; i++) {
            const { desktop } = possibilites, index = desktop.length - 1 - i
            switch (i) {
                case 0:
                    desktop[index] = ('x right-end')
                    break
                case 1: 
                    desktop[length] = ('x left-end')
                    break
                default:
                    break
            }
        }
        return possibilites
    }

    const $projContainer = $(".projects-container")
    let prevDisplay = null

    const applyCubeAnimations = ($projects) => {
        if (prevDisplay === display) return
        for (let i = 0; i < $projects.length; i++) {
            $projects.eq(i).removeClass().addClass('cube')
            $projects.eq(i).addClass(cubePossibilities[display][i])
        }
        for (let i = 0; i < $projects.length % 3; i++) {
            const index = $projects.length - 1 - i
            $projects.eq(index).css("z-index", 3)
        }
        prevDisplay = display
    }
        
    const renderProj  = projects => {
        projects.forEach((project, index) => {
            const $li = $("<li>")
            const $face1 = $("<div>").addClass(`face`)
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
            $face1.css("background-image", `url(${project.image})`)
            $li.append($face1)
            $li.append($face2)
            $projContainer.append($li)
        })
        applyCubeAnimations($projContainer.children())
    }
        
    const renderModal = project => {
        const $modal = $("<div>").addClass("modal")
        const $modalContent = $("<div>").addClass("modal-container").css("background", `url(${project.image})`)
        $modalContent.html(
            `
                <div class="modal-content">
                    <div>
                        <p class="modal-header">${project.name}</p>
                        <p class="modal-desc">${project.description}</p>
                    </div>
                    <div class="modal-links">
                        <a class="button" href="${project.demo}" target="_blank">Live Demo</a>
                        <a class="button" href="${project.repo}" target="_blank">View Code</a>
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
        const listWidth = $("#frontend").width(), 
            difference = listWidth - 230,
            round = Math.floor(difference / 30)
        speed.animation = listWidth * (30 - round * .6)
        speed.delay = listWidth * (3.75 - round * .1375)
    }

    const generateArr = ul => {
        const arr = []
        for (let i = 0; i < ul.length; i++) {
            arr.push("#" + ul.eq(i)[0].id)
        }
        return arr
    }

    const skillsAnimationLoop = (li, direction, pos, arr) => {
        const $liWidth = li.width() * 2, threeD = direction === 'left' ? 'rotate3d(1, 0, 0, 25deg)' : 'rotate3d(0, 1, 0, -25deg)'
        li.css({ [direction]: $liWidth * -1, transform: `translateY(${pos}) rotate(45deg) ${threeD}` })
        li.animate({ [direction]: $("#frontend").width() + $liWidth }, speed.animation, 'linear', () => {
            arr.push("#" + li[0].id)
        })
    }

    const applySkillsAnimations = async (arr, direction) => {
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
            skillsAnimationLoop(li, direction, pos, arr)
            await sleep(speed.delay)
            pos = pos === '-35px' ? '35px' : '-35px'
        }
    } 

    frontEnd = generateArr($frontEnd), backEnd = generateArr($backEnd)

    applySkillsAnimations(frontEnd, 'left')
    applySkillsAnimations(backEnd, 'right')

    ////////////////////
    /// WINDOW SCROLL 
    ////////////////////

    
    $(window).scroll(() => {
        const $landingPagePos = window.innerHeight
        const $secondaryBgPos = $("#secondary-bg").position().top

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
        display = fetchDisplay()
        applyCubeAnimations($projContainer.children())
        $("#frontend").empty()
        $("#backend").empty()
        generateSpeed()
        await sleep(speed.delay * Math.max(frontEnd.length, backEnd.length))
        $("#frontend").append($frontEnd)
        $("#backend").append($backEnd)
    })
})