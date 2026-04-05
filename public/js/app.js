
const localStoragetheme = localStorage.getItem('theme')
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const toggleButtonText = document.querySelector('#color-theme-toggler span')
const toggleImage = document.querySelector('#color-theme-toggler img')
const toggleButton = document.querySelector('#color-theme-toggler')
const html = document.querySelector('html')
const imageContainer = document.querySelector('#startSpace')
const ratingContainers = document.querySelectorAll('.rating-box')
const taskAreas = document.querySelectorAll('.task-area')
const ratingImages = document.querySelectorAll('.inner')



function returnStartingtheme(localStoragetheme, systemSettingDark) {
    if (localStoragetheme !== null) {
        return localStoragetheme
    }

    if (systemSettingDark !== false) {
        return 'dark'
    }

    return 'light'
}

const checkIfImageConatinerEmpty = function () {
    if (imageContainer.children.length === 0) {
        imageContainer.classList.remove('visible')
        imageContainer.classList.add('no-visible')
    }
}

const checkRatingsContainerEmpty = function () {

    if (Array.from(ratingImages).every((ctr) => ctr.children.length === 0)) {
        ratingImages.forEach((rating) => {
            rating.parentNode.classList.remove('visible')
            rating.parentNode.classList.add('no-visible')
        })
    }
}

const startTheme = returnStartingtheme(localStoragetheme, systemSettingDark)
html.setAttribute('data-theme', startTheme)
toggleButtonText.innerText = `Change to ${startTheme === 'light' ? 'dark' : 'light'} theme`
toggleImage.setAttribute('src', `/images/${startTheme === 'light' ? 'dark' : 'light'}.jpg`)
const buttonDir = (theme) => theme === 'dark' ? 'row-reverse' : 'row'
toggleButton.style.flexDirection = buttonDir(startTheme)


toggleButton.addEventListener('click', () => {

    const currTheme = toggleButtonText.innerText.includes('dark') ? 'dark' : 'light'
    toggleButton.style.flexDirection = buttonDir(currTheme)
    localStorage.setItem('theme', currTheme)
    const nextTheme = currTheme === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', currTheme)
    toggleButtonText.innerText = `Change to ${nextTheme} theme`
    toggleImage.setAttribute('src', `/images/${nextTheme}.jpg`)
})

const form = document.querySelector('#searchForm')
const imgCntr = document.querySelector('#images')


const printFirstImage = async (queryString) => {
    try {
        const params = new URLSearchParams({q: queryString})
        const base_url = 'https://api.tvmaze.com/singlesearch/shows'
        const url = `${base_url}?${params}`
        const res = await fetch(url)
        const data = await res.json()

        try {
            imageContainer.classList.add('visible')
            ratingContainers.forEach(x => {
                x.classList.add('visible')
            })
            const img_url = data.image.medium
            const image = document.createElement('img')
            image.setAttribute('src', img_url)
            image.setAttribute('draggable', "true")
            image.classList.add('task')
            image.classList.add('smaller-image')
            imageContainer.append(image)
        } catch (err) {
            console.log(err)
            const tvShow = data.name
            const div = document.createElement('div')
            div.style.width = '105x'
            div.style.height = 'calc(295px/2)'
            div.style.display = 'flex'
            div.style.flexDirection = 'column'
            div.style.justifyContent = 'flex-start'
            div.style.alignContent = 'center'
            div.style.flexWrap = "wrap"
            div.style.textAlign = 'center'
            div.draggable = 'true'
            div.classList.add('task')
            div.classList.add('name-title')
            div.classList.add('smaller-image')
            div.append(tvShow)
            imageContainer.append(div)
        }

        const tasks = document.querySelectorAll('.task')
        tasks.forEach((task) => {
            task.addEventListener('dragstart', (evt) => {
                task.id = 'dragged-task'
                evt.dataTransfer.effectAllowed = "move"
                evt.dataTransfer.setData("task", "")
            })

            task.addEventListener('dragend', (evt) => {
                task.removeAttribute('id')
            })

            task.addEventListener('dblclick', function () {
                this.remove()
                checkIfImageConatinerEmpty()
                checkRatingsContainerEmpty()
            })


        })
    } catch (err) {
        console.log(err)
        window.alert('Such a show does not exist!!!')
    }
}

taskAreas.forEach((area) => {
    area.addEventListener('dragover', (evt) => {

        if (evt.dataTransfer.types.includes("task")) {
            evt.preventDefault()
        }

    })


    area.addEventListener('drop', (evt) => {
        evt.preventDefault()

        const draggedTask = document.getElementById("dragged-task");
        console.log(draggedTask)
        draggedTask.remove();
        checkIfImageConatinerEmpty()
        area.children[1].appendChild(draggedTask);

        // console.log(area.children)
    })
})


form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const input = form.elements.query
    const queryString = input.value
    if (queryString) {
        printFirstImage(queryString)
        input.value = ''
    }

})




