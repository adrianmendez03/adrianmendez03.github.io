////////////////////////
// PULL AND RENDER DATA
///////////////////////

const $navIcon = $("#nav-icon")
const $menu = $("#menu")

// $navIcon.click(e => {
//     if ($menu.hasClass("closed")) {
//         $menu.removeClass("closed").addClass("open")
//     } else {
//         $menu.removeClass("open").addClass("closed")
//     }
// })

$navIcon.click(e => $menu.hasClass("closed") ? $menu.removeClass("closed").addClass("open") : $menu.removeClass("open").addClass("closed"))

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
        
        console.log(projects)
    })