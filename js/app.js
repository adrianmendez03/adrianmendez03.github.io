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
        const { tablet, desktop } = possibilites
        for (let i = 0; i < projects.length; i++) {
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
            const index = desktop.length - 1 - i
            desktop[index] = 'y middle-bottom'
        }
        if (projects.length % 2 === 1) {
            tablet[projects.length - 1] = 'y middle-bottom'
        }
        return possibilites
    }

    const $projContainer = $(".projects-container")
    let prevDisplay = null

    const applyCubeAnimations = async ($projects) => {
        if (prevDisplay === display) return
        for (let i = 0; i < $projects.length; i++) {
            $projects.eq(i).removeClass().addClass('cube')
            $projects.eq(i).addClass(cubePossibilities[display][i])
        }
        for (let i = 0; i < $projects.length % 3; i++) {
            const index = $projects.length - 1 - i
            $projects.eq(index).css("z-index", 3)
        }
        $("#frontend").empty()
        $("#backend").empty()
        speed = generateSpeed()
        await sleep(speed.delay)
        $("#frontend").append($frontEnd)
        $("#backend").append($backEnd)
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
            $button.click(() =>showModal(project))
            $content.append($button)
            $face2.append($content)
            $face1.css("background-image", `url(${project.image})`)
            $li.append($face1)
            $li.append($face2)
            $projContainer.append($li)
        })
        applyCubeAnimations($projContainer.children())
    }

    /////////////////////////
    /// MODAL FUNCTIONAILTY
    /////////////////////////


    const formatModal = (project) => {
        const icons = {
            jquery: ['img', './icons/jquery.svg'],
            react: ['i', 'fab fa-react'],
            nodejs: ['i', 'fab fa-node'],
            express: ['img', './icons/expressjs.svg'],
            mongodb: ['img', './icons/mongodb.svg'],
            python: ['i', 'fab fa-python'],
            rubyonrails: ['img', './icons/rubyonrails.svg'],
            postgres: ['img', './icons/postgres.svg'],
            mysql: ['img', './icons/mysql.svg']
        }

        const { image, name, description, frontend, server, database, demo, repo } = project

        $("#tech").empty()
        $("#modal-bg").css({ background: `url(${image})` })
        $(".modal-header h3").text(name)
        $("#description p").text(description)
        $("#repo").attr('href', repo)
        $("#demo").attr('href', demo)

        const stack = [frontend, server, database]

        for (let i = 0; i < stack.length; i++) {
            const tech = stack[i]
            if (tech) {
                const techInfo = icons[tech], $el = $(`<${techInfo[0]}>`), $li = $("<li>")
                if (techInfo[0] === 'i') {
                    $el.addClass(techInfo[1])
                } else {
                    $el.attr('width', '80px').attr('src', techInfo[1])
                }
                $li.append($el)
                $("#tech").append($li)
            } else {
                break
            }
        }
    }
        
    const showModal = (project) => {
        formatModal(project)
        const $modalBg = $("#darkness")
        $modalBg.css({ bottom: '0', opacity: '1' })
    }

    //////////////////////
    /// SKILLS ANIMATIONS
    //////////////////////


    const $frontEnd = $("#frontend li"), $backEnd = $("#backend li")
    let frontEnd, backEnd;

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const generateSpeed = () => {
        const listWidth = $("#frontend").width(), 
            difference = listWidth - 335,
            round = Math.floor(difference / 25)
        return {
            animation: listWidth * (40 - round * .75),
            delay: listWidth * (5.5 - round * .200)
        }
    }

    let speed  = generateSpeed()

    const generateArr = ul => {
        const arr = []
        for (let i = 0; i < ul.length; i++) {
            arr.push("#" + ul.eq(i)[0].id)
        }
        return arr
    }

    const skillsAnimationLoop = (li, direction, pos, arr, isNull) => {
        const $liWidth = li.width() * 2, threeD = direction === 'left' ? 'rotate3d(1, 0, 0, 25deg)' : 'rotate3d(0, 1, 0, -25deg)'
        li.css({ [direction]: $liWidth * -1, transform: `translateY(${pos}) rotate(45deg) ${threeD}` })
        li.animate({ [direction]: $("#frontend").width() + $liWidth / 2 }, speed.animation, 'linear', () => {
            if (isNull) li.remove()
            else arr.push("#" + li[0].id)
        })
    }

    const applySkillsAnimations = async (arr, direction, pos = '35px', nullCount = 0) => {
        const id = arr.shift() 
        let li, isNull = false;
        if (id) {
            li = $(id)
        } else {
            isNull = true
            const div = $("<div>").append("<div>")
            li = $("<li>").addClass('null-li').append(div)
            if (direction === 'left') $("#frontend").append(li)
            else $("#backend").append(li)
        }
        skillsAnimationLoop(li, direction, pos, arr, isNull)
        pos = pos === '-35px' ? '35px' : '-35px'
        setTimeout(() => applySkillsAnimations(arr, direction, pos, nullCount), speed.delay)
    } 

    frontEnd = generateArr($frontEnd), backEnd = generateArr($backEnd)

    setTimeout(() => {
        applySkillsAnimations(frontEnd, 'left')
        applySkillsAnimations(backEnd, 'right')
    }, 2500)
    // applySkillsAnimations(frontEnd, 'left')
    // applySkillsAnimations(backEnd, 'right')

    ///////////////////////////////////
    /// WINDOW SCROLL & EVENT LISTENERS
    //////////////////////////////////

    
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

    $("#darkness").click(() => $("#darkness").css({ bottom: '-100vh'}))
    $("#modal-bg").click(e => e.stopPropagation())
    window.addEventListener('resize', async () => {
        display = fetchDisplay()
        applyCubeAnimations($projContainer.children())
    })
})