////////////////////////
// PULL AND RENDER DATA
///////////////////////

$.ajax("https://spreadsheets.google.com/feeds/list/1uX9LdKDyy8BIS8HXQAoLBCbUqhaZgM5nNaFaelV8A0o/1/public/full?alt=json")
    .then(data => {
        console.log(data)

        const rawProjects = data.feed.entry

        const projects = rawProjects.map(project => {
            return {
                name: project.gsx$name.$t,
                img: project.gsx$img.$t,
                desc: project.gsx$description.$t,
                live: project.gsx$live.$t, 
                github: project.gsx$github.$t
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

$navIcon.click(e => {
    if ($menu.hasClass("closed")) {
        $menu.removeClass("closed").addClass("open")
        $logo.addClass("open-color")
        $navIcon.addClass("open-color")
    } else {
        $menu.removeClass("open").addClass("closed")
        $logo.removeClass("open-color")
        $navIcon.removeClass("open-color")
    }
})

///////////////////////////////
//// PROJECT RENDERING 
///////////////////////////////

const $projContainer = $(".projects-container")

const renderProj  = projects => {
    for (project of projects) {
        const $li = $("<li>").html(`<div>${project.name}</div>`)
        $projContainer.append($li)
    }
}


